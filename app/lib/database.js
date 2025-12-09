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



// IMPORTANT: Use a *promise* instead of a pool object
let poolPromise;



export async function getPool() {
  // ✅ absolute SSR safety
  if (typeof window !== "undefined") return null;

  // ✅ runtime env guard
  if (!process.env.AZURE_SQL_CONNECTION) {
    console.warn("⚠️ AZURE_SQL_CONNECTION not available");
    return null;
  }

  if (!poolPromise) {
    poolPromise = sql
      .connect(process.env.AZURE_SQL_CONNECTION)
      .then(pool => {
        console.log("✅ Connected to Azure SQL");
        return pool;
      })
      .catch(err => {
        poolPromise = null;
        console.error("❌ SQL Connection Failed:", err);
        throw err;
      });
  }

  return poolPromise;
}

