import { IoMdNotifications } from "react-icons/io";
import { useUserContext } from "../../../helpers/context";
import { NavLink } from "react-router-dom";

function InstructorHeader() {
  // const [openSidebar, setOpenSidebar] = useState(false);
  const { instructor } = useUserContext();

  if (!instructor) {
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
          <div className="font-semibold text-xl flex gap-2 items-center">
            <p>
              Attend<strong className="text-xl text-blue-500">EX</strong>
            </p>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-white">
              Instructor Mode
            </span>
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
                src={instructor.profileURL}
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

export default InstructorHeader;
