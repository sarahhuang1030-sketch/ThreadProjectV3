import { getAllpackageDetails, getExpiredPackages } from "@/app/lib/package";
import PackageList from "../components/PackageList";
import { HeadingPic } from "../components/Heading";
import { Abril_Fatface } from "next/font/google";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export default async function HomePage() {
  const [activePackages, expiredPackages] = await Promise.all([
    getAllpackageDetails(),
    getExpiredPackages(),
  ]);

  return (
    <>
      <HeadingPic bgClass="bgimg1" heading="Vacation Package" />

      <div className="container py-4">
        <div className="bg-white p-4">
          <h4 className="mb-3 title">Hot Deal On NOW!</h4>
          <PackageList packages={activePackages} />
        </div>
      </div>

      <div className="container py-4">
        <div className="bg-white p-4">
          <h4 className="mb-3 title">Explore our past packages</h4>
          <PackageList packages={expiredPackages} />
        </div>
      </div>
    </>
  );
}
