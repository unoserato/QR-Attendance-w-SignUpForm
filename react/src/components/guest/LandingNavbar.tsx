import { NavLink, useNavigate } from "react-router-dom";
import { guestLinks } from "../global/navlinks";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { useState, useRef, useEffect } from "react";

const links = guestLinks;

function LandingNavbar() {
  const [showList, setShowList] = useState(false);
  const Icon = showList ? IoIosClose : IoIosMenu;
  const navbarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Detect click outside navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // if menu is open and click is outside
      if (
        showList &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showList]);

  return (
    <header
      className="sticky top-0 w-full bg-white shadow z-10"
      ref={navbarRef}
    >
      <div className="relative flex flex-col">
        {/* Navbar Header */}
        <div className="z-10 flex items-center justify-between bg-white p-4">
          <div
            className="font-semibold"
            onClick={() => {
              navigate("/");
              setShowList(false);
            }} // close menu on click
          >
            Attend<strong className="text-xl text-blue-900">Ex</strong>
          </div>

          <button
            onClick={() => setShowList(!showList)}
            className="cursor-pointer transition-transform duration-300 ease-in-out"
          >
            <Icon
              className="fill-neutral-900 transition-transform duration-300 ease-in-out"
              style={{
                width: "clamp(1.5rem, 4dvh, 3rem)",
                height: "clamp(1.5rem, 4dvh, 3rem)",
                transform: showList ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-0 left-0 pt-20 bg-white p-3 w-full h-screen transition-all duration-300 ease-in-out ${
            showList
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <ul className="flex w-full flex-col gap-5">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setShowList(false)} // close menu on click
                className={({ isActive }) => `
                    p-2 text-xl rounded-xl border-l-4 transition-all duration-300 ease-in-out
                    ${
                      link.name === "Sign Up"
                        ? "bg-blue-600 text-white font-semibold hover:bg-blue-700"
                        : isActive
                        ? "border-blue-900 font-bold text-blue-500 bg-blue-500/10"
                        : "border-transparent text-neutral-600 hover:text-blue-500"
                    }
                  `}
              >
                <li>{link.name}</li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
