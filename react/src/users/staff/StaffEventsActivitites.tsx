import { useState } from "react";
import StaffActivities from "./StaffActivities";
import StaffEvents from "./StaffEvents";

function StaffEventsActivitites() {
  const [isEvent, setIsEvent] = useState(true);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <header className="text-xs px-2">
        <div className="flex rounded-full w-full border-blue-900 text-blue-900 border *:active:bg-blue-900/20">
          <button
            className={`${
              isEvent ? "bg-blue-900 text-white" : ""
            } rounded-full p-2 w-full text-center transition-all ease duration-300 overflow-hidden`}
            onClick={() => setIsEvent(true)}
          >
            Events
          </button>
          <button
            className={`${
              !isEvent ? "bg-blue-900 text-white" : ""
            } rounded-full p-2 w-full text-center`}
            onClick={() => setIsEvent(false)}
          >
            Activities
          </button>
        </div>
      </header>
      <main className="flex w-[200%] h-full *:transition-all *:duration-300 *:ease-out">
        <div
          className={`${
            isEvent ? "translate-x-0" : "-translate-x-full"
          } w-full`}
        >
          <StaffEvents />
        </div>
        <div
          className={`${
            !isEvent ? "-translate-x-full" : "translate-x-0"
          } w-full`}
        >
          <StaffActivities />
        </div>
      </main>
    </div>
  );
}

export default StaffEventsActivitites;
