// app/api/login/route.js
import { NextResponse } from "next/server";
import { getPool } from "../../../lib/database";

export async function POST(req) {
  try {
    const pool = await getPool();

    // ✅ SAFETY CHECK (correct place)
    if (!pool) {
      return NextResponse.json(
        { success: false, error: "Database unavailable" },
        { status: 503 }
      );
    }

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

    const rows = result.recordset || [];
    const success = rows.length > 0;

    if (success) {
      return NextResponse.json({
        success: true,
        user: rows[0],
      });
    }

    return NextResponse.json({
      success: false,
      error: "Invalid credentials",
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
