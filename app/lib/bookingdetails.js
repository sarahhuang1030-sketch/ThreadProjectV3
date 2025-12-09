import { getPool } from "./database.js";

/* ---------------- BOOKING DETAILS ---------------- */

// Get all booking details
export async function getAllbookingdetails() {
  const pool = await getPool();

  const result = await pool
    .request()
    .query(`
      SELECT *
      FROM bookingdetails
      ORDER BY BookingDetailId DESC
    `);

  return result.recordset;
}

// Get booking detail by ID
export async function getBookingDetailById(id) {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Id", id)
    .query(`
      SELECT *
      FROM bookingdetails
      WHERE BookingDetailId = @Id
    `);

  return result.recordset[0] || null;
}

// Create a new booking detail
export async function createBooking(bookingData) {
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

  const pool = await getPool();

  const result = await pool
    .request()
    .input("BookingDetailId", BookingDetailId)
    .input("ItineraryNo", ItineraryNo)
    .input("TripStart", TripStart)
    .input("TripEnd", TripEnd)
    .input("Description", Description)
    .input("Destination", Destination)
    .input("BasePrice", BasePrice)
    .input("AgencyCommission", AgencyCommission)
    .input("BookingId", BookingId)
    .input("RegionId", RegionId)
    .input("ClassId", ClassId)
    .input("FeeId", FeeId)
    .input("ProductSupplierId", ProductSupplierId)
    .query(`
      INSERT INTO bookingdetails (
        BookingDetailId, ItineraryNo, TripStart, TripEnd, Description,
        Destination, BasePrice, AgencyCommission, BookingId, RegionId,
        ClassId, FeeId, ProductSupplierId
      )
      OUTPUT INSERTED.BookingDetailId
      VALUES (
        @BookingDetailId, @ItineraryNo, @TripStart, @TripEnd, @Description,
        @Destination, @BasePrice, @AgencyCommission, @BookingId, @RegionId,
        @ClassId, @FeeId, @ProductSupplierId
      )
    `);

  return result.recordset[0].BookingDetailId;
}
