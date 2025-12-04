"use client";
import AgencyList from "../components/AgencyList";
import { getAgency, getAgentsbyId1, getAgentsbyId2 } from "../lib/agencies";
import AgentsList from "../components/AgentsList";
import { HeadingPic } from "../components/Heading";
import { useEffect, useState } from "react";
import ContactForm from "./ContactForm"; // local to /contact
import Iframe from "./ContactMap";
import { Abril_Fatface } from "next/font/google";
//import agencies from "../lib/agencies";
//const { getAgency, getAgentsbyId1, getAgentsbyId2 } = agencies;

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export default function ContactPage() {
  const [agencies, setAgencies] = useState([]);
  const [agents1, setAgents1] = useState([]);
  const [agents2, setAgents2] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const agencyData = await getAgency();
        const agentData1 = await getAgentsbyId1();
        const agentData2 = await getAgentsbyId2();

        setAgencies(agencyData);
        setAgents1(agentData1);
        setAgents2(agentData2);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <HeadingPic bgClass="bgimg3" heading="Contact Us" />
      <ContactForm />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white">
          <h2
            className={`${abrilFatface.className} text-2xl font-semibold mb-6 text-secondary`}
          >
            Branches
          </h2>
          <AgencyList agencies={agencies} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white">
          <h2
            className={`${abrilFatface.className} text-2xl font-semibold mb-6 text-secondary`}
          >
            Calgary Agents
          </h2>
          <AgentsList agents={agents1} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white">
          <h2
            className={`${abrilFatface.className} text-2xl font-semibold mb-6 text-secondary`}
          >
            Okotoks Agents
          </h2>
          <AgentsList agents={agents2} />
        </div>
      </div>
      <div className="container">
        <Iframe />
      </div>
    </>
  );
}
