import { getAllpackageDetails, getExpiredPackages } from "@/app/lib/package";
import PackageList from "../components/PackageList";
import { HeadingPic } from "../components/Heading";
import Link from "next/link";

export default async function HomePage() {
  const [activePackages, expiredPackages] = await Promise.all([
    getAllpackageDetails(),
    getExpiredPackages(),
  ]);

  return (
    <>
      <HeadingPic bgClass="bgimg1" heading="Vacation Package" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white heading">
          <h4>Hot Deal On NOW!</h4>
          <PackageList packages={activePackages} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white heading">
          <h4>Explore our past packages</h4>
          <PackageList packages={expiredPackages} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white heading">
          <h4>See More Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full sm:w-auto">
            <Link
              href="/booking"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded no-underline text-center"
            >
              View Past Booking Details
            </Link>
            <Link
              href="/bookings"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded no-underline text-center"
            >
              View Bookings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
