"use client";

import { Abril_Fatface } from "next/font/google";
import { useState } from "react";
import { UserCommentAction } from "../lib/action";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface",
});

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const patterns = {
    name: /^[a-zA-Z\u00C0-\u00FF'-]{2,}$/,
    phone: /^(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  const messages = {
    name: "Please enter your name.",
    phone: "Phone number must be at least 10 digits.",
    email: "Please enter your email (e.g. example@example.com).",
    message: "Please tell us your thoughts!",
  };

  const validate = (field, value) => {
    try {
      const trimmed = value?.trim();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsSubmitting(true);

    // Final validation before submit
    validate("name", name);
    validate("phone", phone);
    validate("email", email);
    validate("message", message);

    const hasErrors = Object.values(errors).some((err) => err);
    if (hasErrors) {
      setStatusMessage("❌ Please fix the errors before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("message", message);

      const result = await UserCommentAction(formData);

      if (result.success) {
        setStatusMessage("✅ Message sent successfully!");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else {
        setStatusMessage("❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatusMessage("❌ Unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow mb-8 max-w-3xl mx-auto bg-[#f3f2f2] "
      >
        <h2
          className={`text-xl font-semibold mb-5 text-secondary ${abrilFatface.className}`}
        >
          Contact Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xl font-small text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-white w-full p-2 border-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validate("name", e.target.value);
              }}
            />
            {errors.name && (
              <span className="text-sm text-red-600 block mt-1">
                {errors.name}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xl font-small text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="bg-white w-full p-2 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validate("phone", e.target.value);
              }}
            />
            {errors.phone && (
              <span className="text-sm text-red-600 block mt-1">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-small text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className=" bg-white w-full p-2 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validate("email", e.target.value);
              }}
            />
            {errors.email && (
              <span className="text-sm text-red-600 block mt-1">
                {errors.email}
              </span>
            )}
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block text-xl font-small text-gray-700 mb-2"
            >
              Write Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="6"
              aria-label="Write your message"
              className="bg-white w-full p-2 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                validate("message", e.target.value);
              }}
            />
            {errors.message && (
              <span className="text-sm text-red-600 block mt-1">
                {errors.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className="pt-3">
            <p className="text-center text-sm text-gray-700">{statusMessage}</p>
          </div>
        )}
      </form>
    </section>
  );
}
