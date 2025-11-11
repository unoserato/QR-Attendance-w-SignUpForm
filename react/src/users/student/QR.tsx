import { useState } from "react";
import { useUserContext } from "../../helpers/context";
import FullPageLoader from "../../components/global/FullPageLoader";
import activitiesList from "../../helpers/activityList";

function QR() {
  const [qr, setQR] = useState(""); // QR image URL
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedQR, setSelectedQR] = useState("");
  const [expiry, setExpiry] = useState(0);
  const [selectedAct, setSelectedAct] = useState<string | undefined>("");
  const { user } = useUserContext();
  const qrOptions = activitiesList.filter((act) => !act.attended) || [];

  if (!user) {
    return <FullPageLoader />;
  }

  function generateToken(length = 8) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
  }

  function handleSubmit() {
    if (!selectedQR || expiry > 0) {
      return;
    }

    // Get activity ID and name
    const actID = selectedQR.split("_")[0]; // note: first part is activity ID
    const selectedActivity = qrOptions.find((opt) => opt.id == Number(actID));
    setSelectedAct(selectedActivity?.name);

    // Generate unique QR data: studentID + activityID + timestamp + random token
    const timestamp = new Date().toISOString();
    const randomToken = generateToken(16); // smaller token for QR
    const qrData = `${selectedQR}_${timestamp}_${randomToken}`;

    console.log(qrData.trim());
    const encryptedID = btoa(qrData);
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      encryptedID
    )}`;

    setLoading(true);
    const image = new Image();
    image.src = qrURL;

    image.onload = () => {
      setQR(qrURL);
      setLoading(false);
      setExpiry(15);

      // Automatically remove QR after n seconds
      setTimeout(() => {
        setQR("");
        setSelectedAct("");
        setLoading(true);
      }, 15000);
    };

    image.onerror = () => {
      console.error("Failed to load QR code");
      setLoading(false);
    };

    const countdown = setInterval(() => {
      setExpiry((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">QR Attendance</h2>

      <div className="flex flex-col gap-2 shadow-md bg-white aspect-square w-full rounded-xl border-t-5 border-t-blue-500 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-center">
            My Generated ID Code
          </h2>
          <p className="text-xs font-light text-neutral-500 text-center">
            {qr != ""
              ? "Show this to a staff member to record your attendance"
              : "Please Generate a QR first"}
          </p>
          {expiry > 0 && <p className="text-xs">Expires in: {expiry}</p>}
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
            <p className="text-sm text-blue-900 text-center">{selectedAct}</p>
            <h2 className="text-xl font-semibold text-center">
              {user.lastName}, {user.firstName} {user.middleName[0]}.
            </h2>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 shadow-md bg-white w-full rounded-xl border-t-5 border-t-blue-500 p-4">
        <div className="flex flex-col gap-1 w-full">
          <p className="font-semibold text-neutral-500 text-xs">
            Generate QR for:
          </p>
          <select
            name="qrOptions"
            id="qrOptions"
            className="w-full ring-1 ring-blue-900 p-2 rounded"
            value={selectedQR}
            onChange={(e) => {
              setSelectedQR(e.target.value);
            }}
          >
            <option>Select Activity to generate QR</option>
            {qrOptions.map((qr) => (
              <option key={qr.id} value={`${qr.id}_${user.studentID}`}>
                {qr.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="flex w-full rounded-xl bg-blue-900 text-white justify-center items-center font-bold p-2"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default QR;
