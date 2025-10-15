"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//import { HeadingPic } from "../components/Heading";
//import { POST } from "../../lib/agencies";
import { UserBookingAction } from "../../lib/action";

export default function OrderPage({ params }) {
  // <HeadingPic bgClass="bgimg1" heading="Vacation Package" />;
  const router = useRouter();
  const [packageData, setPackageData] = useState(null);
  const [formData, setFormData] = useState({
    CustFirstName: "",
    CustLastName: "",
    CustEmail: "",
    CustHomePhone: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("selectedPackage");
    if (stored) setPackageData(JSON.parse(stored));
  }, []);

  // const handleChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("/api/order", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       ...formData,
  //       PackageId: packageData.PackageId,
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   const result = await res.json();
  //   if (result.success) {
  //     alert("Order submitted!");
  //     router.push("/thank-you");
  //   } else {
  //     alert("Something went wrong.");
  //   }
  // };

  if (!packageData) return <p>Loading package...</p>;

  return (
    <div className="container mt-4">
      <h2>Order: {packageData.PkgName}</h2>
      <p>{packageData.PkgDesc}</p>
      <p>${packageData.PkgBasePrice}</p>

      {/* <form onSubmit={handleSubmit} className="mt-4"> */}
      <form action={UserBookingAction} className="mt-4">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            name="CustFirstName"
            className="form-control"
            //  value={formData.CustFirstName}
            // onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            name="CustLastName"
            className="form-control"
            //  value={formData.CustLastName}
            // onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            name="CustHomePhone"
            type="text"
            className="form-control"
            //  value={formData.CustHomePhone}
            //   onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="CustEmail"
            type="email"
            className="form-control"
            //   value={formData.CustEmail}
            //   onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Order
        </button>
      </form>
    </div>
  );
}
