"use client";

import { useState } from "react";
import { submitBooking } from "@/app/lib/action";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    travelerCount: 1,
    customerId: "",
    tripTypeId: "",
    packageId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 生成预订编号 (示例格式: BK-日期-随机数)
      const bookingNo = `BK-${new Date()
        .toISOString()
        .slice(0, 10)}-${Math.floor(Math.random() * 1000)}`;

      await submitBooking({
        ...formData,
        BookingDate: new Date().toISOString().split("T")[0],
        BookingNo: bookingNo,
      });

      setSuccess(true);
      // 重置表单
      setFormData({
        travelerCount: 1,
        customerId: "",
        tripTypeId: "",
        packageId: "",
      });

      // 3秒后隐藏成功消息
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="border-l-4 border-green-400 bg-green-50 p-4">
          <p className="text-sm text-green-700">
            Booking submitted successfully!
          </p>
        </div>
      )}

      {error && (
        <div className="border-l-4 border-red-400 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="travelerCount"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Travelers
        </label>
        <input
          type="number"
          id="travelerCount"
          name="travelerCount"
          value={formData.travelerCount}
          onChange={handleChange}
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="customerId"
          className="block text-sm font-medium text-gray-700"
        >
          Customer ID
        </label>
        <input
          type="text"
          id="customerId"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="tripTypeId"
          className="block text-sm font-medium text-gray-700"
        >
          Trip Type
        </label>
        <select
          id="tripTypeId"
          name="tripTypeId"
          value={formData.tripTypeId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select Trip Type</option>
          <option value="B">Business</option>
          <option value="L">Leisure</option>
          <option value="G">Group</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="packageId"
          className="block text-sm font-medium text-gray-700"
        >
          Package (optional)
        </label>
        <input
          type="text"
          id="packageId"
          name="packageId"
          value={formData.packageId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}
