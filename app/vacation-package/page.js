"use client";

import { useEffect, useState } from "react";
import PackageList from "../components/PackageList";
import { HeadingPic } from "../components/Heading";

export const dynamic = "force-dynamic";

export default function VacationPackagePage() {
  const [activePackages, setActivePackages] = useState([]);
  const [expiredPackages, setExpiredPackages] = useState([]);

  useEffect(() => {
    fetch("/api/packages")
      .then(res => res.json())
      .then(data => {
        setActivePackages(data.activePackages || []);
        setExpiredPackages(data.expiredPackages || []);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <HeadingPic bgClass="bgimg1" heading="Vacation Package" />

      <div className="container py-4">
        <div className="bg-white p-4">
          <PackageList
            packages={activePackages}
            titleKey="hot_deal_on_now"
          />
        </div>
      </div>

      <div className="container py-4">
        <div className="bg-white p-4">
          <PackageList
            packages={expiredPackages}
            titleKey="explore_our_past_packages"
          />
        </div>
      </div>
    </>
  );
}
