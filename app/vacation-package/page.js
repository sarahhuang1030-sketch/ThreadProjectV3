//import { getAllEmployees } from "../lib/employees";
//import StatsCard from "../components/StatsCard";
//import EmployeeList from "../components/EmployeeList";
//import AgencyList from "../components/AgencyList";
import { getActivePackage, getNonActivePackage } from "../lib/agencies";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Abril_Fatface } from "next/font/google";
import PackageList from "../components/PackageList";
import BookingDetailList from "../components/bookingList";
import Link from "next/link";
//import { UserCommentAction } from "../lib/action";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export function HeadingPic() {
  return (
    <div className="container-home bgimg1">
      <div className="row justify-content-center align-items-center content-mid">
        <div className="col-md-10 text-center">
          <h1
            className={`heading mb-4 aos-init aos-animate ${abrilFatface.className}`}
            data-aos="fade-up"
          >
            Vacation Package
          </h1>
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const packages = await getActivePackage();
  const nopackages = await getNonActivePackage();

  return (
    <>
      <HeadingPic />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white heading">
          <h4>Hot Deal On NOW!</h4>
          <PackageList packages={packages} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white heading">
          <h4>Explore our past packages</h4>
          <PackageList packages={nopackages} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white heading">
          <h4>See More Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full sm:w-auto">
            <Link
              href={{ pathname: `/booking` }}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded no-underline text-center"
            >
              View Past Booking Details
            </Link>
            <Link
              href={{ pathname: `/bookings` }}
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
