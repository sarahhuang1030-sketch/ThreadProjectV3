// app/booking/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const [bookingType, setBookingType] = useState("single");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookingType === "group") {
      router.push("/booking/group");
    } else {
      console.log("处理单人预订");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          travel booking
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Booking type
            </label>
            <select
              value={bookingType}
              onChange={(e) => setBookingType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="single">Single booking</option>
              <option value="group">Multiple bookings</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            {bookingType === "group" ? "进入多人预订" : "开始预订"}
          </button>
        </form>
      </div>
    </div>
  );
}
