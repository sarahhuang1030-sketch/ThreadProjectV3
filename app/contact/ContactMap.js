"use client";

import { useEffect, useState, useRef } from "react";

export default function ContactMap() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [agencies, setAgencies] = useState([]);
  const [mapReady, setMapReady] = useState(false);
  const scriptLoadedRef = useRef(false);

  // 1️⃣ Fetch agencies (client-safe)
  useEffect(() => {
    async function fetchAgencies() {
      try {
        const res = await fetch("/api/agencies");
        if (!res.ok) throw new Error("Failed to fetch agency");
        const data = await res.json();
        setAgencies(data);
      } catch (err) {
        console.error("Error loading agencies:", err);
      }
    }

    fetchAgencies();
  }, []);

  // 2️⃣ Load Google Maps script SAFELY
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (scriptLoadedRef.current) {
      setMapReady(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api/js"]'
    );

    if (existingScript) {
      scriptLoadedRef.current = true;
      setMapReady(true);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Google Maps API key missing");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&v=beta`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      scriptLoadedRef.current = true;
      setMapReady(true);
    };

    document.body.appendChild(script);
  }, []);

  // 3️⃣ Attach marker listeners once map is ready
  useEffect(() => {
    if (!mapReady) return;

    const attach = () => {
      const calgary = document.querySelector(
        'gmp-advanced-marker[title="Calgary"]'
      );
      const okotoks = document.querySelector(
        'gmp-advanced-marker[title="Okotoks"]'
      );

      if (calgary) {
        calgary.setAttribute("gmp-clickable", "");
        calgary.onclick = () => setActiveLocation(1);
      }

      if (okotoks) {
        okotoks.setAttribute("gmp-clickable", "");
        okotoks.onclick = () => setActiveLocation(2);
      }
    };

    // Slight delay to ensure markers exist
    const t = setTimeout(attach, 300);
    return () => clearTimeout(t);
  }, [mapReady]);

  // 4️⃣ Popup content
  const agency = agencies.find(
    (a) => a.AgencyId === activeLocation
  );

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
        />
        <gmp-advanced-marker
          position="50.7257,-113.9749"
          title="Okotoks"
        />
      </gmp-map>

      {agency && (
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "-270px",
            background: "white",
            width: "250px",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <strong>{agency.AgncyCity}</strong>
          <p>
            Address: {agency.AgncyAddress}
            <br />
            Phone: {agency.AgncyPhone}
            <br />
            Fax: {agency.AgncyFax}
          </p>
        </div>
      )}
    </div>
  );
}
