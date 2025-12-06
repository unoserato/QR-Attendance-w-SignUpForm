import { useEffect, useState } from "react";
import activityList, {
  type ActivityType,
  getActivityById,
  getActivityStatus,
  getEventName,
} from "../../helpers/activityList";
import { getAttendanceByActId } from "../../helpers/attendance";
import { IoClose } from "react-icons/io5";
import { getStudentById } from "../../helpers/studentList";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

function StaffAttendance() {
  const acts = activityList;
  const [overlayId, setOverlayId] = useState<Number>(0);
  const [viewAct, setViewAct] = useState<ActivityType | undefined>(
    getActivityById(1)
  );
  const [search, setSearch] = useState("");
  const [searchAct, setSearchAct] = useState("");
  const [filterType, setFilterType] = useState<"all" | "most" | "least">("all");

  useEffect(() => {
    if (overlayId !== 0) {
      setViewAct(getActivityById(overlayId));
      setSearch(""); // reset search on new overlay
    }
  }, [overlayId, searchAct]);

  const isOpen = overlayId !== 0;

  // Filtered attendance
  const filteredAttendance = getAttendanceByActId(overlayId).filter((att) => {
    const student = getStudentById(att.studentID);
    const term = search.toLowerCase();
    return (
      att.studentID.toString().includes(term) ||
      student?.firstName.toLowerCase().includes(term) ||
      student?.lastName.toLowerCase().includes(term) ||
      att.scannedBy.toLowerCase().includes(term)
    );
  });

  // Filtered & Sorted Activities
  const filteredActs = acts
    .filter((a) => {
      if (searchAct.trim() === "") return true;
      return a.name.toLowerCase().includes(searchAct.trim().toLowerCase());
    })
    .sort((a, b) => {
      const countA = getAttendanceByActId(a.id).length;
      const countB = getAttendanceByActId(b.id).length;

      if (filterType === "most") return countB - countA; // most attended first
      if (filterType === "least") return countA - countB; // least attended first

      // all: sort by startDate
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  return (
    <div className={`relative w-full bg-white`}>
      {/* Activity List */}
      <div className="flex items-center w-full gap-2 p-4 sticky top-0 bg-white z-10">
        <span className="relative w-full">
          <input
            type="text"
            placeholder="Search activities..."
            className="text-xs outline-blue-500 flex items-center gap-2 border-black/10 h-full border rounded w-full py-2 pl-8 text-[#333]"
            value={searchAct}
            onChange={(e) => setSearchAct(e.target.value)}
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
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "most" | "least")
            }
          >
            <option value="all">All</option>
            <option value="most">Most Attended</option>
            <option value="least">Least Attended</option>
          </select>
        </span>
      </div>
      <ul className="flex flex-col gap-2 p-4">
        {filteredActs.map((a) => (
          <li
            key={a.id}
            className="flex flex-col gap-2 rounded-xl px-2 py-4 shadow w-full"
          >
            <header className="flex justify-between">
              <div className="flex flex-col">
                <div className="font-bold">{a.name}</div>
                <div className="text-xs text-neutral-500">
                  {getEventName(a.id)}
                </div>
              </div>
              <div className="text-right">
                <p className="text-[8px] opacity-80">Assigned Scanner</p>
                <p className="text-sm font-bold">{a.scannerRole || "None"}</p>
              </div>
            </header>

            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1">
                <p>Total Attended:</p>
                <b className="text-blue-900 text-xl">
                  {getAttendanceByActId(a.id).length}
                </b>
              </div>
              <button
                className="py-2 px-4 rounded-xl bg-blue-900 text-white"
                onClick={() => setOverlayId(a.id)}
              >
                View
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-10 bg-black/50 transition-opacity duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {/* Card */}
        <div
          className={`fixed bottom-0 left-0 w-full max-h-[90vh] bg-white p-4 rounded-t-2xl
      transition-transform duration-300 ease-out flex flex-col
      ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          {/* Close */}
          <div className="flex justify-end">
            <IoClose
              size={"2rem"}
              onClick={() => setOverlayId(0)}
              className="cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-4 overflow-hidden h-full">
            {/* Title, scanner info, search, etc. */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="flex items-center gap-2">
                  <h2 className="text-3xl font-semibold">{viewAct?.name}</h2>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-semibold text-white ${
                      getActivityStatus(overlayId).startsWith("O")
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {getActivityStatus(overlayId)}
                  </div>
                </span>
                <h3 className="text-xl font-semibold text-neutral-500">
                  {viewAct?.eventID !== undefined
                    ? getEventName(viewAct.eventID)
                    : ""}
                </h3>
              </div>
              <div className="flex flex-col w-full">
                <p className="font-semibold text-xs text-neutral-500">
                  Assigned Scanner
                </p>
                <div className="font-semibold text-x p-2 border border-neutral-300">
                  {viewAct?.scannerRole || "None"}
                </div>
              </div>
            </div>
            {/* Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search student ID, time, scanned by..."
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
            </div>

            {/* Attendance List */}
            <div className="overflow-auto flex-1">
              <div className="hidden gap-4 px-2 sm:flex w-full items-cente">
                <p className="w-1/6">Student ID</p>
                <p className="w-1/6">Last Name</p>
                <p className="w-1/6">First Name</p>
                <p className="w-1/6">Scanned By</p>
                <p className="w-1/6">Time</p>
                <p className="w-1/10"></p>
              </div>
              <ul className="flex flex-col gap-2 text-xs min-w-full py-2">
                {filteredAttendance.map((att) => {
                  const student = getStudentById(att.studentID);
                  return (
                    <li
                      key={att.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-1 p-2 rounded-lg shadow-sm relative"
                    >
                      <div className="w-full sm:w-1/6 font-bold">
                        {att.studentID}
                      </div>
                      <div className="w-full sm:w-1/6">{student?.lastName}</div>
                      <div className="w-full sm:w-1/6">
                        {student?.firstName}
                      </div>
                      <div className="flex gap-1 w-full sm:w-1/6">
                        <p className="sm:hidden">Scanned By:</p>
                        <p>{att.scannedBy}</p>
                      </div>
                      <div className="w-full sm:w-1/6 text-right sm:text-left">
                        {new Date(att.time).toLocaleString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </div>

                      <button
                        className="absolute top-2 right-2 text-red-500 "
                        onClick={() => console.log("Remove", att.id)}
                      >
                        <IoMdClose size={20} />
                      </button>
                    </li>
                  );
                })}
                {filteredAttendance.length === 0 && (
                  <li className="p-2 text-center text-neutral-500">
                    No matching records found.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffAttendance;
