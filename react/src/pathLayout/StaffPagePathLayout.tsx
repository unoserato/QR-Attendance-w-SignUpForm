import { Outlet } from "react-router-dom";
import StaffHeader from "../components/users/staff/StaffHeader";

function StaffPagePathLayout() {
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <StaffHeader />
        <main className="h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default StaffPagePathLayout;
