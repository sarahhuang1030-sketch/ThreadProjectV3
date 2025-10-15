// all quesries for the users table will be stored
//in this file

//db will take the default export from database.js
//which is our database connection
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUser } from "./agencies";
import { createCustomer } from "./customer";
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

// // booking list
// export async function UserBooking(pkg) {
//   if (typeof window !== "undefined") {
//     // 存储选中的套餐信息到本地存储
//     const packageData = {
//       id: pkg.id,
//       name: pkg.name,
//       description: pkg.description,
//       price: pkg.price,
//       duration: pkg.duration,
//       imageUrl: pkg.imageUrl,
//     };
//     localStorage.setItem("selectedPackage", JSON.stringify(packageData));

//     // navigate to booking page
//     window.location.href = "/booking";
//   }
//   //refreshes or updates the page by fetching from the database
//   //revalidatePath("/contact");
//   redirect("/vacation-package/booking");
// }

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
