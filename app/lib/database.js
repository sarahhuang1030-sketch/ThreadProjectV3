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
let poolPromise = null;



export async function getPool() {
  // ✅ HARD STOP if env variable is missing
  if (!process.env.AZURE_SQL_CONNECTION) {
    throw new Error("AZURE_SQL_CONNECTION is not defined");
  }

  // ✅ Reuse existing pool
  if (!poolPromise) {
    try {
      poolPromise = sql.connect(process.env.AZURE_SQL_CONNECTION);
      console.log("✅ Connected to Azure SQL");
    } catch (err) {
      poolPromise = null; // allow retry later
      console.error("❌ SQL Connection Failed", err);
      throw err;
    }
  }

  return poolPromise;
}

