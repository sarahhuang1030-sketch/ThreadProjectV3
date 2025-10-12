"use client";

import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css"; // Ensure AOS styles are loaded
import { HeadingPic } from "./Heading";

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

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      {!isExpired && (
                        <button
                          onClick={() => {
                            localStorage.setItem(
                              "selectedPackage",
                              JSON.stringify(pkg)
                            );
                            router.push(`/booking/${pkg.PackageId}`);
                          }}
                          className="btn btn-sm btn-outline-secondary px-4 py-2 hover:bg-grey-600"
                          type="button"
                        >
                          Book
                        </button>
                      )}
                    </div>

                    <small className="text-body-secondary ml-3">
                      Start: {pkg.PkgStartDate} |
                    </small>
                    <small className="text-body-secondary">
                      End: {pkg.PkgEndDate}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
