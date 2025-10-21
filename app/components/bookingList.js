"use client";

import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

// 假设的图片数组（可以根据实际需求调整）
let images = [{ picture: "USA.avif" }];

export default function BookingDetailList({ bookingDetails }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(bookingDetails || []).map((detail, index) => {
        const isExpired = new Date(detail.TripEnd) <= new Date();
        const imageSrc = images[index % images.length]?.picture;

        return (
          <div
            key={detail.BookingDetailId}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="row row-cols-1 g-3">
              <div className="col">
                <Image
                  src={imageSrc || "/placeholder.jpg"}
                  width={325}
                  height={330}
                  alt={detail.Destination || "Destination image"}
                  unoptimized
                />

                <div className="card-body">
                  <p className="tagline">Itinerary #{detail.ItineraryNo}</p>
                  <h4>{detail.Destination}</h4>
                  <p className="text-sm text-gray-600">{detail.Description}</p>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Trip Start:</span>{" "}
                      {new Date(detail.TripStart).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Trip End:</span>{" "}
                      {new Date(detail.TripEnd).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Region:</span>{" "}
                      {detail.RegionId}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Class:</span>{" "}
                      {detail.ClassId}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-bold text-green-600">
                        ¥{detail.BasePrice.toLocaleString()}
                      </p>
                      {detail.AgencyCommission > 0 && (
                        <p className="text-sm text-blue-600">
                          Commission: ¥
                          {detail.AgencyCommission.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                {!isExpired ? (
                  <Link
                    href={`/booking/detail/${detail.BookingDetailId}?detailId=${
                      detail.BookingDetailId
                    }&itineraryNo=${
                      detail.ItineraryNo
                    }&destination=${encodeURIComponent(
                      detail.Destination
                    )}&price=${detail.BasePrice}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    View Details
                  </Link>
                ) : (
                  <span className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                    Expired
                  </span>
                )}

                {isExpired && (
                  <span className="text-red-500 text-sm font-medium">
                    (Trip has ended)
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
