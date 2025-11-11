import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    studentID: "",
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    birthDate: "",
    year: "",
    section: "",
    track: "",
    major: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // New state for validation messages
  const [studentIdError, setStudentIdError] = useState("");
  const [ageError, setAgeError] = useState("");

  const trackOptions = [
    "BS Information Technology",
    "BS Information Systems",
    "BS Computer Systems",
  ];

  const yearOptions = ["1", "2", "3", "4"];
  const sectionOptions = ["A", "B", "C", "D"];

  const bsitMajors = [
    "Networking",
    "Web and Mobile Application Development",
    "Animation and Motion Graphics",
    "Service Management Program",
  ];

  // Handle changes
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    // Email validation
    if (name === "email") {
      if (value && !value.endsWith("@lspu.edu.ph")) {
        // just allow typing, alert on submit
        setFormData({ ...formData, [name]: value });
        return;
      }
    }

    // Student ID validation and auto-formatting (NEW)
    if (name === "studentID") {
      let raw = value.replace(/\D/g, ""); // remove all non-digits
      if (raw.length > 8) raw = raw.slice(0, 8); // limit to 8 digits
      let formatted = raw;
      if (raw.length > 4) {
        formatted = `${raw.slice(0, 4)}-${raw.slice(4)}`;
      }
      setFormData({ ...formData, studentID: formatted });

      // Regex: must be 4 digits - 4 digits (numbers only, 0000-0000 allowed)
      const regex = /^\d{4}-\d{4}$/;
      if (formatted && !regex.test(formatted)) {
        setStudentIdError("Student ID must follow the format 0000-0000.");
      } else {
        setStudentIdError("");
      }
      return;
    }

    // Age validation (NEW)
    if (name === "age") {
      const ageValue = parseInt(value, 10);
      if (isNaN(ageValue) || ageValue < 12 || ageValue > 100) {
        setAgeError("Age must be between 12 and 100 years old.");
      } else {
        setAgeError("");
      }
      setFormData({ ...formData, [name]: value });
      return;
    }

    setFormData({ ...formData, [name]: value });
  }

  // Auto-calculate age
  useEffect(() => {
    if (formData.birthDate) {
      const today = new Date();
      const birthDate = new Date(formData.birthDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // Check if age is valid (NEW)
      if (age < 12 || age > 100) {
        setAgeError("Age must be between 12 and 100 years old.");
      } else {
        setAgeError("");
      }

      setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  }, [formData.birthDate]);

  // Clear major if year <=2 or track not BSIT
  useEffect(() => {
    if (formData.year && formData.track) {
      if (
        parseInt(formData.year) <= 2 ||
        formData.track !== "BS Information Technology"
      ) {
        setFormData((prev) => ({ ...prev, major: "" }));
      }
    }
  }, [formData.year, formData.track]);

  // Submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent submission if Student ID is invalid
    if (studentIdError) {
      alert("Please enter a valid Student ID before submitting.");
      return;
    }

    // Prevent submission if age is invalid
    if (ageError) {
      alert("Please enter a valid age (12–100).");
      return;
    }

    if (!formData.email.endsWith("@lspu.edu.ph")) {
      alert("Email must be a @lspu.edu.ph address!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registered:", formData);

    navigate("/", { replace: true });
  }

  return (
    <div className="flex w-screen items-center justify-center bg-gray-50 px-4 md:px-20 py-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900">
            Create Your Account
          </h1>
          <p className="text-gray-500 mt-2">
            Join now and manage your attendance with ease.
          </p>
        </div>

        <form
          className="flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-10 text-xs md:text-sm "
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              className="mt-2 p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          {/* Student ID & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className=" font-medium text-gray-700">Student ID</label>
              <input
                type="text"
                name="studentID"
                placeholder="0000-0000"
                value={formData.studentID}
                className={`mt-2 p-3 rounded-xl focus:outline-none focus:ring-2 ${
                  studentIdError
                    ? "bg-red-100 ring-red-500"
                    : "bg-gray-100 focus:ring-blue-900"
                }`}
                onChange={handleChange}
                required
              />
              {/* Display Student ID Error (NEW) */}
              {studentIdError && (
                <span className="text-red-600 text-xs mt-1">
                  {studentIdError}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className=" font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                placeholder="Fill out birth date first"
                readOnly
                className={`mt-2 p-3 rounded-xl ${
                  ageError
                    ? "bg-red-100 ring-red-500"
                    : "bg-gray-200 focus:outline-none"
                }`}
              />
              {/* Display Age Error (NEW) */}
              {ageError && (
                <span className="text-red-600 text-xs mt-1">{ageError}</span>
              )}
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["firstName", "middleName", "lastName"].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className=" font-medium text-gray-700">
                  {field === "firstName"
                    ? "First Name"
                    : field === "middleName"
                    ? "Middle Name"
                    : "Last Name"}
                </label>
                <input
                  type="text"
                  name={field}
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  value={formData[field as keyof typeof formData]}
                  className="mt-2 p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  onChange={handleChange}
                  required={field !== "middleName"}
                />
              </div>
            ))}
          </div>

          {/* BirthDate & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className=" font-medium text-gray-700">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                className="mt-2 p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className=" font-medium text-gray-700">Year</label>
              <select
                name="year"
                value={formData.year}
                className="mt-2 p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Year
                </option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section, Track, Major */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className=" font-medium text-gray-700">Section</label>
              <select
                name="section"
                value={formData.section}
                className="mt-2 p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Section
                </option>
                {sectionOptions.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className=" font-medium text-gray-700">Track</label>
              <select
                name="track"
                value={formData.track}
                className="mt-2 p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Track
                </option>
                {trackOptions.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className=" font-medium text-gray-700">Major</label>
              <select
                name="major"
                value={formData.major}
                className="mt-2 p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
                onChange={handleChange}
                disabled={
                  parseInt(formData.year) <= 2 ||
                  formData.track !== "BS Information Technology"
                }
              >
                <option value="" disabled hidden>
                  {parseInt(formData.year) <= 2 ||
                  formData.track !== "BS Information Technology"
                    ? "No Major Available"
                    : "Select Major"}
                </option>
                {bsitMajors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className=" font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              className="mt-2 p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-3 right-4 text-gray-600 hover:text-blue-900"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col relative">
            <label className=" font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="mt-2 p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute bottom-3 right-4 text-gray-600 hover:text-blue-900"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-900 text-white font-bold rounded-full px-8 py-3 hover:bg-blue-700 transition"
            >
              Register
            </button>
            <p className="text-gray-500  text-center sm:text-left">
              Already have an account?{" "}
              <b
                className="text-blue-900 underline cursor-pointer"
                onClick={() => navigate("/")}
              >
                Log in
              </b>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
