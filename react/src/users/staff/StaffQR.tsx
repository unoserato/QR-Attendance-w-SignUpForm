import { useEffect, useState } from "react";
import activitiesList, { type ActivityType } from "../../helpers/activityList";
import { useUserContext } from "../../helpers/context";
import FullPageLoader from "../../components/global/FullPageLoader";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import type { User } from "../../helpers/userList";
import userList from "../../helpers/userList";

function StaffQR() {
  const { user } = useUserContext();
  const acts = activitiesList || [];
  const students = userList || [];
  const [scannerFor, setScannerFor] = useState<ActivityType | null>(null);
  // const [scanned, setScanned] = useState<IDetectedBarcode[] | null>(null);
  const [pausedScanner, setPausedScanner] = useState(true);
  const [scannedList, setScannedList] = useState<User[]>([]);
  const [backupList, setBackupList] = useState<User[]>([]);

  useEffect(() => {
    const matchedAct = acts.find((act) => act.scannerRole === user?.role);
    if (matchedAct) setScannerFor(matchedAct);
  }, [user, acts]);

  function playBeep() {
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine"; // sine wave
    oscillator.frequency.value = 1000; // 1000 Hz beep
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1); // 0.1 second beep
  }

  // automatic scan
  function handleScan(scan: IDetectedBarcode[] | null) {
    if (scan && scan.length > 0) {
      const regex = /^\d{4}-\d{4}$/;
      let decoded = "";

      // error for non-ascii id
      try {
        decoded = atob(scan[0].rawValue);
      } catch (error) {
        alert("Invalid QR Code Format");
        return; // stop here so it doesn't continue
      }

      if (regex.test(decoded)) {
        // playBeep();

        const data = students.find((student) => student.studentID === decoded);

        if (data) {
          setScannedList((prev) => {
            if (!prev.some((s) => s.studentID === data.studentID)) {
              const updated = [...prev, data];
              setBackupList(updated); // store full list
              return updated;
            }
            return prev;
          });
        } else {
          alert("Student not found.");
        }
      } else {
        alert("Invalid ID Format");
      }
    }
  }

  // capture to scan
  // function handleCaptureScan() {
  //   if (scanned && scanned.length > 0) {
  //     const regex = /^\d{4}-\d{4}$/;
  //     const decoded = atob(scanned[0].rawValue);
  //     if (regex.test(decoded)) {
  //       playBeep();
  //       alert("Scanned value: " + decoded);
  //       // TODO: backend call here JM
  //     } else {
  //       alert("Invalid ID Format");
  //     }
  //     setScanned(null);
  //   }
  // }

  if (!user) return <FullPageLoader />;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">QR Attendance</h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 shadow-md bg-white aspect-square w-full rounded-xl border-t-5 border-t-blue-500 p-4">
          {scannerFor ? (
            <>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-center">
                  Scanner for {scannerFor.name}
                </h2>
                <p className="text-xs font-light text-neutral-500 text-center">
                  Scan the QR of the students to record their attendance
                </p>
              </div>
              {/* Scanner */}
              <div className="w-full">
                <Scanner
                  onScan={(result) => {
                    handleScan(result);
                    // setScanned(result);
                  }}
                  // sound={false}
                  paused={pausedScanner}
                  constraints={{ facingMode: "environment" }}
                  onError={(err) => console.error(err)}
                  styles={{ container: { width: "100%", height: "100%" } }}
                  allowMultiple={true}
                />
              </div>
            </>
          ) : (
            <h2 className="flex w-full h-full items-center text-center">
              You are not part of the scanning group
              <br />
              {`:(`}
            </h2>
          )}
        </div>
        {/* toggle scanner button */}
        <div className="w-full">
          <button
            className={`w-full rounded-xl  text-white font-bold p-4 ${
              pausedScanner
                ? "bg-blue-900 active:bg-blue-600"
                : "bg-red-900 active:bg-red-600"
            }`}
            onClick={() => setPausedScanner(!pausedScanner)}
          >
            {pausedScanner ? "Open Scanner" : "Close Scanner"}
          </button>
        </div>
        {/* scanned table */}
        <div className="flex flex-col gap-2 shadow-md bg-white w-full rounded-xl border-t-5 border-t-blue-500 p-4">
          <h2 className="font-semibold text-neutral-500">Scanned Students</h2>
          <input
            type="text"
            name="searchStudent"
            id="searchStudent"
            placeholder="Search student..."
            className="outline-1 text-xs p-2 rounded-md"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();

              if (value === "") {
                setScannedList(backupList); // restore full list
                return;
              }

              setScannedList(
                backupList.filter((fil) =>
                  (fil.firstName + " " + fil.lastName + " " + fil.middleName)
                    .toLowerCase()
                    .includes(value)
                )
              );
            }}
          />
          <table className="w-full max-h-200 overflow-y-auto text-center text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Number</th>
                <th className="p-2 border">Student ID</th>
                <th className="p-2 border">Name</th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {scannedList?.length === 0 ? (
                <tr>
                  <td className="p-3 text-center border" colSpan={3}>
                    No scanned records yet.
                  </td>
                </tr>
              ) : (
                scannedList?.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{item.studentID}</td>
                    <td className="p-2 border">
                      {item.lastName}, {item.firstName} {item.middleName[0]}.{" "}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* <div className="p-4 bg-blue-900" onClick={handleCaptureScan}>
          Scan
        </div> */}
      </div>
    </div>
  );
}

export default StaffQR;
