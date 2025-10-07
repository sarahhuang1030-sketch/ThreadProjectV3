// pages/api/contact.js
import db from "../../lib/database"; // assuming you have this setup

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body; // Extract form data

    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const [result] = await connection.execute(
        "INSERT INTO your_table_name (name, email, message) VALUES (?, ?, ?)",
        [name, email, message]
      );

      await connection.end();
      res.status(200).json({ message: "Data submitted successfully!" });
    } catch (error) {
      console.error("Error submitting data:", error);
      res.status(500).json({ message: "Error submitting data." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
