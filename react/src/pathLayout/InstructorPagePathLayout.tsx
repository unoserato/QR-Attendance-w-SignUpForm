import { Outlet } from "react-router-dom";
import InstructorHeader from "../components/users/instructor/InstructorHeader";
import InstructorNavbar from "../components/users/instructor/InstructorNavbar";

function InstructorPagePathLayout() {
  return (
    <div className="flex flex-col w-full h-full">
      <InstructorHeader />
      <main className="h-full overflow-y-auto">
        <Outlet />
      </main>
      <InstructorNavbar />
    </div>
  );
}

export default InstructorPagePathLayout;
