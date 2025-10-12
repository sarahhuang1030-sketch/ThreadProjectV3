"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const packageId = parseInt(searchParams.get("packageId") || "0");

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    packageId, // Auto-fill from URL
  });

  const [submissionStatus, setSubmissionStatus] =
    (useState < "idle") | "success" | ("error" > "idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("idle");

    try {
      // Simulate API call to create customer & booking
      const customerResponse = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.customerName,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const customerData = await customerResponse.json();

      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: customerData.id,
          packageId: formData.packageId,
          status: "pending",
        }),
      });

      await bookingResponse.json();
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Submission error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>预订旅游套餐</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="customerName"
          placeholder="姓名"
          value={formData.customerName}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="邮箱"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="电话"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <input type="hidden" name="packageId" value={formData.packageId} />
        <button
          type="submit"
          style={{
            background: "#0070f3",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
          }}
        >
          提交预订
        </button>
      </form>

      {submissionStatus === "success" && (
        <div style={{ marginTop: "20px", color: "green" }}>
          ✅ 预订成功！我们会尽快联系您。
        </div>
      )}
      {submissionStatus === "error" && (
        <div style={{ marginTop: "20px", color: "red" }}>
          ❌ 提交失败，请稍后再试。
        </div>
      )}
    </div>
  );
}
