// lib/package.js
import {getPool } from "./database.js";
// 获取所有有效套餐（未过期）
export async function getAllpackageDetails() {
  try {
    const pool = await getPool();
    if (!pool) {
  return []; // ✅ prevents crash
}
 const result = await pool
      .request()
      .query(`
        SELECT *
        FROM packages
        WHERE PkgEndDate >= CAST(GETDATE() AS DATE)
      `);

    return result.recordset ?? []; // always return array
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}

// 获取所有过期套餐（移除 id 参数）
export async function getExpiredPackages() {
  try {
    const pool = await getPool();
if (!pool) {
  return []; // ✅ prevents crash
}
    const result = await pool
      .request()
      .query(`
        SELECT *
        FROM packages
        WHERE PkgStartDate <= CAST(GETDATE() AS DATE)
      `);

    return result.recordset ?? [];
  } catch (error) {
    console.error("Error fetching expired packages:", error);
    return [];
  }
}