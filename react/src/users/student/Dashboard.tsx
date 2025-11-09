import FullPageLoader from "../../components/global/FullPageLoader";
import { useUserContext } from "../../helpers/context";

function Dashboard() {
  const { user, mode } = useUserContext();

  if (!user) {
    return <FullPageLoader />;
  }

  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        <div className="flex flex-col gap-2 w-full p-4">
          <div className="flex flex-col gap-1 py-4">
            <h2 className="text-3xl font-bold">
              Hello, <span className="text-blue-500">{user.lastName}!</span>
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
          {user.isStaff && (
            <div className="flex justify-between items-center bg-blue-900 rounded-xl p-4">
              <span className="text-md text-white">
                You are eligible for Staff Access
              </span>
              <button
                className="text-xs font-semibold p-2 rounded-xl bg-white text-blue-900"
                onClick={() => {
                  mode();
                  console.log("clicked");
                }}
              >
                Switch to Staff Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Dashboard;
