import { getAllbookings } from "@/app/lib/bookings";
import BookingForm from "@/app/components/bookingForm";

export default async function BookingsPage() {
  const bookings = await getAllbookings();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bookings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：预订列表 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Bookings</h2>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.BookingId} className="border-b pb-4">
                <p className="font-medium">Booking #{booking.BookingNo}</p>
                <p className="text-sm text-gray-600">
                  Date: {booking.BookingDate}
                </p>
                <p className="text-sm text-gray-600">
                  Travelers: {booking.TravelerCount}
                </p>
                <p className="text-sm text-gray-600">
                  Customer ID: {booking.CustomerId}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：预订表单 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Create New Booking</h2>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
