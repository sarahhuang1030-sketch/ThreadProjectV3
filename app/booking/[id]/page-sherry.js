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

export default function BookingPage() {
  const router = useRouter();
  const [packageDetails, setPackageDetails] = useState({
    PackageId: packageId,
    PkgName: "LOADING...",
    PkgBasePrice: 0,
  });

  const [formData, setFormData] = useState({
    CustomerId: Math.floor(Math.random() * 10000), // Simulate and generate customer ID
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
    BasePrice: packageDetails.PkgBasePrice,
    PackageId: packageId,
  });

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
        !formData.CustEmail
      ) {
        throw new Error("Please fill in your name and email");
      }

      // 在实际应用中，这里应该调用API提交数据
      console.log("Submit booking data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
      <h2>Booking: {packageData.PkgName}</h2>
      <p>{packageData.PkgDesc}</p>
    </div>
  );
}
