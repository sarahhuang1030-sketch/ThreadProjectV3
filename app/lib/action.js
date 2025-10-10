// all quesries for the users table will be stored
//in this file

//db will take the default export from database.js
//which is our database connection
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUser } from "./agencies";
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
