"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
// import "./sarahstyle.css";
// import "./nikitha.css";
//import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

import { Abril_Fatface } from "next/font/google";
import { HeadingPic } from "./components/Heading";
import { useLanguage, LanguageProvider } from "./context/languagecontext";




const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export function TabSection({
  //inputType, setInputType:controls the travel date input
  inputType,
  setInputType,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
}) 
  {
  const {t} = useLanguage();
  //  setActiveTab tracks which tab is active, and this one sets ticket as default
  const [activeTab, setActiveTab] = useState("tickets");
  //- showTravelerPopup: toggles the traveler selection popup, and default to not popup
  const [showTravelerPopup, setShowTravelerPopup] = useState(false);
  //travelerSummary: displays a readable summary, and default set to not display
  const [travelerSummary, setTravelerSummary] = useState("");

  //this shows the counts for adult and chil
  const applyTravelerSelection = () => {
    const summary = `${adultCount} Adult${adultCount > 1 ? "s" : ""}${
      childCount > 0
        ? `, ${childCount} Child${childCount > 1 ? "ren" : ""}`
        : ""
    }`;
    //updated the preference with counts for adult and child
    setTravelerSummary(summary);
    setShowTravelerPopup(false);
    // console.log("Travelers:", { adults: adultCount, children: childCount });
  };

  return (
    <div className="wrapper">
      <div className="tab-container">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "tickets" ? "active" : ""}`}
            onClick={() => setActiveTab("tickets")}
          >
           {t(`homepage.tickets`)}
          </button>
          <button
            className={`tab ${activeTab === "todo" ? "active" : ""}`}
            onClick={() => setActiveTab("todo")} >
            {t(`homepage.things_to_do`)}
          </button>
        </div>
        {/* Tab Content */}
        {activeTab === "tickets" && (
          <div id="tickets" className="tab-content active">
            <form
              id="ticketFormTickets"
              className="listsofinput"
              onSubmit={(e) => {
                e.preventDefault();
                //   console.log("Form submitted");
              }}
            >
              <div>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder={t(`homepage.where_to?`)}
                  className="image-label1"
                />
              </div>
              <div>
                <input
                  type={inputType}
                  id="travelDate"
                  placeholder={t(`homepage.date`)}
                  onFocus={() => setInputType("date")}
                  onBlur={(e) => {
                    if (e.target.value === "") setInputType("text");
                  }}
                  className="image-label2"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="travelerInput"
                  readOnly
                  value={travelerSummary}
                  placeholder={t(`homepage.traveler`)}
                  className="image-label3"
                  onClick={() => setShowTravelerPopup(true)}
                />
              </div>
              <div>
                <button type="submit" className="btn-ticket">
                   {t(`homepage.search`)}
                </button>
              </div>
            </form>
          </div>
        )}
        {activeTab === "todo" && (
          <div id="todo" className="tab-content">
          {t(`stay_tuned_for_upcoming_feature`)}  
          </div>
        )}
        {/* Traveler Popup styling */}
        {/* When travelerInput is clicked, the popup appears:
         */}
        {showTravelerPopup && (
          <div id="travelerPopup" className="popup-panel">
            <h2>{t(`select_traveler`)}</h2>
            <label htmlFor="adultCount">{t(`homepage.adult`)}:</label>
            <br />
            <input
              type="number"
              id="adultCount"
              min="1"
              value={adultCount}
              onChange={(e) => setAdultCount(Number(e.target.value))}
            />
            <br />
            <br />
            <label htmlFor="childCount">{t(`homepage.children`)}:</label>
            <br />
            <input
              type="number"
              id="childCount"
              min="0"
              value={childCount}
              onChange={(e) => setChildCount(Number(e.target.value))}
            />
            <br />
            <br />
            <button
              type="button"
              onClick={() => {
                //after submit, update the selection
                applyTravelerSelection();
                setShowTravelerPopup(false);
              }}
              className="btn btn-primary"
            >
              {t(`hompegae.apply`)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [inputType, setInputType] = useState("text");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const {t} = useLanguage();

  useEffect(() => {
  import("bootstrap/dist/js/bootstrap.bundle.min.js");
}, []);

  return (
    <>
      {/* page wide picture */}
      <HeadingPic bgClass="bgimg" heading="Home" />

      {/* tab contents with the popup here */}
      <TabSection
        inputType={inputType}
        setInputType={setInputType}
        adultCount={adultCount}
        setAdultCount={setAdultCount}
        childCount={childCount}
        setChildCount={setChildCount}
      />

      {/* Featured Section */}
      <div className="container">
        <h1 className={`featured ${abrilFatface.className}`}>
          {t(`homepage.featured_destinations`)}
        </h1>
        <div id="carouselExampleCaptions" className="carousel slide">
         
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Image
                src="/featured1.webp"
                className="d-block  img-fluid"
                alt="..."
                width={1100}
                height={500}
                style={{  height: "auto", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block caption">
                <h5>{t(`homepage.london_big_ben`)}</h5>
                <p>{t(`homepage.capital_of_the_united_kingdom`)}</p>
              </div>
            </div>
            <div className="carousel-item">
              <Image
                  src="/featured2.webp"
                  className="d-block img-fluid"
                  alt="..."
                  width={1100}
                  height={500}
                  style={{  height: "auto", objectFit: "cover" }}
                />
              <div className="carousel-caption d-none d-md-block caption">
                <h5>{t(`homepage.the_bahamas`)}</h5>
                <p>
                 {t(`homepage.a_stunning_archipelago_of_over_700_islands_known_for_its_turquoise waters,_white-sand_beaches,_and_vibrant_culture`)}
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <Image
                src="/featured3.jpg"
                className="d-block  img-fluid"
                alt="..."
                width={1100}
                height={500}
                style={{  height: "auto", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block caption">
                <h5>{t(`homepage.luxury_travel`)}</h5>
                <p>{t(`homepage.find_the_best_vacation_to_suit_your_needs`)}</p>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* deal zone */}
      <div className="container">
        <h1
          className={`featured ${abrilFatface.className}`}
          style={{ marginTop: "50px" }}
        >
          {t(`homepage.deal_zone`)}
        </h1>
        <div className=" row g-4 justify-content-center mt-3">
          <div className="col-12 col-sm-6 col-md-3">
            <Image
              src="/deal1.webp"
              style={{ borderRadius: "10px 10px 10px 80px" }}
              width={325}
              height={330}
              alt="..."
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <Image
              src="/deal2.webp"
              style={{ borderRadius: "10px" }}
              width={325}
              height={330}
              alt="..."
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <Image
              src="/deal3.webp"
              style={{ borderRadius: "10px" }}
              width={325}
              height={330}
              alt="..."
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <Image
              src="/deal4.webp"
              style={{ borderRadius: "10px 80px 10px 10px" }}
              width={325}
              height={330}
              alt="..."
            />
          </div>
        </div>
        <div className="row1 g-4 justify-between-center mt-3">
          <div className="col-lg-3 p-3" style={{ width: "270px" }}>
            <div className="tagline">{t(`homepage.sls_baha_mar`)}</div>
            <h4 className={`${abrilFatface.className} text-secondary`}>
             {t(`homepage.4th_night_free_and_up_to_$250_resort_credit`)}
            </h4>
            <p className="text-muted fst-italic">{t(`homepage.expires`)}: {t(`homepage.december`)} 21, 2025</p>
            <a
              href="https://slshotels.com/offer/baha-mar-fourth-night-on-us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="btn btn-primary w-100">
                {t(`homepage.more_detail`)}
              </button>
            </a>
          </div>

          <div className="col-lg-3 p-3" style={{ width: "270px" }}>
            <div className="tagline">
              {t(`homepage.margaritaville_beach_resort`)}
            </div>
            <h4 className={`${abrilFatface.className} text-secondary`}>
              {t(`homepage.save`)} 25%
            </h4>
            <p className="text-muted fst-italic">{t(`homepage.expires`)}: {t(`homepage.december`)} 21, 2025</p>
            <a
              href="https://www.margaritavilleresorts.com/margaritaville-beach-resort-nassau/offers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="btn btn-primary w-100">
                {t(`homepage.more_detail`)}
              </button>
            </a>
          </div>

          <div className="col-lg-3 p-3" style={{ width: "270px" }}>
            <div className="tagline">{t(`homepage.paradise_island`)}</div>
            <h4 className={`${abrilFatface.className} text-secondary`}>
              {t(`homepage.4th_night_free_with_min._3_paid_nights`)}
            </h4>
            <p className="text-muted fst-italic">{t(`homepage.expires`)}: {t(`homepage.december`)} 21, 2025</p>
            <a
              href="https://www.comfortsuitespi.com/specials"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="btn btn-primary w-100">
                {t(`homepage.more_detail`)}
              </button>
            </a>
          </div>

          <div className="col-lg-3 p-3" style={{ width: "270px" }}>
            <div className="tagline">{t(`homepage.british_colonial_nassau`)}</div>
            <h4 className={`${abrilFatface.className} text-secondary`}>
              {t(`homepage.save`)} 15% + $300 {t(`homepage.resort_credit`)}
            </h4>
            <p className="text-muted fst-italic">{t(`homepage.expires`)}: {t(`homepage.december`)} 21, 2025</p>
            <a
              href="https://www.britishcolonial.com/special-offers.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="btn btn-primary w-100">
                {t(`homepage.more_detail`)}
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
