"use client"; // if you're on Next.js 13+ with app router

import { useState } from "react";
import Image
 from "next/image";
export default function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="dropbtn"
        onClick={() => setOpen(!open)} // toggle on click
      >
        Toggle Menu
      </button>

      {open && (
        <div className="dropdown-content">
          <p>Hello World!</p>
          <p>Another option</p>
        </div>
      )}
 <br />
  <br />
        {/* Image dropdown */}
      <div className="dropdown1">
        <Image src="/image.jpg" alt="Cinque Terre" width={100} height={50} />
        <div className="dropdown1-content">
          <Image src="/image.jpg" alt="Cinque Terre" width={300} height={200} />
          <div className="desc">Beautiful Cinque Terre</div>
        </div>
      </div>


      <style jsx>{`
        .dropdown {
          position: relative;
          display: inline-block;
          margin-bottom: 20px;
        }
        .dropbtn {
          background-color: #3498db;
          color: white;
          padding: 10px 16px;
          font-size: 16px;
          border: none;
          cursor: pointer;
        }
        .dropdown-content {
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          padding: 12px 16px;
          z-index: 1;
        }
        .dropdown-content p {
          margin: 0;
          padding: 6px 0;
        }
      /* Image dropdown styles */
        .dropdown1 {
          position: relative;
          display: inline-block;
        }
        .dropdown1-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 300px;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          padding: 12px 16px;
          z-index: 1;
        }
        .dropdown1:hover .dropdown1-content {
          display: block;
        }
        .desc {
          padding: 15px;
          text-align: center;
        }
     
      `}</style>
    </div>
  );

}