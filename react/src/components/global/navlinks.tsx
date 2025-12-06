import { FaClipboardList } from "react-icons/fa";
import { IoMdQrScanner } from "react-icons/io";
import { LuActivity } from "react-icons/lu";
import { MdAnalytics, MdDashboard, MdEvent, MdPeople } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

export const studentLinks = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Events",
    path: "/student/events",
    icon: <MdEvent />,
  },
  {
    name: "QR",
    path: "/student/qr",
    icon: <IoMdQrScanner />,
  },
  {
    name: "Activities",
    path: "/student/activities",
    icon: <LuActivity />,
  },

  {
    name: "Classroom",
    path: "/student/classroom",
    icon: <SiGoogleclassroom />,
  },
];

export const authorizedStaffLinks = [
  {
    name: "Dashboard",
    path: "/staff/dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Events",
    path: "/staff/events",
    icon: <MdEvent />,
  },
  {
    name: "Attendance",
    path: "/staff/attendance",
    icon: <FaClipboardList />,
  },
  {
    name: "Users",
    path: "/staff/users",
    icon: <MdPeople />,
  },

  {
    name: "Analytics",
    path: "/staff/analytics",
    icon: <MdAnalytics />,
  },
];

export const instructorLinks = [
  {
    name: "Dashboard",
    path: "/instructor/dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Class List",
    path: "/instructor/class-list",
    icon: <SiGoogleclassroom />,
  },
];

export const guestLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Features",
    path: "/features",
  },
  {
    name: "Sign Up",
    path: "/sign-up",
  },
];
