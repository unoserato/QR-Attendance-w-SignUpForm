import { Outlet } from "react-router-dom";
import Navbar from "../components/users/student/Navbar";
import Header from "../components/users/student/Header";

function StudentPageLayout() {
  return (
    <>
      {/* mobile view only */}
      <div className="flex flex-col h-full bg-white overflow-x-hidden">
        <Header />
        <main className="h-full overflow-y-auto">{<Outlet />}</main>
        <Navbar />
      </div>
    </>
  );
}

export default StudentPageLayout;
