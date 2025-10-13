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

export async function UserBooking(pkg) {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedPackage", JSON.stringify(pkg));
    window.location.href = "/booking"; // navigate to booking page
  }

  //refreshes or updates the page by fetching from the database
  //revalidatePath("/contact");
  redirect("/vacation-package/booking");
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
