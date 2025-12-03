import FullPageLoader from "../../components/global/FullPageLoader";
import { useUserContext } from "../../helpers/context";

function StaffDashboard() {
  const { user, mode } = useUserContext();

  if (!user) {
    return <FullPageLoader />;
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="flex flex-col gap-2 p-4 w-full">
        {/* greetings */}
        <div className="flex flex-col gap-1 py-4">
          <h2 className="text-3xl font-bold">
            Welcome, <br />{" "}
            <span className="text-blue-500">
              {user.role} {user.lastName}!
            </span>
          </h2>
          <p className="text-md text-neutral-500">
            Today is{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        {/* switch card */}
        <div className="flex justify-between items-center border bg-white text-blue-900 rounded-xl p-4">
          <span className="text-md ">You are currently in Staff Access</span>
          <button
            className="text-xs font-semibold p-2 rounded-xl bg-blue-900 text-white"
            onClick={() => {
              mode();
            }}
          >
            Switch to Student Mode
          </button>
        </div>
        {/* bar graph */}
        <div className="w-full shadow-md rounded-xl">
          {/* <AttendanceByEventChart /> */}
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
