// app/api/login/route.js
import { NextResponse } from "next/server";
import pool from "../../../lib/database"; // if you're inside app/api/login/route.js

//import mysql from "mysql2/promise";
export async function POST(req) {
  try {
    const body = await req.json();
    const { CustFirstName, CustLastName, CustEmail } = body;

    const [rows] = await pool.execute(
      "SELECT * FROM customers WHERE CustFirstName = ? AND CustLastName = ? AND CustEmail = ?",
      [CustFirstName, CustLastName, CustEmail]
    );

    const success = Array.isArray(rows) && rows.length > 0;
    if (success) {
      return NextResponse.json({ success: success, user: rows[0] });
    } else {
      return NextResponse.json({
        success: false,
        error: "Invalid credential, please check your credentials",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" });
  }
}
