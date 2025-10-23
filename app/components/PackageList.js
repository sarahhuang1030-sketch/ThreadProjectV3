"use client";

import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const getImages = () => [
  { picture: "/pkg/1.webp" },
  { picture: "/pkg/2.avif" },
  { picture: "/pkg/3.avif" },
  { picture: "/pkg/4.avif" },
  { picture: "/pkg/5.avif" },
];

const getExpiredImages = () => [
  { picture: "/pkg/6.webp" },
  { picture: "/pkg/7.avif" },
  { picture: "/pkg/8.webp" },
  { picture: "/pkg/9.webp" },
  { picture: "/pkg/10.avif" },
];

export default function PackageList({ packages = [] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    setIsClient(true);
  }, []);

  if (!Array.isArray(packages)) {
    console.error("Invalid packages data:", packages);
    return <div className="alert alert-warning">无效的套餐数据</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.length > 0 ? (
        packages.map((pkg, index) => {
          const startDate = pkg.PkgStartDate
            ? new Date(pkg.PkgStartDate)
            : null;
          const endDate = pkg.PkgEndDate ? new Date(pkg.PkgEndDate) : null;
          const isExpired =
            startDate && endDate ? startDate <= new Date() : false;

          const images = isExpired ? getExpiredImages() : getImages();
          const imageSrc = images[index % images.length]?.picture;

          return (
            <div
              key={pkg.PackageId}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="row row-cols-1 g-3">
                <div className="col">
                  <Image
                    src={imageSrc || "/placeholder.jpg"}
                    width={325}
                    height={330}
                    alt={pkg.PkgName || "Package image"}
                    unoptimized
                  />

                  <div className="card-body">
                    <p className="tagline">{pkg.PkgName}</p>
                    <h4>{pkg.PkgDesc}</h4>

                    <div className="mt-4">
                      {isClient && startDate && (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Start Date:</span>{" "}
                          {startDate.toLocaleDateString()}
                        </p>
                      )}
                      {isClient && endDate && (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">End Date:</span>{" "}
                          {endDate.toLocaleDateString()}
                        </p>
                      )}
                      {pkg.PkgBasePrice && (
                        <p className="text-lg font-bold text-green-600 mt-2">
                          ${pkg.PkgBasePrice.toLocaleString()}
                        </p>
                      )}
                      {pkg.PkgAgencyCommission && (
                        <p className="text-sm text-blue-600">
                          Commission: $
                          {pkg.PkgAgencyCommission.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  {!isExpired && pkg.PackageId ? (
                    <Link
                      href={`/booking/${pkg.PackageId}?packageId=${
                        pkg.PackageId
                      }&price=${pkg.PkgBasePrice}&name=${encodeURIComponent(
                        pkg.PkgName
                      )}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Booking NOW
                    </Link>
                  ) : (
                    <span className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                      Expired
                    </span>
                  )}

                  {isExpired && (
                    <span className="text-red-500 text-sm font-medium">
                      (Departure date has passed)
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-8 text-gray-500">
          暂无可用套餐
        </div>
      )}
    </div>
  );
}
