import { NextResponse } from "next/server";
import db from "@/app/lib/database";

export async function GET(request, context) {
  const params = await context.params; // ✅ Await the params object

  const { id } = params;

  try {
    const result = await db.query(
      "SELECT PackageId, PkgStartDate, PkgEndDate FROM packages WHERE PackageId = ?",
      [id]
    );

    const packageData = result.recordset?.[0] || result?.[0]; // handles both SQL Server and MySQL

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(packageData);
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
