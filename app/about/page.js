"use client";
//import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Abril_Fatface } from "next/font/google";
import { useState } from "react";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export function HeadingPic() {
  return (
    <div className="container-home bgimg4">
      <div className="row justify-content-center align-items-center content-mid">
        <div className="col-md-10 text-center">
          <h1
            className={`heading mb-4 aos-init aos-animate ${abrilFatface.className}`}
            data-aos="fade-up"
          >
            About Us
          </h1>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout() {
  return <HeadingPic />;

  //<h1>vacation</h1>;
}
