import { FaCheck } from "react-icons/fa";
import FullPageLoader from "../../components/global/FullPageLoader";
import activitiesList from "../../helpers/activityList";
import { useUserContext } from "../../helpers/context";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, mode } = useUserContext();
  const acts = activitiesList || [];
  const unattendedCount = acts.filter((act) => act.attended === false).length;
  const navigate = useNavigate();
  // const unattendedCount = 0;

  if (!user) {
    return <FullPageLoader />;
  }

  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        <div className="flex flex-col gap-2 w-full p-4">
          {/* greetings header */}
          <div className="flex flex-col gap-1 py-3">
            <h2 className="text-3xl font-bold">
              Hello, <span className="text-blue-500">{user.lastName}!</span>
            </h2>
            <p className="text-md text-neutral-600">
              Today is{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          {/* switch acccess card */}
          {user.isStaff && (
            <div className="flex justify-between items-center bg-blue-900 rounded-xl p-4 ">
              <span className="text-sm text-white">
                You are eligible for <br />
                <em className="font-bold text-xl">Staff Access</em>
              </span>
              <button
                className="text-xs font-semibold p-3 rounded-full bg-white text-blue-900"
                onClick={() => {
                  mode();
                  console.log("clicked");
                }}
              >
                Switch to Staff Mode
              </button>
            </div>
          )}
          {/* missing attendance card */}
          <div
            className={`flex justify-between p-4 rounded-xl text-white  ${
              unattendedCount > 0 ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <div className="flex w-full gap-2 items-center">
              <div className="flex items-center justify-center rounded-full w-10 aspect-square border-2 font-bold">
                {unattendedCount > 0 ? <p>{unattendedCount}</p> : <FaCheck />}
              </div>

              <p className="text-md font-bold">
                {unattendedCount > 0
                  ? "Missing Attendance"
                  : "Attendace Complete"}
              </p>
            </div>
            {unattendedCount > 0 && (
              <div
                className="flex items-center justify-center text-xs font-semibold p-2 bg-white text-red-500 rounded-md"
                onClick={() => navigate("/student/qr", { replace: true })}
              >
                <p className="whitespace-nowrap">Generate QR</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
