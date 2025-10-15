"use client";

import Link from "next/link";

import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";

import { UserBooking } from "../lib/action";

let images = [
  { picture: "/pkg/1.webp" },

  { picture: "/pkg/2.avif" },

  { picture: "/pkg/3.avif" },

  { picture: "/pkg/4.avif" },

  { picture: "/pkg/5.avif" },
];

let Expiredimages = [
  { picture: "/pkg/6.webp" },

  { picture: "/pkg/7.avif" },

  { picture: "/pkg/8.webp" },

  { picture: "/pkg/9.webp" },

  { picture: "/pkg/10.avif" },
];

export default function PackageList({ packages }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(packages || []).map((pkg, index) => {
        const isExpired = new Date(pkg.PkgStartDate) <= new Date();

        const imageSrc = isExpired
          ? Expiredimages[index]?.picture
          : images[index]?.picture;

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
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Start Date:</span>{" "}
                      {new Date(pkg.PkgStartDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">End Date:</span>{" "}
                      {new Date(pkg.PkgEndDate).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-bold text-green-600 mt-2">
                      ¥{pkg.PkgBasePrice.toLocaleString()}
                    </p>

                    <p className="text-sm text-blue-600">
                      Commission: ¥{pkg.PkgAgencyCommission.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                {!isExpired ? (
                  <Link
                    href={{
                      pathname: `/booking/${pkg.PackageId}`,

                      query: {
                        packageId: pkg.PackageId,

                        price: pkg.PkgBasePrice,

                        name: pkg.PkgName,
                      },
                    }}
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
      })}
    </div>
  );
}
