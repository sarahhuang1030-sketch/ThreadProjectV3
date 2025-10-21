"use client";
import { useState } from "react";

export function ContactForm() {
  const [CustFirstName, setFirstname] = useState("");
  const [CustLastName, setLastname] = useState("");
  const [CustEmail, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = {
      name: CustFirstName,
      phone: CustLastName,
      email: CustEmail,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setMessage("✅ Message sent successfully!");
        setFirstname("");
        setLastname("");
        setEmail("");
        e.target.message.value = "";
      } else {
        setMessage("❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("❌ Unexpected error. Please try again.");
    }
  };

  return (
    <section className="section1">
      <div className="row">
        <div className="col-md-5" style={{ marginLeft: "200px" }}>
          <form
            onSubmit={handleSubmit}
            className={`border border-gray-300 rounded p-md-5 p-4 mb-5 ${abrilFatface.className}`}
          >
            <div className="row">
              <div className="form-group1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={CustFirstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group1">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={CustLastName}
                  onChange={(e) => setLastname(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-12 form-group1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={CustEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control w-100"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group1">
                <label htmlFor="message">Write Message</label>
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                  cols="30"
                  rows="8"
                  aria-label="Write your message"
                  required
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 pt-3 form-group1">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </div>
            {message && (
              <p className="mt-3 text-lg font-semibold text-center text-red-600">
                {message}
              </p>
            )}
          </form>
        </div>
        {/* Contact Info Section stays the same */}
      </div>
    </section>
  );
}
