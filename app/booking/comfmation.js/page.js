import Link from "next/link";

export default function BookingConfirmation() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for booking with us. We are received your reservation and
          will be in touch shortly with more details.
        </p>
        <Link
          href="/booking"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
}
