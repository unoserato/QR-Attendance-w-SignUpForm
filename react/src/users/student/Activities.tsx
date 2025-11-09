import { useState } from "react";
import FullPageLoader from "../../components/global/FullPageLoader";
import activitiesList from "../../helpers/activityList";
import eventList from "../../helpers/eventList";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";

function Activities() {
  const acts = activitiesList || [];
  const events = eventList || [];
  const [openAct, setOpenAct] = useState(false);
  const [selectedAct, setSelectedAct] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

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

  // helper to resolve event name by id
  function getEventName(id: number) {
    const ev = events.find((e) => e.id === id);
    return ev ? ev.name : "Unknown Event";
  }

  // helper to open activity info
  function handleOpenAct(act?: any) {
    if (act) setSelectedAct(act);
    setOpenAct(!openAct);
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-y-auto">
        {/* header */}
        <div className="flex flex-col sticky top-0 left-0 p-4 gap-2 bg-white">
          <h2 className="font-semibold text-xl">Activities</h2>
          <div className="flex items-center w-full gap-2">
            <span className="relative w-full">
              <input
                type="text"
                placeholder="Search activities..."
                className="text-xs outline-blue-500 flex items-center gap-2 bg-neutral-100 rounded w-full py-2 pl-8 text-neutral-700"
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
                className="bg-white outline-1 outline-neutral-400 rounded-lg p-2 text-xs font-bold"
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
            <p className="text-sm text-neutral-500">No activities found.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {filteredActs.map((act) => (
                <li
                  key={act.id}
                  className={`flex flex-col p-3 pb-4 rounded-lg shadow-md border border-gray-200 ${
                    act.attended ? "bg-white" : "bg-red-500/10"
                  }`}
                  onClick={() => handleOpenAct(act)}
                >
                  <div className="flex justify-between">
                    <p className="font-semibold">{act.name}</p>
                    <div
                      className={`flex items-center py-1 px-2 rounded-full text-[8px] font-bold text-white ${
                        act.attended ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {act.attended ? "Attended" : "Did not Attend"}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-600">
                      {getEventName(act.eventID)}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-neutral-600">
                      <CiCalendar size="1.2rem" />
                      <span>
                        {new Date(act.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      -
                      <span>
                        {new Date(act.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-neutral-600">
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
                    <div className="flex items-center gap-1 text-sm font-semibold text-neutral-600">
                      <CiLocationOn size="1.2rem" />
                      <span>{act.location}</span>
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

export default Activities;
