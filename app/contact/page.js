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

export function Iframe() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.372421737778!2d-114.08863112377513!3d51.06467487171598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f0056f4cc83%3A0xf8a35d39cfc7c508!2sSAIT%20Polytechnic%20-%20Parking%20P9!5e0!3m2!1sen!2sca!4v1757892122114!5m2!1sen!2sca"
      width="100%"
      height="400"
      allowFullScreen
      // Don’t load this content right away — wait until it’s close to being visible on screen
      loading="lazy"
      style={{ border: "2px solid #ccc", position: "relative", top: "5px" }}
      title="SAIT Parking P9 Map"
    />
  );
}

export function HeadingPic() {
  return (
    <div className="container-home bgimg3">
      <div className="row justify-content-center align-items-center content-mid">
        <div className="col-md-10 text-center">
          <h1
            className={`heading mb-4 aos-init aos-animate ${abrilFatface.className}`}
            data-aos="fade-up"
          >
            Contact Us
          </h1>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout() {
  return (
    <>
      <HeadingPic />
      <section className="section ">
        <div className="container ">
          <div className="row">
            <div className="col-md-7 ">
              <form
                action="#"
                method="post"
                // className="bg-white p-md-5 p-4 mb-5"
                className={`bg-white p-md-5 p-4 mb-5 ${abrilFatface.className}`}
              >
                <div className="row">
                  <div className="col-md-6 form-group1">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control "
                    ></input>
                  </div>
                  <div className="col-md-6 form-group1">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      className="form-control "
                    ></input>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group1">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control "
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group1">
                    <label htmlFor="message">Write Message</label>
                    <textarea
                      name="message"
                      id="message"
                      className="form-control "
                      cols="30"
                      rows="8"
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-md-6 form-group1"
                    style={{ paddingTop: "20px" }}
                  >
                    <input
                      type="submit"
                      value="Send Message"
                      className="btn btn-primary"
                    ></input>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-5">
              <div className="row">
                <div
                  className="col-md-10 ml-auto contact-info"
                  style={{ marginTop: "40px" }}
                >
                  <p>
                    <span className="d-block">Address:</span>{" "}
                    <span>
                      {" "}
                      98 West 21th Street, Suite 721 New York NY 10016
                    </span>
                  </p>
                  <p>
                    <span className="d-block">Phone:</span>{" "}
                    <span> (+1) 435 3533</span>
                  </p>
                  <p>
                    <span className="d-block">Email:</span>{" "}
                    <span> info@yourdomain.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--end of content info-->*/}

      {/* putting the map in */}
      <div class="container">
        <Iframe />
      </div>
    </>
  );

  //<h1>vacation</h1>;
}
