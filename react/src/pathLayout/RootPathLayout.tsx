import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../helpers/context";
import { useEffect } from "react";

function RootPathLayout() {
  const { user, loading, accessMode, isLoggedIn } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading && isLoggedIn) return;

    if (isLoggedIn) {
      accessMode
        ? navigate("/staff/dashboard", { replace: true })
        : navigate("/student/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [user, navigate, accessMode, isLoggedIn, loading]);

  return (
    <div className="w-dvw h-dvh">
      <Outlet />
    </div>
  );
}

export default RootPathLayout;
