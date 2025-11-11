import { Outlet } from "react-router-dom";
import StaffHeader from "../components/users/staff/StaffHeader";
import StaffNavbar from "../components/users/staff/StaffNavbar";

function StaffPagePathLayout() {
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <StaffHeader />
        <main className="h-full overflow-y-auto">
          <Outlet />
        </main>
        <StaffNavbar />
      </div>
    </>
  );
}

export default StaffPagePathLayout;
