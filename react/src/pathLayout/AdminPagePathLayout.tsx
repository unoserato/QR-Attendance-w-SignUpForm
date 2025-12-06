import { Outlet } from "react-router-dom";

function AdminPagePathLayout() {
  return (
    <div className="flex flex-col w-full h-full">
      <main className="h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPagePathLayout;
