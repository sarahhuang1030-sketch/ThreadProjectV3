"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const router = useRouter();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedPackage");
    if (stored) setPackageData(JSON.parse(stored));
  }, []);

  if (!packageData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Booking: {packageData.PkgName}</h2>
      <p>{packageData.PkgDesc}</p>
    </div>
  );
}
