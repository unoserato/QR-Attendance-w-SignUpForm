import { NavLink, useNavigate } from "react-router-dom";
import { authorizedStaffLinks } from "../../global/navlinks";
import React from "react";
// import { useUserContext } from "../../../helpers/context";

export default function StaffNavbar() {
  // const { user } = useUserContext();
  const links = authorizedStaffLinks;
  const navigate = useNavigate();
  const handleNav = (path: string) => navigate(`${path}`, { replace: true });

  return (
    <>
      {/* mobile view only */}
      <footer className="block sm:hidden p-2 bg-blue-900">
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
                      ? "bg-white text-blue-900"
                      : "text-white opacity-60"
                  }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {React.cloneElement(link.icon, {
                        size: "clamp(1.5rem,3dvh,3rem)",
                        color: isActive ? "#1c398e " : "#fff",
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
