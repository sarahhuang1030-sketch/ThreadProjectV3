import { getPool } from "@/app/lib/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  const pool = await getPool();

  // ✅ absolute safety
  if (!pool) {
    return NextResponse.json(
      { success: false, error: "Database unavailable" },
      { status: 503 }
    );
  }

  try {
    const data = await req.json();
    const {
      primaryTraveler,
      additionalTravelers,
      packageId,
      totalPrice,
    } = data;

    // 1️⃣ Insert primary customer
    const customerResult = await pool
      .request()
      .input("first", primaryTraveler.CustFirstName)
      .input("last", primaryTraveler.CustLastName)
      .input("email", primaryTraveler.CustEmail)
      .input("homePhone", primaryTraveler.CustHomePhone || "")
      .input("address", primaryTraveler.CustAddress)
      .input("city", primaryTraveler.CustCity)
      .input("prov", primaryTraveler.CustProv)
      .input("postal", primaryTraveler.CustPostal)
      .input("country", primaryTraveler.CustCountry)
      .query(`
        INSERT INTO customers
        (CustFirstName, CustLastName, CustEmail, CustHomePhone, CustAddress, CustCity, CustProv, CustPostal, CustCountry)
        VALUES (@first, @last, @email, @homePhone, @address, @city, @prov, @postal, @country);

        SELECT SCOPE_IDENTITY() AS CustomerId;
      `);

    const customerId = customerResult.recordset[0].CustomerId;

    // 2️⃣ Insert booking
    const bookingNo = generateBookingNo();

    const bookingResult = await pool
      .request()
      .input("bookingNo", bookingNo)
      .input("customerId", customerId)
      .query(`
        INSERT INTO bookings (BookingDate, BookingNo, CustomerId)
        VALUES (GETDATE(), @bookingNo, @customerId);

        SELECT SCOPE_IDENTITY() AS BookingId;
      `);

    const bookingId = bookingResult.recordset[0].BookingId;

    // 3️⃣ Insert additional travelers
    if (Array.isArray(additionalTravelers)) {
      for (const traveler of additionalTravelers) {
        await pool
          .request()
          .input("first", traveler.CustFirstName)
          .input("last", traveler.CustLastName)
          .input("email", traveler.CustEmail)
          .input("homePhone", traveler.CustHomePhone || "")
          .query(`
            INSERT INTO customers
            (CustFirstName, CustLastName, CustEmail, CustHomePhone)
            VALUES (@first, @last, @email, @homePhone)
          `);
      }
    }

    return NextResponse.json({ success: true, bookingId });
  } catch (err) {
    console.error("❌ Booking error:", err);
    return NextResponse.json(
      { success: false, error: "Booking failed" },
      { status: 500 }
    );
  }
}

function generateBookingNo(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
