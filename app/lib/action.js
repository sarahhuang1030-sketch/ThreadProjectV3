// all quesries for the users table will be stored
//in this file

//db will take the default export from database.js
//which is our database connection
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUser } from "./agencies";
import { createCustomers } from "./agencies";
import { createDynamicTrackingState } from "next/dist/server/app-render/dynamic-rendering";
//UserCommentAction

export async function UserCommentAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  await createUser({
    name,
    phone,
    email,
    message,
  });

  //refreshes or updates the page by fetching from the database
  revalidatePath("/contact");
  redirect("/");
}

export async function UserBookingAction2(formData) {
  const CustFirstName = formData.get("CustFirstName");
  const CustLastName = formData.get("CustLastName");
  const CustAddress = formData.get("CustAddress");
  const CustHomePhone = formData.get("CustHomePhone");
  const CustBusPhone = formData.get("CustBusPhone");
  const CustCity = formData.get("CustCity");
  const CustProv = formData.get("CustProv");
  const CustCountry = formData.get("CustCountry");
  const CustEmail = formData.get("CustEmail");
  const CustPostal = formData.get("CustPostal");

  await createCustomers({
    CustFirstName,
    CustLastName,
    CustAddress,
    CustHomePhone,
    CustBusPhone,
    CustCity,
    CustProv,
    CustCountry,
    CustEmail,
    CustPostal,
  });

  //refreshes or updates the page by fetching from the database
  revalidatePath("/registerpage");
  // redirect("/login");
  return { success: true };
}

import { createBooking } from "./bookingdetails";

// Submit booking action
export async function submitBooking(formData) {
  try {
    const bookingData = {
      bookingDetailId: formData.get("bookingDetailId"),
      travelerCount: formData.get("travelerCount"),
      customerId: formData.get("customerId"),
      tripTypeId: formData.get("tripTypeId"),
      packageId: formData.get("packageId") || null,
    };

    await createBooking(bookingData);

    // Revalidate and redirect
    revalidatePath("/bookings");
    redirect("/bookings/confirmation");
  } catch (error) {
    console.error("Error submitting booking:", error);
    throw error;
  }
}

//
import { createBookings } from "./bookings";

export async function submitBookings(bookingData) {
  try {
    // 验证必要字段
    if (!bookingData.customerId || !bookingData.tripTypeId) {
      throw new Error("Customer ID and Trip Type are required");
    }

    // 调用API创建预订
    const bookingId = await createBookings(bookingData);

    // 这里可以添加额外的逻辑，如发送确认邮件等

    return bookingId;
  } catch (error) {
    console.error("Error submitting booking:", error);
    throw error;
  }
}

export async function UserCustomerAction(formData) {
  const CustID = formData.get("CustID");
  const CustFirstname = formData.get("CustFirstname");
  const CustLastname = formData.get("CustLastname");
  const CustAddress = formData.get("CustAddress");
  const CustCity = formData.get("CustCity");
  const CustProv = formData.get("CustProv");
  const CustPostal = formData.get("CustPostal");
  const CustCountry = formData.get("CustCountry");
  const CustHomePhone = formData.get("CustHomePhone");
  const CustBusPhone = formData.get("CustBusPhone");
  const CustEmail = formData.get("CustEmail");
  await createCustomer({
    CustFirstname,
    CustLastname,
    CustAddress,
    CustCity,
    CustProv,
    CustPostal,
    CustCountry,
    CustHomePhone,
    CustBusPhone,
    CustEmail,
  });
  //refreshes or updates the page by fetching from the database
  revalidatePath("/customer");
  redirect("/");
}

export async function UserRegisterAction(formData) {
  const CustFirstName = formData.get("CustFirstName");
  const CustLastName = formData.get("CustLastName");
  const CustAddress = formData.get("CustAddress");
  const CustHomePhone = formData.get("CustHomePhone");
  const CustBusPhone = formData.get("CustBusPhone");
  const CustCity = formData.get("CustCity");
  const CustProv = formData.get("CustProv");
  const CustCountry = formData.get("CustCountry");
  const CustEmail = formData.get("CustEmail");
  const CustPostal = formData.get("CustPostal");

  await createCustomers({
    CustFirstName,
    CustLastName,
    CustAddress,
    CustHomePhone,
    CustBusPhone,
    CustCity,
    CustProv,
    CustCountry,
    CustEmail,
    CustPostal,
  });

  //refreshes or updates the page by fetching from the database
  revalidatePath("/registerpage");
  // redirect("/login");
  return { success: true };
}

export async function UserBookingAction(formData) {
  const CustFirstName = formData.get("CustFirstName");
  const CustLastName = formData.get("CustLastName");
  const CustHomePhone = formData.get("CustHomePhone");
  const CustEmail = formData.get("CustEmail");
  const BookingDetailId = formData.get("BookingDetailId");
  const ItineraryNo = formData.get("ItineraryNo");
  const TripStart = formData.get("TripStart");
  const TripEnd = formData.get("TripEnd");
  const Description = formData.get("Description");
  const Destination = formData.get("Destination");
  const BasePrice = formData.get("BasePrice");
  const BookingId = formData.get("BookingId");

  await createCustomer2({
    CustFirstName,
    CustLastName,
    CustHomePhone,
    CustEmail,
  });

  await createBooking({
    BookingDetailId,
    ItineraryNo,
    TripStart,
    TripEnd,
    Description,
    Destination,
    BasePrice,
    BookingId,
  });

  //refreshes or updates the page by fetching from the database
  // revalidatePath("/contact");
  redirect("/");
}
