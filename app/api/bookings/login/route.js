// app/api/login/route.js
import { NextResponse } from "next/server";
import {getPool} from "../../../lib/database"; // if you're inside app/api/login/route.js

//import mysql from "mysql2/promise";
export async function POST(req) {
  try {
    const pool = await getPool();
    const body = await req.json();
    const { CustFirstName, CustLastName, CustEmail } = body;

    const result = await pool
      .request()
      .input("CustFirstName", CustFirstName)
      .input("CustLastName", CustLastName)
      .input("CustEmail", CustEmail)
      .query(`
        SELECT *
        FROM customers
        WHERE CustFirstName = @CustFirstName
          AND CustLastName = @CustLastName
          AND CustEmail = @CustEmail
      `);

    const rows = result.recordset;
    const success = rows.length > 0;
    
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
