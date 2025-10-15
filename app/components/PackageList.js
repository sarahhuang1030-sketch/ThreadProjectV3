"use client";

import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { HeadingPic } from "./Heading";
import Link from "next/link";

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
  const router = useRouter();

  // Initialize AOS and Bootstrap when component mounts
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
    });

    // Initialize Bootstrap JS
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 align-items-stretch">
      {(packages || []).map((pkg, index) => {
        const isExpired = new Date(pkg.PkgStartDate) <= new Date();
        const imageSrc = isExpired
          ? Expiredimages[index % Expiredimages.length]?.picture
          : images[index % images.length]?.picture;

        return (
          <div key={pkg.PackageId} className="col">
            <div
              className="card h-100 shadow-sm d-flex flex-column"
              style={{ width: "325px" }}
              data-aos="fade-up"
              data-aos-delay={(index % 6) * 100}
            >
              <Image
                src={imageSrc || "/placeholder.jpg"}
                className="card-img-top"
                alt={pkg.PkgName || "Package image"}
                style={{ height: "330px", objectFit: "cover" }}
                width={325}
                height={330}
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />

              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{pkg.PkgName}</h5>
                  <p className="card-text text-muted">{pkg.PkgDesc}</p>
                </div>

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

              <div className="card-footer bg-transparent border-top-0 mt-auto">
                <div className="d-flex justify-content-between align-items-center">
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
          </div>
        );
      })}
    </div>
  );
}
