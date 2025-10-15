"use client";
import { useState } from "react";
import "./sarahstyle.css";
import "./nikitha.css";
import Link from "next/link";
import Image from "next/image";
//import Script from "./sarah.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Abril_Fatface } from "next/font/google";
import { HeadingPic } from "./components/Heading";

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
}) {
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
            Tickets
          </button>
          <button
            className={`tab ${activeTab === "todo" ? "active" : ""}`}
            onClick={() => setActiveTab("todo")}
          >
            Things to do
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
                  placeholder="Where to?"
                  className="image-label1"
                />
              </div>
              <div>
                <input
                  type={inputType}
                  id="travelDate"
                  placeholder="Date"
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
                  placeholder="Traveller"
                  className="image-label3"
                  onClick={() => setShowTravelerPopup(true)}
                />
              </div>
              <div>
                <button type="submit" className="btn-ticket">
                  Search
                </button>
              </div>
            </form>
          </div>
        )}
        {activeTab === "todo" && (
          <div id="todo" className="tab-content">
            <p>Stay tuned for upcoming feature...</p>
          </div>
        )}
        {/* Traveler Popup styling */}
        {/* When travelerInput is clicked, the popup appears:
         */}
        {showTravelerPopup && (
          <div id="travelerPopup" className="popup-panel">
            <h2>Select Travelers</h2>
            <label htmlFor="adultCount">Adults:</label>
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
            <label htmlFor="childCount">Children:</label>
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
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RootLayout() {
  const [inputType, setInputType] = useState("text");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

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
          Featured Destinations
        </h1>
        <div id="carouselExampleCaptions" className="carousel slide">
          {/* <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div> */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Image
                src="/featured1.webp"
                className="d-block w-100"
                alt="..."
                width={1300}
                height={500}
              />
              <div className="carousel-caption d-none d-md-block caption">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <Image
                src="/featured2.webp"
                className="d-block w-100"
                alt="..."
                width={1300}
                height={500}
              />
              <div className="carousel-caption d-none d-md-block caption">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <Image
                src="/featured3.jpg"
                className="d-block w-100"
                alt="..."
                width={1300}
                height={500}
              />
              <div className="carousel-caption d-none d-md-block caption">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
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
          Deal Zone
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
          <div className="col-lg-3 p-3" style={{ width: "300px" }}>
            <div className="tagline">SLS BAHA MAR</div>
            <h4 className={`${abrilFatface.className} text-secondary`}>
              4th Night Free and up to $250 resort credit
            </h4>
            <p className="text-muted fst-italic">Expires: December 21, 2025</p>
            <a
              href="https://slshotels.com/offer/baha-mar-fourth-night-on-us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="btn btn-primary w-100">
                More Detail
              </button>
            </a>
          </div>

          <div className="col-lg-3 p-3" style={{ width: "300px" }}>
            <div className="tagline">
              Margaritaville Beach Resort, Nassau, Bahamas
            </div>
            <h4 className={`${abrilFatface.className} text-secondary`}>
              Save 25%
            </h4>
            <p className="text-muted fst-italic">Expires: December 21, 2025</p>
            <a
              href="https://www.margaritavilleresorts.com/margaritaville-beach-resort-nassau/offers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="btn btn-primary w-100">
                More Detail
              </button>
            </a>
          </div>

          <div className="col-lg-3 p-3" style={{ width: "300px" }}>
            <div className="tagline">Comfort Suites Paradise Island</div>
            <h4 className={`${abrilFatface.className} text-secondary`}>
              4th Night Free With Min. 3 Paid Nights. Kids Stay, Play & Eat
              Free! Includes access to Atlantis Paradise Island Plus up to $100
              Resort Credit
            </h4>
            <p className="text-muted fst-italic">Expires: December 21, 2025</p>
            <a
              href="https://www.comfortsuitespi.com/specials"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="btn btn-primary w-100">
                More Detail
              </button>
            </a>
          </div>

          <div className="col-lg-3 p-3" style={{ width: "300px" }}>
            <div className="tagline">British Colonial Nassau</div>
            <h4 className={`${abrilFatface.className} text-secondary`}>
              Save 15% + $300 Resort Credit
            </h4>
            <p className="text-muted fst-italic">Expires: December 21, 2025</p>
            <a
              href="https://www.britishcolonial.com/special-offers.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="btn btn-primary w-100">
                More Detail
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
