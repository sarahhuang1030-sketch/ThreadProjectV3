// Force the page to be dynamically rendered on each request
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


//import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

import { HeadingPic } from "../components/Heading";
import { getCustomers } from "../lib/agencies";
import RegisterPage from "../components/RegisterPage";




export default async function Registration() {
  const customers = await getCustomers();
  return (
    <>
      <HeadingPic bgClass="bgimg2" heading="Register With Us" />
      <RegisterPage customers={customers} />
    </>
  );
}
