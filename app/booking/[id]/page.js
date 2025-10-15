"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        throw new Error("Please fill in your name and email");
      }

      // 在实际应用中，这里应该调用API提交数据
      console.log("Submit booking data:", formData);
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

      setSuccess(true);

      // 预订成功后跳转到感谢页面
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
        err instanceof Error
          ? err.message
          : "An error occurred during the booking process"
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
    </div>
  );
}
