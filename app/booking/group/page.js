"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function GroupBookingPage() {
  const [travelers, setTravelers] = useState([]);
  const [primary, setPrimary] = useState({ name: "", id: "" });
  const router = useRouter();

  const addTraveler = () => {
    setTravelers([...travelers, { name: "", id: "" }]);
  };

  const removeTraveler = (index) => {
    setTravelers(travelers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = { primary, travelers };

    // 调用API
    const res = await fetch("/api/group-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (res.ok) {
      router.push("/booking/confirm");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        <div>
          <title>Multi-person booking</title>
        </div>

        {/* Table */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Multi-person booking details
          </h1>
          <button
            onClick={() => router.push("/booking")}
            className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
          >
            Return to main booking
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* main booker */}
          <div className="rounded-lg bg-gray-50 p-6 shadow-inner">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              main booker
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name *:
                </label>
                <input
                  type="text"
                  value={primary.name}
                  onChange={(e) =>
                    setPrimary({ ...primary, name: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  value={primary.email}
                  onChange={(e) =>
                    setPrimary({ ...primary, email: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* companions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">
                traveling companions (Total: {travelers.length} person)
              </h3>
              <button
                type="button"
                onClick={addTraveler}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                + Add peers
              </button>
            </div>

            {travelers.map((traveler, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-6 shadow-inner"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-700">
                    traveling companions {index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeTraveler(index)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={traveler.name}
                      onChange={(e) => {
                        const newTravelers = [...travelers];
                        newTravelers[index].name = e.target.value;
                        setTravelers(newTravelers);
                      }}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="text"
                      value={traveler.email}
                      onChange={(e) => {
                        const newTravelers = [...travelers];
                        newTravelers[index].email = e.target.value;
                        setTravelers(newTravelers);
                      }}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Submit booking
          </button>
        </form>
      </div>
    </div>
  );
}
