import db from "./database.js";

// Get all booking details
export async function getAllbookingdetails() {
  try {
    const [bookingdetails] = await db.query(`
      SELECT * FROM bookingdetails
      ORDER BY BookingDetailId DESC
    `);
    return bookingdetails;
  } catch (error) {
    console.error("Error fetching bookingdetails:", error);
    throw error;
  }
}

// Get booking detail by ID
export async function getBookingDetailById(id) {
  try {
    const [bookingdetail] = await db.query(
      `
      SELECT * FROM bookingdetails
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
export async function createBooking(bookingData) {
  try {
    const {
      BookingDetailId,
      ItineraryNo,
      TripStart,
      TripEnd,
      Description,
      Destination,
      BasePrice,
      AgencyCommission,
      BookingId,
      RegionId,
      ClassId,
      FeeId,
      ProductSupplierId,
    } = bookingData;

    const [result] = await db.query(
      `
      INSERT INTO bookings (
        BookingDetailId, ItineraryNo, TripStart, TripEnd, Description, Destination, BasePrice, AgencyCommission, BookingId, RegionId, ClassId, FeeId, ProductSupplierId
      ) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?,?)
    `,
      [
        BookingDetailId,
        ItineraryNo,
        TripStart,
        TripEnd,
        Description,
        Destination,
        BasePrice,
        AgencyCommission,
        BookingId,
        RegionId,
        ClassId,
        FeeId,
        ProductSupplierId,
      ]
    );

    return result.insertId;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}
