import { useEffect, useState } from "react";
import { useUserContext } from "../../helpers/context";
import FullPageLoader from "../../components/global/FullPageLoader";

function QR() {
  const [qr, setQR] = useState(""); // QR image URL
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useUserContext();

  if (!user) {
    return <FullPageLoader />;
  }

  useEffect(() => {
    const encryptedID = btoa(user.studentID);
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      encryptedID
    )}`;

    // Simulate loading by waiting until image is loaded
    const image = new Image();
    image.src = qrURL;

    image.onload = () => {
      setQR(qrURL);
      setLoading(false);
    };

    image.onerror = () => {
      console.error("Failed to load QR code");
      setLoading(true);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">QR Attendance</h2>

      <div className="shadow-md bg-white aspect-square w-full rounded-xl border-t-5 border-t-blue-500 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-center">
            My Personal ID Code
          </h2>
          <p className="text-xs font-light text-neutral-500 text-center">
            Show this to a staff member to record your attendance
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 grid-rows-3 gap-2 animate-pulse w-full aspect-square bg-neutral-200 rounded-xl p-4">
            <div className="col-span-2 bg-neutral-300 rounded-full"></div>
            <div className="col-span-1 bg-neutral-300 rounded-full"></div>
            <div className="row-span-2 bg-neutral-300 rounded-full"></div>
            <div className="col-span-2 bg-neutral-300 rounded-full"></div>
            <div className="bg-neutral-300 rounded-full"></div>
            <div className="bg-neutral-300 rounded-full"></div>
          </div>
        ) : (
          <>
            <img src={qr} alt="my qr code" className="w-full p-4" />
            <h2 className="text-xl font-semibold text-center">
              {user.lastName}, {user.firstName} {user.middleName[0]}.
            </h2>
          </>
        )}
      </div>

      <div className="shadow-md bg-white aspect-square w-full rounded-xl border-t-5 border-t-blue-500 p-4">
        
      </div>
    </div>
  );
}

export default QR;
