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
// import { useEffect } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPathLayout />}>
      <Route path="/" element={<LandingPagePathLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="sign-up" element={<SignUpForm />} />
      </Route>
      <Route path="student" element={<StudentPageLayout />}>
        <Route index element={<Navigate to="dashboard" />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="events" element={<Events />}></Route>
        <Route path="qr" element={<QR />}></Route>
        <Route path="activities" element={<Activities />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>
      <Route path="/staff" element={<StaffPagePathLayout />}>
        <Route index element={<Navigate to="dashboard" />}></Route>
        <Route path="dashboard" element={<StaffDashboard />}></Route>
      </Route>
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
