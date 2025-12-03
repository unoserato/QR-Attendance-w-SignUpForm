import eventList from "./eventList";

const activityList = [
  {
    id: 1,
    eventID: 1,
    name: "Basketball",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque pariatur, ab mollitia non quo quis laborum minima maiores eius ratione distinctio, libero, nihil repellendus repellat aliquam. Necessitatibus dicta velit iure.",
    points: 10,
    location: "Gym",
    startDate: "2025-11-21T08:00:00",
    endDate: "2025-11-25T15:00:00",
    scannerRole: "",
  },
  {
    id: 2,
    eventID: 2,
    name: "Volleyball",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque pariatur, ab mollitia non quo quis laborum minima maiores eius ratione distinctio, libero, nihil repellendus repellat aliquam. Necessitatibus dicta velit iure.",
    points: 10,
    location: "Gym",
    startDate: "2025-11-25T08:00:00",
    endDate: "2025-11-25T15:00:00",
    scannerRole: "Secretary",
  },
  {
    id: 3,
    eventID: 3,
    name: "Act1 for event 2",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque pariatur, ab mollitia non quo quis laborum minima maiores eius ratione distinctio, libero, nihil repellendus repellat aliquam. Necessitatibus dicta velit iure.",
    points: 10,
    location: "Gym",
    startDate: "2025-11-25T07:00:00",
    endDate: "2025-11-25T15:00:00",
    scannerRole: "CS Representative",
  },
  {
    id: 4,
    eventID: 4,
    name: "Act2 for event 2",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque pariatur, ab mollitia non quo quis laborum minima maiores eius ratione distinctio, libero, nihil repellendus repellat aliquam. Necessitatibus dicta velit iure.",
    points: 10,
    location: "LSPU Gymasium",
    startDate: "2025-11-25T08:00:00",
    endDate: "2025-11-25T15:00:00",
    scannerRole: "IT Representative",
  },
  {
    id: 5,
    eventID: 5,
    name: "Act1 for event 3",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque pariatur, ab mollitia non quo quis laborum minima maiores eius ratione distinctio, libero, nihil repellendus repellat aliquam. Necessitatibus dicta velit iure.",
    points: 10,
    location: "Gym",
    startDate: "2025-11-25T08:00:00",
    endDate: "2025-11-25T15:00:00",
    scannerRole: "P.I.O. 2",
  },
  {
    id: 6,
    eventID: 6,
    name: "Act2 for event 3",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque pariatur, ab mollitia non quo quis laborum minima maiores eius ratione distinctio, libero, nihil repellendus repellat aliquam. Necessitatibus dicta velit iure.",
    points: 10,
    location: "Gym",
    startDate: "2025-11-25T08:00:00",
    endDate: "2025-11-25T15:00:00",
    scannerRole: "P.I.O. 1",
  },
];

export interface ActivityType {
  id: number;
  eventID: number;
  name: string;
  desc: string;
  points: number;
  location: string;
  startDate: string;
  endDate: string;
  scannerRole: string;
}

// function
const events = eventList;
export function getEventName(id: number) {
  const ev = events.find((e) => e.id === id);
  return ev ? ev.name : "Unknown Event";
}

export default activityList;
