"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

<<<<<<< HEAD
// export default function BookingPage() {
//   const router = useRouter();
//   const [packageData, setPackageData] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("selectedPackage");
//     if (stored) setPackageData(JSON.parse(stored));
//   }, []);

//   if (!packageData) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Booking: {packageData.PkgName}</h2>
//       <p>{packageData.PkgDesc}</p>
//     </div>
//   );
// }

export default function BookingPage({ params }) {
  const router = useRouter();
  const packageId = params.packageId;
  const [packageData, setPackageData] = useState(null);
  //   const [packageDetails, setPackageDetails] = useState({
  //     PackageId: packageId,
  //     PkgName: "LOADING...",
  //     PkgBasePrice: 0,
  //   });

  //   const [formData, setFormData] = useState({
  //     CustomerId: Math.floor(Math.random() * 10000), // Simulate and generate customer ID
  //     CustFirstName: "",
  //     CustLastName: "",
  //     CustEmail: "",
  //     CustPhone: "",
  //     CustAddress: "",
  //     CustCity: "",
  //     CustProv: "",
  //     CustPostal: "",
  //     CustCountry: "",
  //     TripStart: "",
  //     TripEnd: "",
  //     Description: "",
  //     Destination: "",
  //     BasePrice: packageData.PkgBasePrice,
  //     PackageId: packageId,
  //   });

  //   useEffect(() => {
  //     const stored = localStorage.getItem("selectedPackage");
  //     if (stored) setPackageData(JSON.parse(stored));
  //   }, []);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedPackage");
    if (stored) {
      const parsed = JSON.parse(stored);
      setPackageData(parsed);

      setFormData({
        CustomerId: Math.floor(Math.random() * 10000),
        CustFirstName: "",
        CustLastName: "",
        CustEmail: "",
        CustHomePhone: "",
        // CustAddress: "",
        // CustCity: "",
        // CustProv: "",
        // CustPostal: "",
        // CustCountry: "",
        // TripStart: "",
        // TripEnd: "",
        // Description: "",
        // Destination: "",
        // BasePrice: parsed.PkgBasePrice,
        // PackageId: parsed.PackageId,
      });
    }
  }, []);
=======
export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const packageId = searchParams.get("packageId");
  const price = searchParams.get("price");
  const pkgName = searchParams.get("name");

  const [packageDetails, setPackageDetails] = useState({
    PackageId: packageId || "",
    PkgName: pkgName || "LOADING...",
    PkgBasePrice: price ? parseInt(price) : 0,
    PkgStartDate: "", // 添加缺失字段
    PkgEndDate: "", // 添加缺失字段
  });

  const [formData, setFormData] = useState({
    CustomerId: Math.floor(Math.random() * 10000),
    CustFirstName: "",
    CustLastName: "",
    CustEmail: "",
    CustPhone: "",
    CustAddress: "",
    CustCity: "",
    CustProv: "",
    CustPostal: "",
    CustCountry: "",
    TripStart: "",
    TripEnd: "",
    Description: "",
    Destination: "",
    BasePrice: price ? parseInt(price) : 0,
    PackageId: packageId || "",
  });
>>>>>>> d07ed34bb0ca627b495d1d800dd36238ba22a9e3

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!packageId) return;

    const fetchPackageDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPackageDetails({
          PackageId: packageId,
          PkgName: pkgName || "Summer Vacation Package",
          PkgBasePrice: price ? parseInt(price) : 1999,
          PkgStartDate: "2024-01-01", // 模拟数据
          PkgEndDate: "2024-01-07", // 模拟数据
        });
      } catch (err) {
        setError("Failed to load package details.");
      }
    };

    fetchPackageDetails();
  }, [packageId, price, pkgName]);

  // 计算行程天数
  // function calculateDuration(startDate, endDate) {
  //   if (!startDate || !endDate) return "N/A";
  //   const start = new Date(startDate.split(" ")[0]);
  //   const end = new Date(endDate.split(" ")[0]);
  //   const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  //   return `${diffDays} ${diffDays === 1 ? "day" : "days"}`;
  // }
  function calculateDuration(startDate, endDate) {
    console.log("start date", startDate);
    if (!startDate || !endDate) return "N/A";

    const startDateStr = startDate.split(" ")[0];
    const endDateStr = endDate.split(" ")[0];

    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    console.log(start, end);

    // 计算天数差 +1（包含首尾两天）
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    console.log("diff daya", diffDays);

    return `${diffDays} ${diffDays === 1 ? "day" : "days"}`;
  }

  // 更新表单数据
  useEffect(() => {
    if (packageDetails.PkgBasePrice > 0) {
      setFormData((prev) => ({
        ...prev,
        PackageId: packageId || "",
        BasePrice: packageDetails.PkgBasePrice,
      }));
    }
  }, [packageDetails.PkgBasePrice, packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (
        !formData.CustFirstName ||
        !formData.CustLastName ||
        !formData.CustEmail ||
        !formData.CustHomePhone
      ) {
        throw new Error("Please fill in your name and email.");
      }

      console.log("Submit booking data:", formData);
<<<<<<< HEAD
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Booking failed");
      }

      // 在实际应用中替换为真实的API调用
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) throw new Error('预订失败');

=======
      await new Promise((resolve) => setTimeout(resolve, 1000));
>>>>>>> d07ed34bb0ca627b495d1d800dd36238ba22a9e3
      setSuccess(true);

      setTimeout(() => {
        router.push(`/booking/thank-you?packageId=${packageId}`);
      }, 2000);
      //   const response = await fetch("/api/bookings", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formData),
      //   });

      //   const result = await response.json();
      //   if (!response.ok || !result.success) {
      //     throw new Error(result.error || "Booking failed");
      //   }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during booking."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!packageData || !formData) return <p>Loading...</p>;
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Booking successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your reservation, we are processing your request.
          </p>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div>
      <h2>Booking:{packageData.PkgName}</h2>
      <p>{packageData.PkgDesc}</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            name="CustFirstName"
            className="form-control"
            value={formData.CustFirstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            name="CustLastName"
            className="form-control"
            value={formData.CustLastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="CustEmail"
            type="email"
            className="form-control"
            value={formData.CustEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Home Phone</label>
          <input
            name="CustHomePhone"
            type="text"
            className="form-control"
            value={formData.CustHomePhone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Business Phone</label>
          <input
            name="CustBusPhone"
            type="text"
            className="form-control"
            value={formData.CustBusPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            name="CustAddress"
            className="form-control"
            value={formData.CustAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            name="CustCity"
            type="text"
            className="form-control"
            value={formData.CustCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Province</label>
          <input
            name="CustProv"
            type="text"
            className="form-control"
            value={formData.CustProv}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Postal Code</label>
          <input
            name="CustPostal"
            type="text"
            className="form-control"
            value={formData.CustPostal}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label"> Country</label>
          <input
            name="CustCountry"
            type="text"
            className="form-control"
            value={formData.CustCountry}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more fields as needed */}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Booking"}
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
=======
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Booking {packageDetails.PkgName}
          </h1>

          {/* 套餐信息 */}

          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Package information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">
                  {calculateDuration(
                    packageDetails.PkgStartDate,
                    packageDetails.PkgEndDate
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-medium text-green-600">
                  ¥{packageDetails.PkgBasePrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="CustFirstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="CustFirstName"
                  name="CustFirstName"
                  value={formData.CustFirstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="CustLastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="CustLastName"
                  name="CustLastName"
                  value={formData.CustLastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* 其他表单字段... */}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Submit booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
>>>>>>> d07ed34bb0ca627b495d1d800dd36238ba22a9e3
    </div>
  );
}
