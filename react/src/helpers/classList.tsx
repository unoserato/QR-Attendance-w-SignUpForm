import { getStudentById } from "./studentList";

const subjectList = [
  {
    id: 1,
    instructor: 1,
    enrollmentId: 1,
    subjectCode: "ITEP-201",
    subjectName: "Fundamentals of Programming",
    year: 3,
    section: "A",
  },
  {
    id: 2,
    instructor: 1,
    enrollmentId: 2,
    subjectCode: "ITEP-201",
    subjectName: "Fundamentals of Programming",
    year: 3,
    section: "B",
  },
  {
    id: 1,
    instructor: 2,
    enrollmentId: 3,
    subjectCode: "ITEP-201",
    subjectName: "Fundamentals of Programming",
    year: 3,
    section: "A",
  },
  {
    id: 2,
    instructor: 2,
    enrollmentId: 4,
    subjectCode: "ITEP-201",
    subjectName: "Fundamentals of Programming",
    year: 3,
    section: "B",
  },
];

const enrollments = [
  {
    id: 1,
    studentIds: "0223-2127,0223-2128,0112-0777,0224-0797,0225-1214",
  },
  {
    id: 2,
    studentIds: "0223-2127,0223-2128,0112-0777,0224-0797",
  },
  {
    id: 3,
    studentIds: "0223-2127,0223-2128,0112-0777",
  },
  {
    id: 4,
    studentIds: "0223-2127,0223-2128",
  },
];

// functions
function getSubjectsByInstructorId(id: Number) {
  const subjects = subjectList.filter((s) => s.instructor == id);
  return subjects;
}

export function getStudentsByEnrollmentId(id: Number) {
  const studentId = enrollments.find((a) => a.id == id)?.studentIds;
  const studentIdArray = studentId?.split(",");
  const students = studentIdArray?.map((s) => getStudentById(s));
  return students;
}

export default getSubjectsByInstructorId;
