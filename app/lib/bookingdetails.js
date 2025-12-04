import {getPool } from "./database.js";

// Get all booking details
export async function getAllbookingdetails() {
  try {
    const pool = await getPool();

    const result = await pool
      .request()
      .query(`
        SELECT * FROM bookingdetails
        ORDER BY BookingDetailId DESC
      `);

    return result.recordset;  // Azure SQL returns rows here
  } catch (error) {
    console.error("Error fetching bookingdetails:", error);
    throw error;
  }
}

// Get booking detail by ID
export async function getBookingDetailById(id) {
  try {
    const pool = await getPool();

    const result = await pool
      .request()
      .input("Id", id)
      .query(`
        SELECT * 
        FROM bookingdetails
        WHERE BookingDetailId = @Id
      `);

    return result.recordset[0]; // returns one row
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
        INSERT INTO bookings (
          BookingDetailId, ItineraryNo, TripStart, TripEnd, Description, 
          Destination, BasePrice, AgencyCommission, BookingId, RegionId, 
          ClassId, FeeId, ProductSupplierId
        )
        OUTPUT INSERTED.BookingId
        VALUES (
          @BookingDetailId, @ItineraryNo, @TripStart, @TripEnd, @Description,
          @Destination, @BasePrice, @AgencyCommission, @BookingId, @RegionId,
          @ClassId, @FeeId, @ProductSupplierId
        )
      `);

    return result.recordset[0].BookingId;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}
