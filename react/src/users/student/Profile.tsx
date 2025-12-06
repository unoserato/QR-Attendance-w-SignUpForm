import { PiIdentificationBadgeFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../helpers/context";
import FullPageLoader from "../../components/global/FullPageLoader";

function Profile() {
  const navigate = useNavigate();
  const { student, logout } = useUserContext();
  let suffix;

  if (!student) {
    return <FullPageLoader />;
  }

  switch (student.year) {
    case 1:
      suffix = "st";
      break;
    case 2:
      suffix = "nd";
      break;
    case 3:
      suffix = "rd";
      break;
    case 4:
      suffix = "th";
      break;
    default:
      break;
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-full p-4">
        {/* image & id holder */}
        <div className="flex flex-col shadow-md pt-0 rounded-2xl p-6">
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center w-full">
              <a
                href={student.profileURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={student.profileURL}
                  alt="Profile Picture"
                  width={200}
                  height={200}
                  className="aspect-square object-cover border-10 border-neutral-700 rounded-full"
                />
              </a>
              <div
                className="flex flex-col gap-0 shadow-md items-center -mt-6 rounded-md bg-white"
                onClick={() => navigate("/student/qr")}
              >
                <PiIdentificationBadgeFill size={"3rem"} fill="#404040" />
                <p className="-mt-1 font-bold text-xs">ID</p>
              </div>
            </div>
          </div>
          {/* personal info holder */}
          <div
            className="
            flex flex-col
            justify-center items-center
            font-bold
            w-full"
          >
            <h2 className="text-2xl">
              {student.lastName}, {student.firstName} {student.middleName[0]}.
            </h2>
            <h3 className="text-sm text-neutral-500">{student.major}</h3>
            <h4 className="text-xs font-semibold text-neutral-500">
              {student.year}
              {suffix} Year | BS {student.course}
            </h4>
            <h5></h5>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col shadow-md p-6 rounded-2xl gap-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">Points Remaining</p>
            <p className="font-bold text-blue-500 text-2xl">50</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center p-4 rounded-xl bg-blue-600 text-white">
              <div className="flex flex-col">
                <h2 className="text-md font-bold">ITEP 101</h2>
                <p className="text-xs">Integrative Programming</p>
                <p className="text-xs">Max Points: 20</p>
              </div>
              <div className="flex flex-col items-center bg-white/20 p-1 rounded-md w-13">
                <p className="font-bold text-2xl">10</p>
                <p className="text-xs w-full text-center bg-blue-600 rounded-xl">
                  Edit
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-blue-600 text-white">
              <div className="flex flex-col">
                <h2 className="text-md font-bold">ITEP 105</h2>
                <p className="text-xs">Object Oriented Programming</p>
                <p className="text-xs">Max Points: 20</p>
              </div>
              <div className="flex flex-col items-center bg-white/20 p-1 rounded-md w-13">
                <p className="font-bold text-2xl">10</p>
                <p className="text-xs w-full text-center bg-blue-600 rounded-xl">
                  Edit
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Logout */}
        <div className="w-full">
          <button
            className="flex w-full rounded-xl bg-red-500 text-white p-4 font-bold"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
