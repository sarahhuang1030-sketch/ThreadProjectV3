import db from "./database.js";

// Get all booking details
export async function getAllbookings() {
  try {
    const [bookings] = await db.query(`
      SELECT * FROM bookings
      ORDER BY BookingId DESC
    `);
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

// Get booking detail by ID
export async function getBookingsById(id) {
  try {
    const [bookingdetail] = await db.query(
      `
      SELECT * FROM bookings
      WHERE BookingDetailId = ?
    `,
      [id]
    );
    return bookingdetail[0];
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

    const [result] = await db.query(
      `
      INSERT INTO bookings (
        BookingDate,
        BookingNo,
        TravelerCount,
        CustomerId,
        TripTypeId,
        PackageId
      ) VALUES (?, ?, ?, ?, ?, ?)
    `,
      [BookingDate, BookingNo, TravelerCount, CustomerId, TripTypeId, PackageId]
    );

    return result.insertId;
  } catch (error) {
    console.error("Error creating bookings:", error);
    throw error;
  }
}
