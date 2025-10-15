"use client";
//import Link from "next/link";
//import customerlist from "./components/customerlist";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Abril_Fatface } from "next/font/google";
import { useState } from "react";
import { HeadingPic } from "../components/Heading";

import { UserCustomerAction } from "../lib/action";

//import { getCustomer } from "../lib/customer";
//import { getCustomerById } from "../lib/customer";
//import { createCustomer } from "../lib/customer";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export default function RootLayout() {
  return (
    <>
      <HeadingPic bgClass="bgimg2" heading="Contact Us" />
      <section className="section">
        <div className="containercust">
          <div className="row">
            <div className="col-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  UserCommentAction();
                }}
                className={`bg-neutral-100 p-6 rounded-md shadow-sm mb-6 ${abrilFatface.className}`}
              >
                {/*form field*/}
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="CustID">CustID</label>
                    <input
                      type="number"
                      id="CustID"
                      name="CustID"
                      className="form-control "
                    ></input>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="CustFirstname">Custfirstname</label>
                    <input
                      type="text"
                      id="CustFirstname"
                      name="Custfirstname"
                      className="form-control "
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="Custlastname">CustLastname</label>
                    <input
                      type="text"
                      //    id="CustID"
                      name="Custlastname"
                      className="form-control "
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="CustAddress">CustAddress</label>
                    <input
                      type="text"
                      // id="CustID"
                      name="CustAddress"
                      className="form-control "
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="Custcity">CustCity</label>
                    <input
                      type="text"
                      id="Custcity"
                      name="CustCity"
                      className="form-control "
                    ></input>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="CustCountry">Custcountry </label>
                    <input
                      type="text"
                      id="Country"
                      name="CustCountry"
                      className="form-control "
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="CustProv">CustProv</label>
                    <input
                      type="text"
                      // id="CustID"
                      name="CustProv"
                      className="form-control "
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="CustPostal" className="form-label">
                      Postal Code *
                    </label>

                    <input
                      type=""
                      id="postal"
                      name="CustPostal"
                      className="form-control"
                      placeholder=""
                      pattern="[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d"
                      title="Format: A1A 1A1 "
                    ></input>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="Custcountry">CustCountry</label>
                    <input
                      type="text"
                      id="Country"
                      name="CustCountry"
                      className="form-control "
                    ></input>
                  </div> */}
                {/* </div> */}
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="CustID">CustHomePhone</label>
                    <input
                      type="number"
                      id="phone"
                      name="CustHomePhone"
                      className="form-control "
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="CustBusPhone">Business Phone *</label>
                    <input
                      type="tel"
                      id="CustBusPhone"
                      name="CustBusPhone"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="Custemail">CustEmail</label>
                    <input
                      type="emailid"
                      id="email"
                      name="Custemail"
                      className="form-control "
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="AgentID">AgentID</label>
                    <input
                      type="number"
                      id="agentID"
                      name="AgentID"
                      className="form-control "
                    ></input>
                  </div>
                </div>

                {/*vacation selection*/}
                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="vacationType">Vacation</label>
                    <select
                      id="vacationType"
                      name="vacationType"
                      className="form-control "
                    >
                      <option value="beach">Beach</option>
                      <option value="adventure">Adventure</option>
                      <option value="cultural">Cultural</option>
                      <option value="cruise">Cruise</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                </div>

                {/*travel companions selection*/}

                <div className="row">
                  <div className="col-md-12 form-group2">
                    <label htmlFor="travelCompanions">Travel Companions</label>
                    <select
                      id="travelCompanions"
                      name="travelCompanions"
                      className="form-control "
                    >
                      <option value="solo">Solo</option>
                      <option value="couple">Couple</option>
                      <option value="family">Family</option>
                      <option value="friends">Friends</option>
                    </select>
                  </div>
                </div>

                {/*travel date selection*/}

                <div className="conatiner1">
                  <div className="row">
                    <div className="col-md-6 form-group2">
                      <label htmlFor="travelMonth">Travel Month</label>
                      <select
                        id="travelMonth"
                        name="travelMonth"
                        className="form-control"
                      >
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                      </select>
                    </div>
                    <div className="col-md-6 form-group2">
                      <label htmlFor="travelDate">Date</label>
                      <select
                        id="travelDate"
                        name="travelDate"
                        className="form-control"
                      >
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 form-group2">
                      <label htmlFor="travelYear">Year</label>
                      <select
                        id="travelYear"
                        name="travelYear"
                        className="form-control"
                      >
                        {Array.from({ length: 5 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                {/*submit button*/}

                <div className="text-end mt-4">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
