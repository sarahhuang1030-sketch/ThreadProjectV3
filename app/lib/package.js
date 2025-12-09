import { getPool } from "./database.js";

// ✅ Get all ACTIVE packages
export async function getAllpackageDetails() {
  const pool = await getPool();

  const result = await pool.request().query(`
    SELECT *
    FROM packages
    WHERE PkgEndDate >= CAST(GETDATE() AS DATE)
  `);

  return result.recordset;
}

// ✅ Get EXPIRED packages
export async function getExpiredPackages() {
  const pool = await getPool();

  const result = await pool.request().query(`
    SELECT *
    FROM packages
    WHERE PkgEndDate < CAST(GETDATE() AS DATE)
  `);

  return result.recordset;
}
