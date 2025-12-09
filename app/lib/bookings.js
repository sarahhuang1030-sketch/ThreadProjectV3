import { getPool } from "./database.js";

/* ---------------- BOOKINGS ---------------- */

// Get all bookings
export async function getAllbookings() {
  const pool = await getPool();

  const result = await pool
    .request()
    .query(`
      SELECT *
      FROM bookings
      ORDER BY BookingId DESC
    `);

  return result.recordset;
}

// Get booking by ID
export async function getBookingsById(id) {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Id", id)
    .query(`
      SELECT *
      FROM bookings
      WHERE BookingId = @Id
    `);

  return result.recordset[0] || null;
}

// Create a new booking
export async function createBookings(bookingData) {
  const {
    BookingDate,
    BookingNo,
    TravelerCount,
    CustomerId,
    TripTypeId,
    PackageId,
  } = bookingData;

  const pool = await getPool();

  const result = await pool
    .request()
    .input("BookingDate", BookingDate)
    .input("BookingNo", BookingNo)
    .input("TravelerCount", TravelerCount)
    .input("CustomerId", CustomerId)
    .input("TripTypeId", TripTypeId)
    .input("PackageId", PackageId)
    .query(`
      INSERT INTO bookings (
        BookingDate,
        BookingNo,
        TravelerCount,
        CustomerId,
        TripTypeId,
        PackageId
      )
      OUTPUT INSERTED.BookingId
      VALUES (
        @BookingDate,
        @BookingNo,
        @TravelerCount,
        @CustomerId,
        @TripTypeId,
        @PackageId
      );
    `);

  return result.recordset[0].BookingId;
}
