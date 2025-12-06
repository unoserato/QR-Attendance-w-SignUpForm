import { useUserContext } from "../../helpers/context";

function InstructorDashboard() {
  const { logout } = useUserContext();
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div>InstructorDashboard</div>
        <button
          className="bg-red-500 text-white rounded-xl mx-auto p-2 cursor-pointer active:bg-red-400 active:scale-110"
          onClick={() => logout() }
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default InstructorDashboard;
