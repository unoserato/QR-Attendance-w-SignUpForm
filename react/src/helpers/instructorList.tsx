const instructorList = [
  {
    instructorId: 1,
    lastName: "Llanes",
    firstName: "Jayson",
    profileURL: "/profiles/0223-2127.jpeg",
  },
  {
    instructorId: 2,
    lastName: "Leones",
    firstName: "Joshua",
    profileURL: "/profiles/0223-2127.jpeg",
  },
];

const credentials = [
  {
    instructorId: 1,
    email: "jayson.llanes@lspu.edu.ph",
    password: "jaysonllanes",
  },
  {
    instructorId: 2,
    email: "joshua.leones@lspu.edu.ph",
    password: "joshualeones",
  },
];

export function checkInstructorCredentials(email: string, password: string) {
  const foundCredentials = credentials.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundCredentials) return undefined;

  const foundUser = instructorList.find(
    (i) => i.instructorId === foundCredentials.instructorId
  );
  return foundUser;
}

export interface InstructorType {
  instructorId: Number;
  lastName: string;
  firstName: string;
  profileURL: string;
}

export default instructorList;
