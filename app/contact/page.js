import { Abril_Fatface } from "next/font/google";
import AgentsList from "../components/AgentsList";
import { HeadingPic } from "../components/Heading";
import ContactForm from "./ContactForm";
import ContactMapClient from "./ContactMapClient";
import { getAgentsbyId1, getAgentsbyId2 } from "../lib/agencies";

export const dynamic = "force-dynamic";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface",
});

export default async function ContactPage() {
  const agents1 = await getAgentsbyId1();
  const agents2 = await getAgentsbyId2();

  return (
    <>
      <HeadingPic bgClass="bgimg3" heading="Contact Us" />
      <ContactForm />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className={`${abrilFatface.className} text-2xl mb-6`}>
          Branches
        </h2>
        <ContactMapClient />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className={`${abrilFatface.className} text-2xl mb-6`}>
          Calgary Agents
        </h2>
        <AgentsList agents={agents1} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className={`${abrilFatface.className} text-2xl mb-6`}>
          Okotoks Agents
        </h2>
        <AgentsList agents={agents2} />
      </div>
    </>
  );
}
