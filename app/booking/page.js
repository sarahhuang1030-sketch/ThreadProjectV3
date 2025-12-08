"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { HeadingPic } from "../components/Heading";
// import Link from "next/link";
import { Abril_Fatface } from "next/font/google";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export default function BookingPage({SearchParams}) {
  const router = useRouter();

  // Package parameters from URL
  const packageId = searchParams?.packageId;
  const price = searchParams?.price;
  const pkgName = searchParams?.name;

  // Package details state
  const [packageDetails, setPackageDetails] = useState({
    PackageId: packageId || "",
    PkgName: pkgName || "LOADING...",
    PkgBasePrice: price ? parseInt(price) : 0,
    PkgStartDate: "",
    PkgEndDate: "",
  });

  // Form data state (including customer fields)
  const [formData, setFormData] = useState({
    // Customer fields
    CustomerId: Math.floor(Math.random() * 10000),
    CustFirstName: "",
    CustLastName: "",
    CustEmail: "",
    // CustHomePhone: "",
    // CustBusPhone: "",
    CustAddress: "",
    CustCity: "",
    CustProv: "",
    CustPostal: "",
    CustCountry: "",

    // Booking fields
    TripStart: "",
    TripEnd: "",
    Description: "",
    Destination: "",
    BasePrice: price ? parseInt(price) : 0,
    PackageId: packageId || "",
  });

  // Travelers state (customer is automatically the first traveler)
  const [customers, setCustomers] = useState([
    {
      firstname: formData.CustFirstName,
      endname: formData.CustEndName,
      address: formData.CustAddress,
      city: formData.CustCity,
      province: formData.CustProv,
      country: formData.CustCountry,
      postal: formData.CustPostal,
      email: formData.CustEmail,
    },
  ]);

  // Function to add traveler
  const addCustomer = () => {
    setCustomers([
      ...customers,
      {
        firstname: "",
        endname: "",
        address: "",
        city: "",
        province: "",
        country: "",
        postal: "",
        email: "",
      },
    ]);
  };

  // Function to remove traveler
  const removeCustomer = (index) => {
    if (index === 0) return; // Can't remove the primary traveler (customer)
    setCustomers(customers.filter((_, i) => i !== index));
  };

  // Function to handle traveler input changes
  const handleCustomerChange = (index, field, value) => {
    const updateCustomers = [...customers];
    updateCustomers[index] = {
      ...updateCustomers[index],
      [field]: value,
    };
    setCustomers(updateCustomers);
  };

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch package details
  useEffect(() => {
    if (!packageId) return;

    const fetchPackageDetails = async () => {
      try {
        const res = await fetch(`/api/package/${packageId}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        console.log("Fetched package data:", data); // Debug log

        setPackageDetails({
          PackageId: data.PackageId,
          PkgName: data.PkgName || "Summer Vacation Package",
          PkgBasePrice: data.PkgBasePrice ? parseInt(data.PkgBasePrice) : 1999,
          PkgStartDate: data.PkgStartDate,
          PkgEndDate: data.PkgEndDate,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load package details.");
      }
    };

    fetchPackageDetails();
  }, [packageId, price, pkgName]);

  function calculateDuration(startDate, endDate) {
    if (!startDate || !endDate) {
      console.warn("Missing start or end date:", { startDate, endDate });
      return "N/A";
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log("Parsed Start:", start);
    console.log("Parsed End:", end);

    // 计算天数差 +1（包含首尾两天）
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    console.log("diff daya", diffDays);

    return `${diffDays} ${diffDays === 1 ? "day" : "days"}`;
  }

  useEffect(() => {
    if (packageDetails?.PkgBasePrice > 0) {
      setFormData((prev) => ({
        ...prev,
        PackageId: packageId || "",
        BasePrice: packageDetails.PkgBasePrice,
      }));
    }

    if (packageDetails?.PkgStartDate && packageDetails?.PkgEndDate) {
      const duration = calculateDuration(
        packageDetails.PkgStartDate,
        packageDetails.PkgEndDate
      );
      console.log("Package duration:", duration);
    }
  }, [packageDetails, packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update primary traveler's email if customer email changes
    if (name === "CustEmail") {
      const updateCustomers = [...customers];
      updateCustomers[0] = { ...updateCustomers[0], email: value };
      setCustomers(updateCustomers);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form data
      if (
        !formData.CustFirstName ||
        !formData.CustLastName ||
        !formData.CustEmail
      ) {
        throw new Error("Please fill in all required customer fields");
      }

      if (!formData.TripStart || !formData.TripEnd) {
        throw new Error("Please select travel dates");
      }

      // Validate travelers
      const invalidCustomer = customers.find((customer, index) =>
        index === 0
          ? false // Skip validation for primary traveler (customer)
          : !customer.name || !customer.email
      );

      if (invalidCustomer) {
        throw new Error("Please fill in all traveler names and emails");
      }

      // Calculate total price (first traveler is customer, each additional traveler adds one more package)
      const totalPrice = packageDetails.PkgBasePrice * customers.length;

      // Simulate API call
      const bookingData = {
        customer: formData,
        customers: customers,
        packageId: packageDetails.PackageId,
        totalPrice: totalPrice,
        numberOfCustomers: customers.length,
      };

      console.log("Booking Data:", bookingData);

      // Simulate successful booking
      setTimeout(() => {
        setSuccess(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <h2 className="text-xl font-bold mb-2">Booking Successful!</h2>
          <p>
            Your booking has been confirmed. We will contact you shortly with
            more details.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Return to Home
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold mb-6">
            Booking: {packageDetails.PkgName}
          </h1>

          {/* Package Details Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Package Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package Name
                </label>
                <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                  {packageDetails.PkgName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Price per Person</p>
                <p className="font-medium text-green-600">
                  ${packageDetails.PkgBasePrice.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                  {packageDetails.PkgStartDate || "Not specified"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                  {packageDetails.PkgEndDate || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Travelers Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Additional Travelers</h2>
            <p className="text-gray-600 mb-4">
              Add additional travelers sharing this booking. Each traveler will
              be charged the full package price.
            </p>

            {customers.map((customer, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">
                    {index === 0 ? "Primary Customer" : `Customer ${index}`}
                  </h4>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeCustomer(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name {index === 0 ? "" : "*"}
                    </label>
                    <input
                      type="text"
                      value={customer.CustFirstName}
                      onChange={(e) =>
                        handleCustomerChange(
                          index,
                          "CustFirstName",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={index > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name {index === 0 ? "" : "*"}
                    </label>
                    <input
                      type="text"
                      value={customer.CustLastName}
                      onChange={(e) =>
                        handleCustomerChange(
                          index,
                          "CustLastName",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={index > 0}
                    />
                  </div>
                  {/*  */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email {index === 0 ? "" : "*"}
                    </label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) =>
                        handleCustomerChange(index, "email", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={index > 0}
                    />
                  </div>
                  {/*  */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone {index === 0 ? "" : "*"}
                    </label>
                    <input
                      type="text"
                      value={customer.phone}
                      onChange={(e) =>
                        handleCustomerChange(index, "phone", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={index > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Adress {index === 0 ? "" : "*"}
                    </label>
                    <input
                      type="text"
                      value={customer.CustAddress}
                      onChange={(e) =>
                        handleCustomerChange(
                          index,
                          "CustAdress",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={index > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City {index === 0 ? "" : "*"}
                    </label>
                    <input
                      type="text"
                      value={customer.CustCity}
                      onChange={(e) =>
                        handleCustomerChange(index, "CustCity", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={index > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Province {index === 0 ? "" : "*"}
                    </label>
                    <input
                      type="text"
                      value={customer.CustProv}
                      onChange={(e) =>
                        handleCustomerChange(index, "CustProv", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={index > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code {index === 0 ? "" : "*"}
                    </label>
                    <input
                      type="text"
                      value={customer.CustPostal}
                      onChange={(e) =>
                        handleCustomerChange(
                          index,
                          "CustPostal",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={index > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country {index === 0 ? "" : "*"}
                    </label>
                    <input
                      type="text"
                      value={customer.CustCountry}
                      onChange={(e) =>
                        handleCustomerChange(
                          index,
                          "CustCountry",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={index > 0}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCustomer}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              Add Another Traveler
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Total Price */}
          <div className="bg-gray-50 p-6 rounded-lg text-right">
            <h2 className="text-xl font-semibold">
              Total Price: $
              {(
                packageDetails.PkgBasePrice * customers.length
              ).toLocaleString()}
            </h2>
            <p className="text-gray-600">
              {customers.length} traveler(s) at $
              {packageDetails.PkgBasePrice.toLocaleString()} each
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between">
            <Link
              href={`/vacation-package`}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
            >
              Back to Package
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-8 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
