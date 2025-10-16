"use client";
//import Link from "next/link";
import { Abril_Fatface } from "next/font/google";
import { useState } from "react";
//import "../sarahstyle.css";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { HeadingPic } from "../components/Heading";
const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export default function RootLayout() {
  return (
    <>
      <HeadingPic bgClass="bgimg4" heading="About Us" />
      {/* begin introduction of each person */}
      {/* First Person */}
      <div className="big-container">
        <div>
          <div className="person-info">
            <div
              className="d-md-flex"
              style={{ position: "relative", left: "20%" }}
            >
              <div className="image">
                <Image src="/sarah.jpg" width={260} height={300} alt="..." />
              </div>
              <div className="text">
                <h2>Sarah Huang</h2>

                <p>
                  Hello Everyone, I was majoring in IAT (Interactive Arts and
                  Technology) from SFU. Moved to Calgary about 13 years ago. I
                  am currently working as a early child education, however, I
                  believe its time for me to change my carrer for my next chaper
                  in life. Outside of work, I like to go singing, cooking or
                  just relaxing and do nothing (Just eating junk and laying on
                  bed).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* second person */}
        <div>
          <div className="person-info">
            <div
              className="d-md-flex"
              style={{ position: "relative", left: "20%" }}
            >
              <div className="image">
                <Image
                  src="/17ec0dae960660d392b671eb7af70cb8.jpg"
                  width={260}
                  height={300}
                  alt="..."
                />
              </div>
              <div className="text">
                <h2>LI SHIYUN</h2>

                <p>
                  <p>
                    Hello! I completed my undergraduate studies in Accounting
                    and am currently enrolled in the Software Development
                    program at SAIT. Right now, I&apos;m in a{" "}
                    <strong>
                      &quot;full-time student and free exploration&quot;
                    </strong>{" "}
                    mode. Although I don&apos;t have a formal job at the moment,
                    I&apos;m actively seeking internship opportunities through
                    SAIT&apos;s Co-op program. I hope to combine business
                    thinking from the accounting field with programming skills
                    in the future to develop tools that enhance financial work
                    efficiency. Outside of my studies, my hobbies include
                    playing video games, singing, and reading novels.
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* thrid person */}
        <div>
          <div className="person-info">
            <div
              className="d-md-flex"
              style={{ position: "relative", left: "20%" }}
            >
              <div className="image">
                <Image src="/Nikitha.jpeg" width={260} height={200} alt="..." />
              </div>
              <div className="text">
                <h2>Nikitha Kommidi</h2>

                <p>
                  I completed my undergraduate studies in Accounting and Finance
                  at Osmania University and subsequently pursued a Project
                  Management Program at the Southern Alberta Institute of
                  Technology (SAIT). I relocated to Calgary approximately one
                  year ago. I am presently employed as a part-time crew member
                  at a restaurant. However, my passion for technology and
                  software has inspired a shift in my career path and set the
                  stage for the next chapter of my professional journey.
                </p>
                <p>
                  Outside of work, I enjoy listening to music while having a cup
                  of tea in my garden, appreciating nature, and aspire to lead a
                  simple life surrounded by loved ones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  //<h1>vacation</h1>;
}
