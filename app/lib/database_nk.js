// establish connection to the mysql db

//import library for connection from installed package
//database_nk.js
import { createPool } from "mysql2/promise";


//create connection
const pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Anjirupa@@30",
  database: process.env.DB_NAME || "travelexperts",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  dateStrings: true,
});
export default pool;
