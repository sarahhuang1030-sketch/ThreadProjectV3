import {getPool} from "@/app/lib/database"; // your MySQL connection
import { NextResponse } from "next/server";


export async function POST(req) {
  const data = await req.json();
  const pool = await getPool();
  try {
    const {
      primaryTraveler,
      additionalTravelers,
      packageId,
      totalPrice,
      travelDates,
    } = data;

    // 1. Insert primary traveler
    const [customerResult] = await pool.query(
      `INSERT INTO customers 
        (CustFirstName, CustLastName, CustEmail, CustHomePhone, CustAddress, CustCity, CustProv, CustPostal, CustCountry) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        primaryTraveler.CustFirstName,
        primaryTraveler.CustLastName,
        primaryTraveler.CustEmail,
        primaryTraveler.CustBusPhone || "",
        primaryTraveler.CustHomePhone,
        primaryTraveler.CustAddress,
        primaryTraveler.CustCity,
        primaryTraveler.CustProv,
        primaryTraveler.CustPostal,
        primaryTraveler.CustCountry,
      ]
    );

    const customerId = customerResult.insertId;

    // 2. Insert booking
    const bookingNo = generateBookingNo();
    const [bookingResult] = await pool.query(
      `INSERT INTO bookings
        (BookingDate, BookingNo, CustomerId) 
       VALUES (NOW(), ?, ?)`,
      [
        bookingNo,
        customerId,
        // travelDates.start,
        // travelDates.end,
        // primaryTraveler.Destination || "Unknown",
        // primaryTraveler.BasePrice,
        // packageId,
        // totalPrice,
      ]
    );

    const bookingId = bookingResult.insertId;

    // 3. Insert additional travelers (optional)
    for (const traveler of additionalTravelers) {
      await pool.query(
        `INSERT INTO customers 
          (CustFirstName, CustLastName, CustEmail, CustHomePhone, BookingId) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          traveler.CustFirstName,
          traveler.CustLastName,
          traveler.CustEmail,
          traveler.CustHomePhone,
          bookingId,
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}

function generateBookingNo(length = 8) {
 
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
