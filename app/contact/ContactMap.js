"use client";
import { useEffect, useState } from "react";
//import AgencyList from "../components/AgencyList";
//import AgencyList from "../components/AgencyList";
//import { getAgency } from "../lib/agencies";

export default function ContactMap() {
  const [activeLocation, setActiveLocation] = useState(-1);
  const [agencies, setAgencies] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    async function fetchAgencies() {
      try {
        const res = await fetch("/api/agencies");
        if (!res.ok) throw new Error("Failed to fetch agency");
        const data = await res.json();
        setAgencies(data);
      } catch (err) {
        console.error("Error Loading Agency", err);
      }
    }
    fetchAgencies();

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Prevent duplicate script injection
    if (
      !document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')
    ) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&v=beta`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        // attachMarkerListeners();
        setMapLoaded(true);
      };
    } else {
      // If script already loaded, attach listeners immediately
      //attachMarkerListeners();
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded) {
      return;
    }
    //wait for a bit for the markers to be fully initialized
    const timeoutId = setTimeout(() => {
      attachMarkerListeners();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [mapLoaded]);

  function attachMarkerListeners() {
    const calgaryMarker = document.querySelector(
      'gmp-advanced-marker[title="Calgary"]'
    );
    const okotoksMarker = document.querySelector(
      'gmp-advanced-marker[title="Okotoks"]'
    );

    if (calgaryMarker) {
      calgaryMarker.setAttribute("gmp-clickable", "");
      calgaryMarker.addEventListener("gmp-click", () => {
        setActiveLocation(1);
      });
    }

    if (okotoksMarker) {
      okotoksMarker.setAttribute("gmp-clickable", "");
      okotoksMarker.addEventListener("gmp-click", () => {
        setActiveLocation(2);
      });
    }
  }

  const renderPopupContent = () => {
    if (!Array.isArray(agencies)) return null;

    const agency = agencies.find((a) => a.AgencyId === activeLocation);
    if (!agency) return null;

    return (
      <div>
        <strong>{agency.AgncyCity}</strong>

        <p>
          Address: {agency.AgncyAddress}
          <br />
          Phone: {agency.AgncyPhone}
          <br />
          Fax: {agency.AgncyFax}
        </p>
      </div>
    );
  };

  return (
    <div style={{ height: "480px", width: "90%", position: "relative" }}>
      <gmp-map
        center="50.885,-114.023"
        zoom="10"
        map-id="DEMO_MAP_ID"
        style={{ height: "100%", width: "100%" }}
      >
        <gmp-advanced-marker
          position="51.0449,-114.0719"
          title="Calgary"
        ></gmp-advanced-marker>
        <gmp-advanced-marker
          position="50.7257,-113.9749"
          title="Okotoks"
        ></gmp-advanced-marker>
      </gmp-map>

      {activeLocation && (
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "1115px",
            background: "white",
            width: "250px",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {renderPopupContent()}
        </div>
      )}
    </div>
  );
}
