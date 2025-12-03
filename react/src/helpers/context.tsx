import React, { createContext, useContext, useState, useEffect } from "react";
import { checkCredentials, type User } from "./userList";

// eto yung parang parameters ng buong function
interface UserContextType {
  user: User | null;
  loading: boolean;
  // global switching para pag refresh same mode parin
  accessMode: boolean;
  // loggedIn checker para di makapag edit ng URL
  isLoggedIn: boolean;
  switchAnimation: boolean;
  login: (email: string, password: string) => void;
  mode: () => void;
  logout: () => void;
}

// createContext then what type of context yung gagawin
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// .Provider property na niconvert to UserProvider para one access nalang
// then yung nasa loob is mga exported functions can be access with { variableName } > see example in /pathLayout/StudentPathLayout.tsx
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // loading for slow render
  const [accessMode, setAccessMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [switchAnimation, setSwitchAnimation] = useState(false);

  // runs on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }

    const storedMode = sessionStorage.getItem("accessMode");
    if (storedMode) {
      setAccessMode(JSON.parse(storedMode));
    }

    setLoading(false);
  }, []);

  const mode = () => {
    if (user?.isStaff) {
      // get current mode from sessionStorage (if it exists)
      const currentMode = JSON.parse(
        sessionStorage.getItem("accessMode") || "false"
      );

      // toggle the mode
      const newMode = !currentMode;
      setSwitchAnimation(true);

      // update both state and sessionStorage
      setAccessMode(newMode);
      sessionStorage.setItem("accessMode", JSON.stringify(newMode));
      setTimeout(() => {
        setSwitchAnimation(false);
      }, 2800);
    }
  };

  // dummy login function eto babaguhin mo
  const login = (email: string, password: string) => {
    const foundUser = checkCredentials(email, password);
    if (!foundUser) {
      alert("Invalid email or password");
      return;
    }

    // Leave this as is pang save sa localStorage lang to
    localStorage.setItem("user", JSON.stringify(foundUser));
    setUser(foundUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    // pag nalagay na sa storage si user set to loggedIn(false) na
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        accessMode,
        isLoggedIn,
        switchAnimation,
        login,
        mode,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used inside a <UserProvider>");
  return context;
}
