import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import RootPathLayout from "./pathLayout/RootPathLayout";
import LandingPage from "./guest/LandingPage";
import LandingPagePathLayout from "./pathLayout/LandingPagePathLayout";
import AboutPage from "./guest/AboutPage";
import StudentPageLayout from "./pathLayout/StudentPagePathLayout";
import Dashboard from "./users/student/Dashboard";
import Events from "./users/student/Events";
import QR from "./users/student/QR";
import Activities from "./users/student/Activities";
import Profile from "./users/student/Profile";
import { UserProvider } from "./helpers/context";
import StaffPagePathLayout from "./pathLayout/StaffPagePathLayout";
import StaffDashboard from "./users/staff/StaffDashboard";
import SignUpForm from "./components/guest/SignUpForm";
import StaffQR from "./users/staff/StaffQR";
import ErrorPage from "./components/global/ErrorPage";
import StaffAttendance from "./users/staff/StaffAttendance";
import StaffEventsActivitites from "./users/staff/StaffEventsActivitites";
import InstructorPagePathLayout from "./pathLayout/InstructorPagePathLayout";
import InstructorDashboard from "./users/instructor/InstructorDashboard";
import InstructorClassList from "./users/instructor/InstructorClassList";
import InstructorProfile from "./users/instructor/InstructorProfile";
import AdminPagePathLayout from "./pathLayout/AdminPagePathLayout";
import AdminDashboard from "./users/admin/AdminDashboard";
// import { useEffect } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPathLayout />}>
      <Route path="/" element={<LandingPagePathLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Route>
      <Route path="student" element={<StudentPageLayout />}>
        <Route index element={<Navigate to="dashboard" />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="events" element={<Events />}></Route>
        <Route path="qr" element={<QR />}></Route>
        <Route path="activities" element={<Activities />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Route>
      <Route path="staff" element={<StaffPagePathLayout />}>
        <Route index element={<Navigate to="dashboard" />}></Route>
        <Route path="dashboard" element={<StaffDashboard />}></Route>
        {/* <Route path="events" element={<StaffEvents />}></Route> */}
        <Route path="events" element={<StaffEventsActivitites />}></Route>
        <Route path="qr" element={<StaffQR />}></Route>
        <Route path="attendance" element={<StaffAttendance />}></Route>
        {/* <Route path="activities" element={<StaffActivities />}></Route> */}
        <Route path="*" element={<ErrorPage />}></Route>
      </Route>
      <Route path="instructor" element={<InstructorPagePathLayout />}>
        <Route index element={<Navigate to="dashboard" />}></Route>
        <Route path="dashboard" element={<InstructorDashboard />}></Route>
        <Route path="class-list" element={<InstructorClassList />}></Route>
        <Route path="profile" element={<InstructorProfile />}></Route>
      </Route>
      <Route path="admin" element={<AdminPagePathLayout />}>
        <Route path="dashboard" element={<AdminDashboard />}></Route>
      </Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Route>
  )
);

function App() {
  // const clear = () => {
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);
  //     const value = localStorage.getItem(key!);
  //     localStorage.removeItem(`${key}: ${value}`);
  //   }
  // };

  // useEffect(() => {
  //   clear();
  // }, []);

  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
