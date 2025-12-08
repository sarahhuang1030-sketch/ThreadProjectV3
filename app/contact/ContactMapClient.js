"use client";

import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("./ContactMap"), {
  ssr: false,
});

export default function ContactMapClient() {
  return <ContactMap />;
}