"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Abril_Fatface } from "next/font/google";
import { HeadingPic } from "@/app/components/Heading";
const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export default function BookingPage() {
  const router = useRouter();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedPackage");
    if (stored) setPackageData(JSON.parse(stored));
  }, []);

  if (!packageData) return <p>Loading...</p>;

  return (
    <>
      <HeadingPic bgClass="bgimg1" heading="Vacation Package" />
      <div>
        <h2>Booking: {packageData.PkgName}</h2>
        <p>{packageData.PkgDesc}</p>
      </div>
    </>
  );
}
