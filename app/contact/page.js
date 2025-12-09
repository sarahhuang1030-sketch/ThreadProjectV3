
import { Abril_Fatface } from "next/font/google";
import AgentsList from "../components/AgentsList";
import { HeadingPic } from "../components/Heading";
import ContactForm from "./ContactForm";
import ContactMapClient from "./ContactMapClient";

export const dynamic = "force-dynamic";


const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});


export default async function ContactPage() {

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
          <ContactMapClient />
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
    </>
  );
}
