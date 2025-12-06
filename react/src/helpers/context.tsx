import React, { createContext, useContext, useState, useEffect } from "react";
import { checkCredentials, type StudentType } from "./studentList";
import {
  checkInstructorCredentials,
  type InstructorType,
} from "./instructorList";
// import { Navigate } from "react-router-dom";

// eto yung parang parameters ng buong function
interface UserContextType {
  userType: "student" | "instructor" | "admin" | "";
  student: StudentType | null;
  instructor: InstructorType | null;
  loading: boolean;
  // global switching para pag refresh same mode parin
  accessMode: boolean;
  switchAnimation: boolean;
  // loggedIn checker para di makapag edit ng URL
  isLoggedIn: boolean;
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
  const [userType, setUserType] = useState<
    "student" | "instructor" | "admin" | ""
  >("");
  const [student, setStudent] = useState<StudentType | null>(null);
  const [instructor, setInstructor] = useState<InstructorType | null>(null);
  const [loading, setLoading] = useState(true); // loading for slow render
  const [accessMode, setAccessMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [switchAnimation, setSwitchAnimation] = useState(false);

  // runs on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if ("adminId" in parsedUser) {
        setUserType("admin");
      } else if ("instructorId" in parsedUser) {
        setInstructor(parsedUser);
        setUserType("instructor");
      } else if ("studentID" in parsedUser) {
        setStudent(parsedUser);
        setUserType("student");
      }
      setIsLoggedIn(true);
    }

    const storedMode = sessionStorage.getItem("accessMode");
    if (storedMode) {
      setAccessMode(JSON.parse(storedMode));
    }

    setLoading(false);
  }, []);

  const mode = () => {
    if (student?.isStaff) {
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
    const foundAdmin = email === "admin@admin.com" && password === "admin123";
    const foundInstructor = checkInstructorCredentials(email, password);
    const foundStudent = checkCredentials(email, password);
    let foundUser;

    if (foundAdmin) {
      setUserType("admin");
      foundUser = { adminId: 1 };
    } else if (foundInstructor) {
      setInstructor(foundInstructor);
      setUserType("instructor");
      foundUser = foundInstructor;
      // localStorage.setItem("user", JSON.stringify(foundInstructor));
    } else if (foundStudent) {
      setStudent(foundStudent);
      setUserType("student");
      foundUser = foundStudent;
      // localStorage.setItem("user", JSON.stringify(foundStudent));
    } else {
      alert("Invalid email or password");
      return;
    }
    localStorage.setItem("user", JSON.stringify(foundUser));
    setIsLoggedIn(true);
  };

  const logout = () => {
    // remove all states value
    localStorage.removeItem("user");
    setUserType("");
    setStudent(null);
    setInstructor(null);
    setAccessMode(false);
    setIsLoggedIn(false);
    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        userType,
        student,
        instructor,
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
