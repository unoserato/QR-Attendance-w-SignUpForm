import { NavLink, useNavigate } from "react-router-dom";
import { userLinks } from "../../global/navlinks";
import React from "react";

export default function Navbar() {
  const links = userLinks;
  const navigate = useNavigate();
  const handleNav = (path: string) => navigate(`${path}`, { replace: true });

  return (
    <>
      {/* STRICTLY mobile view only */}
      <footer className="block sm:hidden bg-white shadow-[0_0_10px_#e5e5e5] p-2">
        <nav>
          <ul className="m-0 p-0 flex justify-evenly">
            {links.map((link) => (
              <li key={link.name} className="w-1/7">
                <NavLink
                  to={link.path}
                  onClick={() => handleNav(link.path)}
                  className={({ isActive }) =>
                    `
                  flex flex-col items-center gap-2 py-1 rounded-xl 
                  text-[8px] font-semibold
                  transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-blue-900 text-white"
                      : "text-neutral-900 opacity-80"
                  }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {React.cloneElement(link.icon, {
                        size: "clamp(1.5rem,3dvh,3rem)",
                        color: isActive ? "#fff " : "#c1c1c1",
                      })}
                      {link.name}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </>
  );
}
