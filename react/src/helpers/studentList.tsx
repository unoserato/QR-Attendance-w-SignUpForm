// mock database
const userList = [
  {
    id: 1,
    studentID: "0223-2127",
    lastName: "Serato",
    firstName: "Uno Ysmael",
    middleName: "Reyes",
    age: 21,
    year: 3,
    section: "A",
    course: "Information Technology",
    major: "Web and Mobile Application Development",
    profileURL: "/profiles/0223-2127.jpeg",
    isStaff: true,
    role: "Secretary",
  },
  {
    id: 2,
    studentID: "0223-2128",
    lastName: "Boragay",
    firstName: "John Mark",
    middleName: "Delos Reyes",
    age: 22,
    year: 3,
    section: "A",
    course: "Information Technology",
    major: "Web and Mobile Application Development",
    profileURL: "/profiles/0223-2128.jpg",
    isStaff: true,
    role: "President",
  },
  {
    id: 3,
    studentID: "0122-0777",
    lastName: "Torres",
    firstName: "Renzel",
    middleName: "Nueva",
    age: 22,
    year: 4,
    section: "A",
    course: "Industrial Technology",
    major: "Architectural Drafting Technology",
    profileURL: "/profiles/0122-0777.jpeg",
    isStaff: false,
    role: "Student",
  },
  {
    id: 4,
    studentID: "0224-0797",
    lastName: "Libarnes",
    firstName: "Rommel Jireh",
    middleName: "Timbang",
    age: 19,
    year: 2,
    section: "B",
    course: "Information Technology",
    major: "No Major",
    profileURL: "/profiles/0224-0797.jpeg",
    isStaff: true,
    role: "PIO",
  },
  {
    id: 5,
    studentID: "0225-1214",
    lastName: "Penid",
    firstName: "Jesrod Shem",
    middleName: "Timbang",
    age: 19,
    year: 1,
    section: "A",
    course: "Mechanical Engineer",
    major: "No Major",
    profileURL: "/profiles/0224-0797.jpeg",
    isStaff: true,
    role: "Student",
  },
  {
    id: 6,
    studentID: "1234-5678",
    lastName: "lastName",
    firstName: "firstName",
    middleName: "middleName",
    age: 20,
    year: 3,
    section: "B",
    course: "Information Technology",
    major: "Animation and Motion Graphics",
    profileURL: "/profiles/0223-2128.jpeg",
    isStaff: false,
    role: "Student",
  },
];

const userCredentials = [
  {
    studentID: "0223-2127",
    email: "unoysmael.serato@lspu.edu.ph",
    password: "unoserato",
  },
  {
    studentID: "0223-2128",
    email: "johnmark.boragay@lspu.edu.ph",
    password: "johnmarkboragay",
  },
  {
    studentID: "0122-0777",
    email: "renzel.torres@lspu.edu.ph",
    password: "renzeltorres",
  },
  {
    studentID: "0224-0797",
    email: "rommeljireh.libarnes@lspu.edu.ph",
    password: "rommeljireh",
  },
  {
    studentID: "0225-1214",
    email: "jesrodshem.penid@lspu.edu.ph",
    password: "jesrodshem",
  },
  {
    studentID: "0224-0797",
    email: "guest@lspu.edu.ph",
    password: "guest123",
  },
];

// export functions
export function checkCredentials(email: string, password: string) {
  const foundCredentials = userCredentials.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundCredentials) return undefined;

  const foundUser = userList.find(
    (u) => u.studentID === foundCredentials.studentID
  );
  return foundUser;
}

export function getStudentById(id: string) {
  const student = userList.find((u) => u.studentID === id);
  return student;
}

export interface StudentType {
  id: number;
  studentID: string;
  lastName: string;
  firstName: string;
  middleName: string;
  age: number;
  year: number;
  section: string;
  course: string;
  major: string;
  profileURL: string;
  isStaff: boolean;
  role: string;
}

export default userList;
