"use client";

import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css"; // Ensure AOS styles are loaded
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
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4  align-items-start">
      {(packages || []).map((pkg, index) => {
        const isExpired = new Date(pkg.PkgStartDate) <= new Date();
        const imageSrc = isExpired
          ? Expiredimages[index]?.picture
          : images[index]?.picture;

        return (
          <div key={pkg.PackageId} className="col">
            <div
              className="card h-100 shadow-sm"
              style={{ width: "325px", height: "530px" }}
            >
              <Image
                src={imageSrc || "/placeholder.jpg"}
                className="card-img-top"
                alt={pkg.PkgName || "Package image"}
                style={{ height: "330px", objectFit: "cover" }}
                width={325}
                height={330}
              />

              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{pkg.PkgName}</h5>
                  <p className="card-text">{pkg.PkgDesc}</p>
                </div>

                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      {!isExpired ? (
                        <button
                          onClick={() => {
                            localStorage.setItem(
                              "selectedPackage",
                              JSON.stringify(pkg)
                            );
                            router.push(`/booking/${pkg.PackageId}`);
                          }}
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                        >
                          Book
                        </button>
                      ) : (
                        <span className="badge bg-secondary">Expired</span>
                      )}
                    </div>

                    <div className="text-end">
                      <small className="text-muted d-block">
                        Start: {pkg.PkgStartDate}
                      </small>
                      <small className="text-muted d-block">
                        End: {pkg.PkgEndDate}
                      </small>
                      {isExpired && (
                        <small className="text-danger d-block mt-1">
                          (Departure date has passed)
                        </small>
                      )}
                    </div>
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
