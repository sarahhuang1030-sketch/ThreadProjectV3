// app/api/package/[id]/route.js
import { NextResponse } from "next/server";
import db from "../../../../lib/database";

export async function GET(request, context) {
  const { id } = context.params;

  try {
    const [rows] = await db.execute(
      `SELECT PackageId, PkgName, PkgBasePrice, PkgStartDate, PkgEndDate FROM Packages WHERE PackageId = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
