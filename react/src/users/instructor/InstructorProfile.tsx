import { useUserContext } from "../../helpers/context";
import FullPageLoader from "../../components/global/FullPageLoader";

function InstructorProfile() {
  const { instructor, logout } = useUserContext();

  if (!instructor) {
    return <FullPageLoader />;
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-full p-4">
        {/* image & id holder */}
        <div className="flex flex-col shadow-md pt-0 rounded-2xl p-6 gap-4">
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center w-full">
              <a
                href={instructor.profileURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instructor.profileURL}
                  alt="Profile Picture"
                  width={200}
                  height={200}
                  className="aspect-square object-cover border-10 border-neutral-700 rounded-full"
                />
              </a>
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
              {instructor.lastName}, {instructor.firstName}
            </h2>
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

export default InstructorProfile;
