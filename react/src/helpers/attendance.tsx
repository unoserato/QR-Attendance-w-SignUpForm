const attendanceList = [
  {
    id: 1,
    actID: 1,
    studentID: "0223-2127",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 2,
    actID: 2,
    studentID: "00122-0777",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 3,
    actID: 3,
    studentID: "0223-2128",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 4,
    actID: 4,
    studentID: "0224-0797",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 5,
    actID: 5,
    studentID: "0223-2127",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 6,
    actID: 6,
    studentID: "0224-0797",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 7,
    actID: 6,
    studentID: "0224-0797",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 8,
    actID: 6,
    studentID: "0224-0797",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 9,
    actID: 6,
    studentID: "0224-0797",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 10,
    actID: 3,
    studentID: "0223-2127",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 11,
    actID: 3,
    studentID: "0223-2127",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 12,
    actID: 3,
    studentID: "0223-2127",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
  {
    id: 13,
    actID: 3,
    studentID: "0223-2127",
    time: "2025-11-25T08:00:00",
    scannedBy: "IT Representative",
  },
];

export function getAttendanceByActId(id: Number) {
  const studentsList = attendanceList.filter((a) => a.actID === id);
  return studentsList;
}

export function getAttendanceByStudentId(id: string) {
  const attendance = attendanceList.filter((a) => a.studentID === id);
  return attendance;
}

export interface AttendanceType {
  id: Number;
  actID: Number;
  studentID: string;
  time: string;
  scannedBy: string;
}

export default attendanceList;
