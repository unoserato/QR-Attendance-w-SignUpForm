import { IoMdNotifications } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      {/* mobile view only */}
      <header className="w-full">
        <div
          className="
                    flex justify-between items-center 
                    w-full p-3 shadow
                    shadow-neutral-100 bg-blue-900 text-white
                    "
        >
          <div className="font-semibold">
            Attend<strong className="text-xl text-blue-400">AMS</strong>
          </div>
          <div className="relative">
            <NavLink to="/">
              <IoMdNotifications size="clamp(1.5rem,3dvh,3rem)" fill="white" />
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
