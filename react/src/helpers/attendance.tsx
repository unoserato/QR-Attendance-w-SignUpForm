const attendanceList = [
  {
    id: 1,
    actID: 1,
    studentID: "0223-2127",
  },
  {
    id: 2,
    actID: 2,
    studentID: "00122-0777",
  },
  {
    id: 3,
    actID: 3,
    studentID: "0223-2128",
  },
  {
    id: 4,
    actID: 4,
    studentID: "0224-0797",
  },
  {
    id: 5,
    actID: 5,
    studentID: "0223-2127",
  },
  {
    id: 6,
    actID: 6,
    studentID: "0224-0797",
  },
  {
    id: 6,
    actID: 6,
    studentID: "0224-0797",
  },
  {
    id: 6,
    actID: 6,
    studentID: "0224-0797",
  },
  {
    id: 6,
    actID: 6,
    studentID: "0224-0797",
  },
  {
    id: 7,
    actID: 3,
    studentID: "0223-2127",
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
  id: number;
  actID: number;
  studentID: string;
}

export default attendanceList;
