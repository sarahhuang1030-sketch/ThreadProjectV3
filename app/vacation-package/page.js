export const dynamic = "force-dynamic";

import PackageList from "../components/PackageList";
import { HeadingPic } from "../components/Heading";
import {
  getAllpackageDetails,
  getExpiredPackages,
} from "@/app/lib/package";

export default async function VacationPackagePage() {
  const [activePackages, expiredPackages] = await Promise.all([
    getAllpackageDetails(),
    getExpiredPackages(),
  ]);

  return (
    <>
      <HeadingPic bgClass="bgimg1" heading="Vacation Package" />

      <div className="container py-4">
        <div className="bg-white p-4">
          <PackageList
            packages={activePackages}
            titleKey="hot_deal_on_now"
          />
        </div>
      </div>

      <div className="container py-4">
        <div className="bg-white p-4">
          <PackageList
            packages={expiredPackages}
            titleKey="explore_our_past_packages"
          />
        </div>
      </div>
    </>
  );
}
