import { FaCheck } from "react-icons/fa";
import FullPageLoader from "../../components/global/FullPageLoader";
import activitiesList from "../../helpers/activityList";
import { useUserContext } from "../../helpers/context";
import { useNavigate } from "react-router-dom";
import attendanceList from "../../helpers/attendance";
import { useEffect, useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";

function Dashboard() {
  const { student, mode } = useUserContext();
  const navigate = useNavigate();
  const [unattendedCount, setunattendedCount] = useState(0);
  // const unattendedCount = 0;

  useEffect(() => {
    // 1. Get the IDs of the activities this student attended
    const attendedIDs = attendanceList
      .filter((att) => att.studentID === student?.studentID)
      .map((att) => att.actID);

    // 2. Get the activities the student did NOT attend
    const notAttended = activitiesList.filter(
      (act) => !attendedIDs.includes(act.id)
    );

    setunattendedCount(notAttended.length);
  }, []);

  if (!student) {
    return <FullPageLoader />;
  }
  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        <div className="flex flex-col gap-2 w-full p-4">
          {/* greetings header */}
          <div className="flex flex-col gap-1 py-3">
            <h2 className="text-3xl font-bold">
              Hello, <span className="text-blue-500">{student.lastName}!</span>
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
          {student.isStaff && (
            <div className="flex justify-between items-center bg-blue-900 rounded-xl p-4 ">
              <span className="text-sm text-white">
                You are eligible for <br />
                <em className="font-bold text-xl">Staff Access</em>
              </span>
              <button
                className="text-xs font-semibold p-3 rounded-full bg-white text-blue-900 cursor-pointer active:scale-90"
                onClick={() => {
                  mode();
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
                className="flex items-center justify-center text-xs font-semibold p-2 bg-white text-red-500 rounded-md cursor-pointer"
                onClick={() => navigate("/student/qr", { replace: true })}
              >
                <p className="whitespace-nowrap">Generate QR</p>
              </div>
            )}
          </div>
          {/* grid */}
          <div className="grid grid-cols-2 grid-rows-2 shadow-md bg-blue-900 rounded-xl p-4 gap-2">
            <div className="flex items-center gap-4 text-white rounded-md bg-white/10 p-4 h-20">
              <p className="text-2xl font-bold text-center">50</p>
              <p>Points Remaining</p>
            </div>
            <div className="flex items-center gap-4 text-white rounded-md bg-white/10 p-4 h-20">
              <SiGoogleclassroom size={"2rem"} />
              <p>Go to Classroom</p>
            </div>
            <div className="flex items-center col-span-2 justify-between text-white rounded-md bg-white/10 p-4 h-20"></div>
            <div className="flex items-center justify-between text-white rounded-md bg-white/10 p-4 h-20"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
