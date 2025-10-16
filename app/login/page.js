"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeadingPic } from "../components/Heading";
import Link from "next/link";
import { Abril_Fatface } from "next/font/google";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export default function LoginForm() {
  const [formData, setFormData] = useState({
    CustFirstName: "",
    CustLastName: "",
    CustEmail: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

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
        window.dispatchEvent(new Event("storage"));
        setTimeout(() => {
          router.push("/");
        }, 1000); // 2-second delay
      } else {
        setMessage("Invalid credentials.");
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
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="CustLastName"
          placeholder="Last Name"
          value={formData.CustLastName}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="CustEmail"
          placeholder="Email"
          value={formData.CustEmail}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {message && (
          <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
        )}
        <div>
          New User? Please Register <Link href="/customer">Here</Link>
        </div>
      </form>
    </>
  );
}
