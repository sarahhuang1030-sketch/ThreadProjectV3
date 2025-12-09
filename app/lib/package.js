import { getPool } from "./database";

// Active packages
export async function getAllpackageDetails() {
  const pool = await getPool();
  if (!pool) return [];

  const result = await pool.request().query(`
    SELECT *
    FROM packages
    WHERE PkgEndDate >= CAST(GETDATE() AS DATE)
  `);

  return result.recordset ?? [];
}

// Expired packages
export async function getExpiredPackages() {
  const pool = await getPool();
  if (!pool) return [];

  const result = await pool.request().query(`
    SELECT *
    FROM packages
    WHERE PkgEndDate < CAST(GETDATE() AS DATE)
  `);

  return result.recordset ?? [];
}
