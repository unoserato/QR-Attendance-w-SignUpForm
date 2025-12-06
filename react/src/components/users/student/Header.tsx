import { IoMdNotifications } from "react-icons/io";
import { useUserContext } from "../../../helpers/context";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  // const [openSidebar, setOpenSidebar] = useState(false);
  const { student } = useUserContext();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentPage =
    currentPath.split("/")[2][0].toLocaleUpperCase() +
    currentPath.split("/")[2].slice(1);

  if (!student) {
    return;
  }

  return (
    <>
      {/* mobile view only */}
      <header className="w-full relative">
        <div
          className="
                    flex justify-between items-center 
                    w-full p-3 shadow
                    shadow-neutral-100
                    "
        >
          <div className="font-semibold text-xl">
            {currentPage == "Dashboard" ? (
              <p>
                Attend<strong className="text-xl text-blue-500">EX</strong>
              </p>
            ) : (
              <p>{currentPage}</p>
            )}
          </div>
          <div className="flex gap-2 items-center relative">
            <div className="relative">
              <div className="absolute top-0.5 right-0.5 animate-pulse bg-red-500 rounded-full w-2 h-2"></div>
              <IoMdNotifications size="clamp(1.5rem,3dvh,3rem)" fill="#333" />
            </div>
            <NavLink
              to={"profile"}
              className={({ isActive }) =>
                `${isActive ? "drop-shadow-[0_0_2px_#1c389e]" : ""}`
              }
            >
              <img
                src={student.profileURL}
                alt="Profile"
                className="object-cover border border-blue-900 w-[clamp(2rem,3dvh,3rem)] rounded-full aspect-square"
              />
            </NavLink>
            {/* sidebar test below */}
            {/* {!openSidebar ? (
              <IoIosMenu
                size="clamp(1.5rem,3dvh,3rem)"
                fill="white"
                onClick={() => setOpenSidebar(!openSidebar)}
              />
            ) : (
              <IoCloseOutline
                className="z-10"
                size="clamp(1.5rem,3dvh,3rem)"
                onClick={() => setOpenSidebar(!openSidebar)}
              />
            )} */}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
