import { Outlet } from "react-router-dom";
import LandingNavbar from "../components/guest/LandingNavbar";

function LandingPagePathLayout() {
  return (
    <>
      <div className="flex flex-col h-full w-full bg-white">
        <LandingNavbar />
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default LandingPagePathLayout;
