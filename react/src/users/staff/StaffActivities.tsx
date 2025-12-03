import { useState } from "react";
import FullPageLoader from "../../components/global/FullPageLoader";
import activityList, { getEventName } from "../../helpers/activityList";
import eventList from "../../helpers/eventList";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";

function StaffActivities() {
  const acts = activityList || [];
  const events = eventList || [];
  const [openAct, setOpenAct] = useState(false);
  const [selectedAct, setSelectedAct] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [openMenuId, setOpenMenuId] = useState<Number | null>(null);

  if (!acts || !events) {
    return <FullPageLoader />;
  }

  // compute filtered list without mutating original `acts`
  const filteredActs = acts
    .filter((a) => {
      // search filter
      if (search.trim() === "") return true;
      return a.name.toLowerCase().includes(search.trim().toLowerCase());
    })
    .filter((a) => {
      // event filter: if filter is empty => keep all
      if (filter === "") return true;
      // parse filter to number for comparison (handles "0", "1", etc.)
      const filterId = Number(filter);
      return a.eventID === filterId;
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  // helper to open activity info
  function handleOpenAct(act?: any) {
    if (act) setSelectedAct(act);
    setOpenAct(!openAct);
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full overflow-y-auto"
        onClick={() => setOpenMenuId(null)}
      >
        {/* header */}
        <div className="flex flex-col sticky top-0 left-0 p-4 gap-2 bg-white z-10">
          <div className="flex items-center w-full gap-2">
            <span className="relative w-full">
              <input
                type="text"
                placeholder="Search activities..."
                className="text-xs outline-blue-500 flex items-center gap-2 border-black/10 h-full border rounded w-full py-2 pl-8 text-[#333]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <HiMagnifyingGlass
                fill="#000"
                opacity={"60%"}
                className="absolute left-2 top-2"
                aria-hidden
              />
            </span>

            <span className="flex justify-center flex-col">
              <select
                className="outline-none bg-neutral-200 rounded p-2 text-xs font-bold"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="">All</option>
                {events.map((event) => (
                  <option key={event.id} value={String(event.id)}>
                    {event.name}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>
        {/* list */}
        <div className="p-4">
          {filteredActs.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No StaffActivities found.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {filteredActs.map((act) => (
                <li
                  key={act.id}
                  className={`flex flex-col relative p-3 pb-4 rounded-lg shadow-md border border-gray-200`}
                  onClick={() => handleOpenAct(act)}
                >
                  <button
                    className="absolute top-0 right-0 p-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId((prev) =>
                        prev === act.id ? null : act.id
                      );
                    }}
                  >
                    <IoMdMore fill="#333" size={"1.5rem"} />
                  </button>

                  {/* Dropdown Menu */}
                  {/* {openMenuId === act.id && ( */}
                  <div
                    className={`absolute flex flex-col 
                                right-2 overflow-hidden bg-white drop-shadow-xl rounded-sm transition-all ease duration-300 
                              *:hover:bg-gray-100 *:cursor-pointer *:px-4 *:py-2 *:active:bg-gray-200
                                top-10 
                              ${
                                openMenuId === act.id ? "max-h-40" : "max-h-0"
                              }`}
                  >
                    <button onClick={(e) => e.stopPropagation()}>Edit</button>
                    <button onClick={(e) => e.stopPropagation()}>Delete</button>
                  </div>
                  {/* )} */}

                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h2 className="font-semibold">{act.name}</h2>
                      <p className="text-xs text-gray-600">
                        {getEventName(act.eventID)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1 p-1 w-full">
                      <div className="flex items-center gap-1 text-sm font-semibold text-neutral-600">
                        <CiCalendar size="1.2rem" />
                        <span>
                          {new Date(act.startDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-neutral-600">
                        <CiLocationOn size="1.2rem" />
                        <span>{act.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-neutral-600">
                        <IoTimeOutline size="1.2rem" />
                        <span>
                          {new Date(act.startDate).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </span>
                        -
                        <span>
                          {new Date(act.endDate).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col p-2 w-fit aspect-square rounded-full items-center justify-center">
                      <p className="text-xs">Points</p>
                      <p className="font-bold text-xl">{act.points}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-white z-10 transition-transform duration-300 ease-in-out ${
          openAct ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedAct && (
          <div className="flex flex-col">
            <div className="sticky top-0 left-0 p-4">
              <button
                className="p-2 rounded-xl bg-neutral-100 text-sm"
                onClick={() => setOpenAct(!openAct)}
              >
                Back
              </button>
            </div>
            <div className="w-full h-full overflow-y-auto px-4">
              <div className="flex flex-col p-4 items-center rounded-xl shadow-md">
                <h2 className="text-3xl font-bold">{selectedAct.name}</h2>
                <h3 className="text-md font-semibold text-neutral-500">
                  {getEventName(selectedAct.eventID)}
                </h3>
                <span className="w-full h-px bg-neutral-500"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffActivities;
