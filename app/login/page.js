"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeadingPic } from "../components/Heading";
import Link from "next/link";
import { Abril_Fatface } from "next/font/google";
import { useUser } from "../context/usercontext";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export default function LoginForm() {
  const { setUser } = useUser();
  const [CustFirstName, setFirstname] = useState("");
  const [CustLastName, setLastname] = useState("");
  const [CustEmail, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  // const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    CustFirstName: "",
    CustLastName: "",
    CustEmail: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const patterns = {
    //allows letters (uppercase and lowercase), accents, and hyphens, and requires at least two characters.
    CustFirstName: /^[a-zA-Z\u00C0-\u00FF'-]{2,}$/,
    CustLastName: /^[a-zA-Z\u00C0-\u00FF'-]{2,}$/,
    CustEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  const validate = (field, value) => {
    try {
      const trimmed = value?.trim();
      const messages = {
        CustFirstName: "Please enter your first name.",
        CustLastName: "Please enter your last name.",
        CustEmail: "Please enter your email (e.g. example@example.com).",
      };

      if (!trimmed) {
        setErrors((prev) => ({
          ...prev,
          [field]: messages[field] || `${field} is required.`,
        }));
      } else if (patterns[field] && !patterns[field].test(trimmed)) {
        setErrors((prev) => ({
          ...prev,
          [field]: messages[field],
        }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
    } catch (err) {
      console.error(`Validation error for ${field}:`, err);
      setErrors((prev) => ({
        ...prev,
        [field]: `Error validating ${field}`,
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/bookings/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setMessage("Login successful! Redirecting...");
        localStorage.setItem("CustFirstName", formData.CustFirstName);
        setUser(formData.CustFirstName);
        //  window.dispatchEvent(new Event("storage"));

        setTimeout(() => {
          router.push("/");
        }, 1000); // 1 second delay
      } else {
        setMessage(
          result.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Unexpected error. Please try again.");
    }
  };

  return (
    <>
      <HeadingPic bgClass="bgimg2" heading="Login" />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
      >
        <h2
          className={`${abrilFatface.className} text-xl font-bold mb-4 text-secondary`}
        >
          Login
        </h2>
        <input
          type="text"
          name="CustFirstName"
          placeholder="First Name"
          value={formData.CustFirstName}
          //onChange={handleChange}
          onChange={(e) => {
            const value = e.target.value;
            // setFormData((prev) => ({ ...prev, CustFirstName: value }));
            handleChange(e);
            setFirstname(value); // if you're tracking this separately
            validate("CustFirstName", value);
          }}
          onBlur={() => validate("CustFirstName", CustFirstName)}
          className="w-full mb-3 p-2 border rounded"
          required
        />{" "}
        {errors?.CustFirstName && (
          <span className="error">{errors.CustFirstName}</span>
        )}
        <input
          type="text"
          name="CustLastName"
          placeholder="Last Name"
          value={formData.CustLastName}
          //onChange={handleChange}
          onChange={(e) => {
            const value = e.target.value;
            // setFormData((prev) => ({ ...prev, CustFirstName: value }));
            handleChange(e);
            setLastname(value); // if you're tracking this separately
            validate("CustLastName", value);
          }}
          onBlur={() => validate("CustLastName", CustLastName)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        {errors?.CustLastName && (
          <span className="error">{errors.CustLastName}</span>
        )}
        <input
          type="email"
          name="CustEmail"
          placeholder="Email"
          value={formData.CustEmail}
          // onChange={handleChange}
          onChange={(e) => {
            const value = e.target.value;
            // setFormData((prev) => ({ ...prev, CustFirstName: value }));
            handleChange(e);
            setEmail(value); // if you're tracking this separately
            validate("CustEmail", value);
          }}
          onBlur={() => validate("CustEmail", CustEmail)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        {errors?.CustEmail && <span className="error">{errors.CustEmail}</span>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {message && (
          <p
            className={`mt-3 text-center text-lg font-semibold ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <div>
          New User? Please Register <Link href="/customer">Here</Link>
        </div>
      </form>
    </>
  );
}
