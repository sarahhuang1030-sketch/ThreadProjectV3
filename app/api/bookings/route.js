import db from "../../lib/database";

function generateBookingNo(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req) {
  const body = await req.json();

  const {
    CustFirstName,
    CustLastName,
    CustEmail,
    CustHomePhone,
    BookingId,
    BookingDate,
    BookingNo,
    CustAddress,
    CustCity,
    CustProv,
    CustPostal,
    CustCountry,
    CustBusPhone,
    //ItineraryNo,
  } = body;

  try {
    // Insert customer
    const [customerResult] = await db.query(
      "INSERT INTO customers (CustFirstName, CustLastName, CustEmail, CustHomePhone,CustAddress, CustCity, CustProv, CustPostal,CustCountry,CustBusPhone ) VALUES (?, ?, ?, ?,?,?,?,?,?,?)",
      [
        CustFirstName,
        CustLastName,
        CustEmail,
        CustHomePhone,
        CustAddress,
        CustCity,
        CustProv,
        CustPostal,
        CustCountry,
        CustBusPhone,
      ]
    );

    const CustomerId = customerResult.insertId;
    const BookingNo = generateBookingNo(Math.floor(Math.random() * 3) + 7);
    //const CustomerId = Math.floor(1000 + Math.random() * 9000); // Range: 1000–9999

    // Insert booking
    await db.query(
      "INSERT INTO bookings (BookingId, BookingDate, BookingNo, CustomerId) VALUES (?,NOW(), ?, ?)",
      [BookingId, BookingNo, CustomerId]
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("Order error:", err);
    return Response.json({ success: false, error: err.message });
  }
}
