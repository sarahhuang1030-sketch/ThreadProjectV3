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
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8"
      >
        <h2
          className={`text-xl font-semibold mb-4 text-secondary ${abrilFatface.className}`}
        >
          Contact Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validate("name", e.target.value);
              }}
            />
            {errors.name && (
              <span className="text-danger text-sm">{errors.name}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validate("phone", e.target.value);
              }}
            />
            {errors.phone && (
              <span className="text-danger text-sm">{errors.phone}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control w-100"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validate("email", e.target.value);
              }}
            />
            {errors.email && (
              <span className="text-danger text-sm">{errors.email}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Write Message
            </label>
            <textarea
              name="message"
              id="message"
              className="form-control"
              cols="30"
              rows="6"
              aria-label="Write your message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                validate("message", e.target.value);
              }}
            />
            {errors.message && (
              <span className="text-danger text-sm">{errors.message}</span>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>

        {statusMessage && (
          <div className="pt-3">
            <p>{statusMessage}</p>
          </div>
        )}
      </form>

      {/* <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2 text-secondary">
          Contact Info
        </h3>
        <p>
          <span className="font-bold">Address:</span> 98 West 21th Street, Suite
          721 Calgary AB T3K 0D4
        </p>
        <p>
          <span className="font-bold">Phone:</span> +1 (800) 555-TRVL
        </p>
        <p>
          <span className="font-bold">Email:</span> info@worldtravel.com
        </p>
      </div> */}
    </section>
  );
}
