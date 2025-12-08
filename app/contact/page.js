import AgencyList from "../components/AgencyList";
import { getAgency, getAgentsbyId1, getAgentsbyId2 } from "../lib/agencies";
import { Abril_Fatface } from "next/font/google";
import AgentsList from "../components/AgentsList";
import { HeadingPic } from "../components/Heading";
import ContactForm from "./ContactForm";
// import ContactMap from "./ContactMap";

import dynamic from "next/dynamic";

const ContactMap = dynamic(
  () => import("./ContactMap"),
  { ssr: false }
);

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

// export function Iframe() {
//   return (
//     <div className="iframe-container" style={{ marginTop: "1rem" }}>
//       <iframe
//         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.372421737778!2d-114.08863112377513!3d51.06467487171598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f0056f4cc83%3A0xf8a35d39cfc7c508!2sSAIT%20Polytechnic%20-%20Parking%20P9!5e0!3m2!1sen!2sca!4v1757892122114!5m2!1sen!2sca"
//         width="100%"
//         height="400"
//         allowFullScreen
//         loading="lazy"
//         style={{
//           border: "2px solid #ccc",
//           borderRadius: "8px",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//         }}
//         title="SAIT Parking P9 Map"
//       />
//     </div>
//   );
// }

export default async function HomePage() {
  const agencies = await getAgency();
  const agents1 = await getAgentsbyId1();
  const agents2 = await getAgentsbyId2();
  return (
    <>
      <HeadingPic bgClass="bgimg3" heading="Contact Us" />
      <ContactForm />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white ">
          <h2
            className={` ${abrilFatface.className} text-2xl font-semibold mb-6 text-secondary`}
          >
            Branches
          </h2>
          {/* <AgencyList agencies={agencies} /> */}
          {/* <div className="container"> */}
          <ContactMap />
          {/* </div> */}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white ">
          <h2
            className={` ${abrilFatface.className} text-2xl font-semibold mb-6 text-secondary`}
          >
            Calgary Agents{" "}
          </h2>
          <AgentsList agents={agents1} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white ">
          <h2
            className={` ${abrilFatface.className} text-2xl font-semibold mb-6 text-secondary`}
          >
            Okotoks Agents
          </h2>
          <AgentsList agents={agents2} />
        </div>
      </div>
      {/* <div className="container">
        <Iframe />
      </div> */}
    </>
  );
}
