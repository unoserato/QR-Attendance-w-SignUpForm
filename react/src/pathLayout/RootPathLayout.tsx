import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../helpers/context";
import { useEffect } from "react";
import SwitchAccessLoader from "../components/global/SwitchAccessLoader";

function RootPathLayout() {
  const { user, loading, accessMode, isLoggedIn, switchAnimation } =
    useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading && isLoggedIn) return;

    if (isLoggedIn) {
      if (accessMode) {
        navigate("/staff/dashboard", { replace: true });
      } else {
        navigate("/student/dashboard", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  }, [user, navigate, accessMode, isLoggedIn, loading]);

  return (
    <div className="w-dvw h-dvh">
      {switchAnimation ? <SwitchAccessLoader /> : <Outlet />}
    </div>
  );
}

export default RootPathLayout;
