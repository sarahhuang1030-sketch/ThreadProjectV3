"use client";

import { useState } from "react";
import { submitBooking } from "@/lib/action";

export default function BookingForm({ bookingDetail }) {
  const [formData, setFormData] = useState({
    bookingDetailId: bookingDetail.BookingDetailId,
    travelerCount: 1,
    customerId: "",
    tripTypeId: "",
    packageId: bookingDetail.PackageId || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitBooking(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="hidden"
        name="bookingDetailId"
        value={formData.bookingDetailId}
      />

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

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
}
