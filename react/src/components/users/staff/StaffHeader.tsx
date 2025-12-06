import { useLocation } from "react-router-dom";

function StaffHeader() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentPage =
    currentPath.split("/")[2][0].toLocaleUpperCase() +
    currentPath.split("/")[2].slice(1);

  return (
    <>
      {/* mobile view only */}
      <header className="w-full">
        <div
          className="
                    flex justify-between items-center 
                    w-full p-3 
                    shadow shadow-neutral-100
                    bg-white 
                    "
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xl">
              {currentPage === "Dashboard" ? (
                <div>
                  Attend
                  <strong className="text-xl  text-blue-400">EX</strong>
                </div>
              ) : (
                <div>{currentPage}</div>
              )}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-white">
              Staff Mode
            </span>
          </div>
          <div className="text-xs sm:text-sm p-1 rounded">
            <select
              name="school-year"
              id="school-year"
              defaultValue={"1-2025-2026"}
            >
              <option value="1-2025-2026">1st 2025-2026</option>
            </select>
          </div>
        </div>
      </header>
    </>
  );
}

export default StaffHeader;
