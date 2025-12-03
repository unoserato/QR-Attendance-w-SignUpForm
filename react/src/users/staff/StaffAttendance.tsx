import { useState } from "react";
import activityList, { getEventName } from "../../helpers/activityList";
import { getAttendanceByActId } from "../../helpers/attendance";

function StaffAttendance() {
  const acts = activityList;
  const [overlayId, setOverlayId] = useState<number | null>(null);

  return (
    <>
      <div className="relative w-full h-full">
        <ul className="flex flex-col gap-1 p-4">
          {acts.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-2 rounded-xl px-2 py-4 shadow w-full"
            >
              {/* Title section */}
              <header className="flex justify-between">
                <div className="flex flex-col">
                  <div className="font-bold">{a.name}</div>
                  <div className="text-xs text-neutral-500">
                    {getEventName(a.id)}
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <p className="text-[8px] opacity-80">Assigned Scanner</p>
                  <p className="text-sm font-bold ">
                    {a.scannerRole || "None"}
                  </p>
                </div>
              </header>

              {/* Body section */}
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1">
                  <p>Total Attended:</p>
                  <b className="text-blue-900 text-xl">
                    {getAttendanceByActId(a.id).length}
                  </b>
                </div>
                <button
                  className="flex items-center py-2 px-4 rounded-xl bg-blue-900 text-white"
                  onClick={() => setOverlayId(a.id)}
                >
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom-up overlay */}
    </>
  );
}

export default StaffAttendance;
