import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../helpers/context";
import { useEffect } from "react";
import SwitchAccessLoader from "../components/global/SwitchAccessLoader";

function RootPathLayout() {
  const { userType, loading, accessMode, isLoggedIn, switchAnimation } =
    useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading && isLoggedIn) return;

    if (isLoggedIn) {
      if (userType === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (userType === "instructor") {
        navigate("/instructor/dashboard", { replace: true });
      } else if (userType === "student") {
        if (accessMode) {
          navigate("/staff/dashboard", { replace: true });
        } else {
          navigate("/student/dashboard", { replace: true });
        }
      }
    } else {
      navigate("/", { replace: true });
    }
  }, [userType, navigate, accessMode, isLoggedIn, loading]);

  return (
    <div className="w-dvw h-dvh">
      {switchAnimation ? <SwitchAccessLoader /> : <Outlet />}
    </div>
  );
}

export default RootPathLayout;
