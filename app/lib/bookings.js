import {getPool } from "./database.js";

// Get all booking details
export async function getAllbookings() {
  try {
    const pool = await getPool();
if (!pool) {
  return []; // ✅ prevents crash
}
    const result = await pool
      .request()
      .query(`
        SELECT * 
        FROM bookings
        ORDER BY BookingId DESC
      `);

    return result.recordset;  // Azure SQL rows come from recordset
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

// Get booking detail by ID
export async function getBookingsById(id) {
  try {
    const pool = await getPool();
if (!pool) {
  return []; // ✅ prevents crash
}
    const result = await pool
      .request()
      .input("Id", id)
      .query(`
        SELECT * 
        FROM bookings
        WHERE BookingDetailId = @Id
      `);

    return result.recordset[0];   // return the single row
  } catch (error) {
    console.error("Error fetching booking detail:", error);
    throw error;
  }
}

// Create a new booking
export async function createBookings(bookingData) {
  try {
    const {
      BookingDate,
      BookingNo,
      TravelerCount,
      CustomerId,
      TripTypeId,
      PackageId,
    } = bookingData;

    const pool = await getPool();
if (!pool) {
  return []; // ✅ prevents crash
}
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

    return result.recordset[0].BookingId; // Azure SQL returns new ID here
  } catch (error) {
    console.error("Error creating bookings:", error);
    throw error;
  }
}