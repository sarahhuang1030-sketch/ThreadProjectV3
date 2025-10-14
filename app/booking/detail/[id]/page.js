import { notFound } from "next/navigation";
import { getBookingDetailById } from "@/app/lib/bookingdetails";
import BookingForm from "@/components/bookingForm";

export default async function BookingDetailPage({ params }) {
  const { id } = params;
  const bookingDetail = await getBookingDetailById(id);

  if (!bookingDetail) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Booking Detail</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {bookingDetail.Destination}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2">
                <strong>Itinerary #:</strong> {bookingDetail.ItineraryNo}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Trip Start:</strong>{" "}
                {new Date(bookingDetail.TripStart).toLocaleDateString()}
              </p>
              <p className="text-gray-600-2">
                <strong>Trip End:</strong>{" "}
                {new Date(bookingDetail.TripEnd).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Region:</strong> {bookingDetail.RegionId}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Class:</strong> {bookingDetail.ClassId}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Base Price:</strong> ¥
                {bookingDetail.BasePrice.toLocaleString()}
              </p>
              {bookingDetail.AgencyCommission > 0 && (
                <p className="text-gray-600">
                  <strong>Commission:</strong> ¥
                  {bookingDetail.AgencyCommission.toLocaleString()}
                </p>
              )}
            </div>
            <div>
              <p className="text-gray-600">{bookingDetail.Description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
          <BookingForm bookingDetail={bookingDetail} />
        </div>
      </div>
    </div>
  );
}
