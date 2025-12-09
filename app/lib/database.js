// establish connection to the mysql db

//import library for connection from installed package
//database.js
// import { createPool } from "mysql2/promise";

// //create connection
// const pool = createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "Sarah923*@!",
//   database: process.env.DB_NAME || "travelexpertssarah",
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   connectTimeout: 60000,
//   dateStrings: true,
// });
// export default pool;

import sql from "mssql";

let pool;

export async function getPool() {
  console.log("AZURE_SQL_CONNECTION exists:", !!process.env.AZURE_SQL_CONNECTION);

  if (pool) return pool;

  const conn = process.env.AZURE_SQL_CONNECTION;
  if (!conn) {
    console.warn("⚠️ AZURE_SQL_CONNECTION not available");
    return null;
  }

  try {
    pool = await sql.connect(conn);
    console.log("✅ Azure SQL connected, Yes!");
    return pool;
  } catch (err) {
    console.error("❌ SQL connection failed:", err);
    return null;
  }
}
