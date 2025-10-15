import { getAllbookingdetails } from "@/app/lib/bookingdetails";
import BookingDetailList from "@/app/components/bookingList";

export default async function BookingPage() {
  const bookingDetails = await getAllbookingdetails();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Booking Details</h1>
      <BookingDetailList bookingDetails={bookingDetails} />
    </div>
  );
}
