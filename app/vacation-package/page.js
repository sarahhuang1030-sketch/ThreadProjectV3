import { getAllpackageDetails, getExpiredPackages } from "@/app/lib/package";
import PackageList from "../components/PackageList";
import { HeadingPic } from "../components/Heading";
import { Abril_Fatface } from "next/font/google";
//import { useLanguage } from "../context/languagecontext";

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
          <h4 className="mb-3 title"> </h4>
          
          <PackageList packages={activePackages} titleKey="hot_deal_on_now"/>
        </div>
      </div>

      <div className="container py-4">
        <div className="bg-white p-4">
          <h4 className="mb-3 title"></h4>
          <PackageList packages={expiredPackages} titleKey="explore_our_past_packages" />
        </div>
      </div>
    </>
  );
}
