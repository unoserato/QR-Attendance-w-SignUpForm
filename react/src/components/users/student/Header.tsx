import { IoIosMenu, IoMdNotifications } from "react-icons/io";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      {/* mobile view only */}
      <header className="w-full relative">
        <div
          className="
                    flex justify-between items-center 
                    w-full p-3 shadow
                    shadow-neutral-100 bg-blue-900 text-white
                    "
        >
          <div className="font-semibold">
            Attend<strong className="text-xl text-blue-400">EX</strong>
            {/* Attend<strong className="text-xl text-blue-400">ify</strong> */}
            {/* Event<strong className="text-xl text-blue-400">ify</strong> */}
            {/* Attend<strong className="text-xl text-blue-400">AMS</strong> */}
          </div>
          <div className="flex gap-2 items-center relative">
            <IoMdNotifications size="clamp(1.5rem,3dvh,3rem)" fill="white" />
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
          <Sidebar open={openSidebar} />
        </div>
      </header>
    </>
  );
}

export default Header;
