"use client";
//import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Abril_Fatface } from "next/font/google";
import { useState } from "react";
import { HeadingPic } from "../components/Heading";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export default function RootLayout() {
  return <HeadingPic bgClass="bgimg2" heading="Register" />;

  //<h1>vacation</h1>;
}
