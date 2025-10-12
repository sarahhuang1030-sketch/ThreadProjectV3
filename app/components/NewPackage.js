"use client";

import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function PackageList() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 模拟从数据库获取数据
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // 这里应该是实际的API调用，例如：
        //   const response = await fetch("/api/packages");
        //   const data = await response.json();
        //   setPackages(data);

        // 模拟API响应的静态数据（实际使用时删除这部分）
        const mockData = [
          {
            PackageId: 1,
            PkgName: "Summer Beach Getaway",
            PkgDesc: "Enjoy a relaxing week at a tropical beach resort",
            PkgStartDate: "2023-12-01",
            PkgEndDate: "2023-12-10",
            PkgBasePrice: 1299,
            picture: "/pkg/1.webp",
          },
          {
            PackageId: 2,
            PkgName: "Mountain Adventure",
            PkgDesc: "Explore the scenic mountains with guided hikes",
            PkgStartDate: "2024-01-15",
            PkgEndDate: "2024-01-20",
            PkgBasePrice: 899,
            picture: "/pkg/2.avif",
          },
          {
            PackageId: 3,
            PkgName: "City Tour",
            PkgDesc: "Discover the highlights of a vibrant metropolis",
            PkgStartDate: "2023-11-01", // 已过期的开始日期
            PkgEndDate: "2023-11-05", // 已过期的结束日期
            PkgBasePrice: 599,
            picture: "/pkg/3.avif",
          },
          {
            PackageId: 4,
            PkgName: "Cultural Expedition",
            PkgDesc: "Immerse yourself in local traditions and history",
            PkgStartDate: "2024-02-10",
            PkgEndDate: "2024-02-20",
            PkgBasePrice: 1499,
            picture: "/pkg/4.avif",
          },
        ];

        // 过滤掉已过期的套餐（结束日期早于当前日期）
        const currentDate = new Date();
        const validPackages = mockData.filter(
          (pkg) => new Date(pkg.PkgEndDate) >= currentDate
        );

        setPackages(validPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading packages...</p>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="alert alert-info text-center">
        No packages currently available. Please check back later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => {
        const currentDate = new Date();
        const isStarted = new Date(pkg.PkgStartDate) < currentDate;
        const isExpired = new Date(pkg.PkgEndDate) < currentDate;

        return (
          <div
            key={pkg.PackageId}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="row row-cols-1 g-3">
              <div className="col">
                <Image
                  src={pkg.picture || "/placeholder.jpg"}
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
                      <span
                        className={isStarted ? "text-red-500 font-bold" : ""}
                      >
                        {new Date(pkg.PkgStartDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">End Date:</span>{" "}
                      {new Date(pkg.PkgEndDate).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-bold text-green-600 mt-2">
                      ¥{pkg.PkgBasePrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                {!isExpired ? (
                  <Link
                    href={`/booking/${pkg.PackageId}`}
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
