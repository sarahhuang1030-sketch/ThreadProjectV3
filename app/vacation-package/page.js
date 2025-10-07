"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Abril_Fatface } from "next/font/google";
import Image from "next/image";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface",
});

const HeadingPic = () => {
  return (
    <div className="container-home bgimg1">
      <div className="row justify-content-center align-items-center content-mid">
        <div className="col-md-10 text-center">
          <h1
            className={`heading mb-4 aos-init aos-animate ${abrilFatface.className}`}
            data-aos="fade-up"
          >
            Vacation Packages
          </h1>
        </div>
      </div>
    </div>
  );
};

const RootLayout = () => {
  return (
    <div>
      <HeadingPic />
      <div className="container">
        <h1 className={`featured ${abrilFatface.className}`}>
          Bundle & Save in top destinations!
        </h1>
        <p style={{ textAlign: "center", color: "#4dcaffff" }}>
          We found great package prices in the last 48 hours for two adults
          travelling. Check for pricing updates!
        </p>
        {/* Carousel */}
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div
              className="carousel-item active"
              style={{ position: "relative", height: "500px" }}
            >
              <div style={{ position: "relative", height: "100%" }}>
                <Image
                  src="/USA.avif"
                  alt="United States"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className="carousel-caption d-none d-md-block"
                style={{ bottom: "20%" }}
              >
                <h5>United States</h5>
                <p>
                  From New York's neon glow to Yellowstone's hidden wonders, the
                  Statue of Liberty's solemnity collides with Hollywood's
                  dreamscape, unlocking a wild journey through diverse cultures.
                </p>
              </div>
            </div>
            <div
              className="carousel-item"
              style={{ position: "relative", height: "500px" }}
            >
              <div style={{ position: "relative", height: "100%" }}>
                <Image
                  src="/UK.avif"
                  alt="United Kingdom"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className="carousel-caption d-none d-md-block"
                style={{ bottom: "20%" }}
              >
                <h5>United Kingdom</h5>
                <p>
                  The Stonehenge's prehistoric whispers meet London Tower
                  Bridge's modern pulse, where lakeside serenity blends classic
                  romance in Britain's dual charm.
                </p>
              </div>
            </div>
            <div
              className="carousel-item"
              style={{ position: "relative", height: "500px" }}
            >
              <div style={{ position: "relative", height: "100%" }}>
                <Image
                  src="/china.avif"
                  alt="China"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className="carousel-caption d-none d-md-block"
                style={{ bottom: "20%" }}
              >
                <h5>China</h5>
                <p>
                  The Forbidden City's red walls embrace Zhangjiajie's
                  fairyland, from modern Shanghai to Dunhuang's flying
                  apsaras—5,000 years of civilization and natural grandeur
                  await.
                </p>
              </div>
            </div>
            <div
              className="carousel-item"
              style={{ position: "relative", height: "500px" }}
            >
              <div style={{ position: "relative", height: "100%" }}>
                <Image
                  src="/south africa.avif"
                  alt="South America"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className="carousel-caption d-none d-md-block"
                style={{ bottom: "20%" }}
              >
                <h5>South America</h5>
                <p>
                  The Amazon's breath mingles with Machu Picchu's ancient
                  warmth, samba passion clashes with thunderous waterfalls—where
                  nature and culture reach their boiling point.
                </p>
              </div>
            </div>
            <div
              className="carousel-item"
              style={{ position: "relative", height: "500px" }}
            >
              <div style={{ position: "relative", height: "100%" }}>
                <Image
                  src="/australia.avif"
                  alt="Australia"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className="carousel-caption d-none d-md-block"
                style={{ bottom: "20%" }}
              >
                <h5>Australia</h5>
                <p>
                  Dive with coral in the Great Barrier Reef, converse with stars
                  above Uluru's red rock, where wild nature and urban elegance
                  intertwine in a southern wonderland.
                </p>
              </div>
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

      {/* Cards Section */}
      <div className="container">
        <div className="heading">
          <h1 className={`featured ${abrilFatface.className}`}>
            Find your perfect vacation
          </h1>
          <p style={{ textAlign: "center", color: "#4d4c0d" }}>
            Take a break from work and soak up the sun at one of our hottest
            vacation destinations
          </p>
        </div>

        {/* Cards Group */}
        <div className="card-group mb-4">
          <div className="card shadow-sm">
            <div style={{ position: "relative", height: "200px" }}>
              <Image
                src="/view4.avif"
                alt="View of Forest"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">View of Forest</h5>
              <p className="card-text">
                Towering trees blot out the sun, their leaves weaving a canopy
                that filters sunlight into dappled patterns on the forest floor.
                Below, soft earth mingles with fragrant grass, forming a winding
                path that invites exploration.
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary w-100">View</button>
            </div>
          </div>

          <div className="card shadow-sm">
            <div style={{ position: "relative", height: "200px" }}>
              <Image
                src="/view1.avif"
                alt="View of Mountain"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">View of Mountain</h5>
              <p className="card-text">
                Standing on golden sands, the salty breeze brushes your face as
                the distant horizon shimmers with sunlight dancing on the waves.
                The sea stretches endlessly, merging with the sky in a
                breathtaking embrace.
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary w-100">View</button>
            </div>
          </div>

          <div className="card shadow-sm">
            <div style={{ position: "relative", height: "200px" }}>
              <Image
                src="/view3.avif"
                alt="View of Seaside"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">View of Seaside</h5>
              <p className="card-text">
                Whether hiking lightly or daring the summit, the mountains
                answer your courage with awe-inspiring vistas and an air of
                mystery. Here, freedom and adventure await souls who yearn to
                conquer the untamed.
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary w-100">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
