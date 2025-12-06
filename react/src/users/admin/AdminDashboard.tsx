import { useUserContext } from "../../helpers/context";

function AdminDashboard() {
  const { logout } = useUserContext();
  return (
    <>
      <div>AdminDashboard</div>
      <button
        className="p-2 bg-red-500 text-white text-center rounded-xl active:scale-90"
        onClick={() => logout()}
      >
        Log out
      </button>
    </>
  );
}

export default AdminDashboard;
