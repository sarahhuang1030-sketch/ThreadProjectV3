//import { getAllEmployees } from "../lib/employees";
//import StatsCard from "../components/StatsCard";
//import EmployeeList from "../components/EmployeeList";
//import AgencyList from "../components/AgencyList";
import { getActivePackage, getNonActivePackage } from "../lib/agencies";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Abril_Fatface } from "next/font/google";

import PackageList from "../components/PackageList";
import { HeadingPic } from "../components/Heading";

//import { UserCommentAction } from "../lib/action";

// const abrilFatface = Abril_Fatface({
//   weight: ["400"],
//   subsets: ["latin"],
//   variable: "--font-abril-fatface", // Optional: for CSS variable usage
// });

export default async function HomePage() {
  const packages = await getActivePackage();
  const nopackages = await getNonActivePackage();

  return (
    <>
      <HeadingPic bgClass="bgimg1" heading="Vacation Package" />

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
    </>
  );
}
