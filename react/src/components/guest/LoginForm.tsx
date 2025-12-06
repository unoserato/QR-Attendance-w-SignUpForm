import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserContext } from "../../helpers/context";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { student, instructor, login } = useUserContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(email, password);
    if (instructor) {
      navigate("/instructor/dashboard", { replace: true });
    } else if (student) {
      navigate("/student/dashboard", { replace: true });
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 px-2 rounded bg-white w-full"
      >
        <span className="flex flex-col ">
          <label htmlFor="email" className="text-sm text-neutral-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="pl-4 py-3 text-xs md:text-sm focus:outline-blue-500 rounded-xl placeholder:font-light bg-neutral-100"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <span className="flex flex-col relative">
          <label htmlFor="email" className="text-sm text-neutral-500">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            className="pl-4 py-3 text-xs md:text-sm rounded-xl placeholder:font-light focus:outline-blue-500 bg-neutral-100"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-3 right-4 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </span>
        <span className="text-sm text-neutral-500">
          Don't have an account?{" "}
          <b
            className="text-blue-500 underline"
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </b>
        </span>
        <span className="flex items-center font-bold gap-4">
          <button
            type="submit"
            className="bg-blue-500 rounded-full p-2 px-5 font-bold text-white cursor-pointer hover:bg-blue-700"
          >
            Log in
          </button>
          <p className="text-blue-500">Forgot Password?</p>
        </span>
      </form>
    </>
  );
}
export default LoginForm;
