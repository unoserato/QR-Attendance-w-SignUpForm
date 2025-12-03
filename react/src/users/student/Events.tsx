import { HiMagnifyingGlass } from "react-icons/hi2";
import FullPageLoader from "../../components/global/FullPageLoader";
import eventList from "../../helpers/eventList";
import { useState } from "react";
import { CiBoxList, CiCalendar } from "react-icons/ci";

function Events() {
  let events = eventList;
  const [openEvent, setOpenEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  function handleOpenEvent(event?: any) {
    if (event) setSelectedEvent(event);
    setOpenEvent(!openEvent);
  }

  if (!events) {
    return <FullPageLoader />;
  }

  const filteredEvents = events
    .filter((e) => {
      return search.trim() === ""
        ? true
        : e.name.toLowerCase().includes(search.trim().toLowerCase());
    })
    .filter((e) => {
      if (filter === "") {
        return true;
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize to midnight
        const start = new Date(e.startDate);
        const end = new Date(e.endDate);

        // normalize for date-only comparison
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        if (filter === "today") {
          return start <= today && end >= today; // Event happening today
        }
        if (filter === "upcoming") {
          return start > today; // Future events
        }
        if (filter === "past") {
          return end < today; // Events that have ended
        }
      }
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Event list */}
      <div
        className={`absolute top-0 left-0 w-full h-full overflow-y-auto bg-neutral-100 transform transition-transform duration-500 ease-in-out ${
          openEvent ? "" : ""
        }`}
      >
        {/* Header */}
        <div className="flex flex-col w-full gap-2 sticky top-0 p-4 bg-white">
          <div className="flex items-center w-full gap-2">
            <span className="relative w-full">
              <input
                type="text"
                placeholder="Search events..."
                className="text-xs outline-blue-500 flex items-center gap-2 border-black/10 h-full border rounded w-full py-2 pl-8 text-[#333]"
                onChange={(e) => setSearch(e.target.value)}
              />
              <HiMagnifyingGlass
                fill="#000"
                opacity={"60%"}
                className="absolute left-2 top-2"
              />
            </span>
            <span className="flex justify-center flex-col">
              <select
                className="outline-none bg-neutral-200 rounded p-2 text-xs font-bold"
                onChange={(e) => setFilter(e.target.value)}
                defaultValue=""
              >
                <option value="">All</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </span>
          </div>
        </div>
        {/* List */}
        <ul className="flex flex-col gap-4 p-4">
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden cursor-pointer transition-transform gap-4"
              onClick={() => handleOpenEvent(event)}
            >
              <img
                src={event.bannerURL}
                alt="Banner"
                className="object-cover aspect-video h-40"
              />
              <div className="flex flex-col gap-1 px-4 pb-4">
                <div className="flex items-center justify-between text-xl font-bold">
                  {event.name}

                  <span className="px-2 py-1 rounded-full bg-green-500 text-[8px] text-white">
                    Ongoing
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-regular text-blue-500">
                  <CiCalendar size="1.2rem" />
                  <span>
                    {new Date(event.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  -
                  <span>
                    {new Date(event.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="text-sm text-neutral-700 bg-neutral-100 rounded py-2 px-1">
                  <p className="line-clamp-2 text-justify">
                    {event.description}
                  </p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="flex items-center gap-1 text-sm">
                    <CiBoxList /> 5 Activities
                  </span>
                  <button className="text-[10px] p-2 rounded-xl bg-blue-500 text-white font-bold">
                    View Activities
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Event details */}
      <div
        className={`absolute top-0 left-0 w-full h-full overflow-y-auto bg-white transform transition-transform duration-500 ease-in-out ${
          openEvent ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedEvent && (
          <>
            <div className="sticky top-0 bg-blue-500 text-white flex items-center justify-between p-4">
              <button
                onClick={() => handleOpenEvent()}
                className="px-3 py-1 bg-blue-700 rounded-lg transition-all"
              >
                Back
              </button>
              <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
            </div>

            <img
              src={selectedEvent.bannerURL}
              alt="Banner"
              className="object-cover aspect-video w-full"
            />

            <div className="p-4 flex flex-col gap-3">
              <div className="text-neutral-500 text-sm">
                {new Date(selectedEvent.startDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <p className="text-neutral-700 leading-relaxed">
                {selectedEvent.description}
              </p>

              <div className="h-screen bg-black"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Events;
