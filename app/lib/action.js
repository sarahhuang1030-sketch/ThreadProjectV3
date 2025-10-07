// all quesries for the users table will be stored
//in this file

//db will take the default export from database.js
//which is our database connection
import db from "./database.js";

//function to get all users
export async function getAgencies() {
  const [agencies] = await db.query("SELECT * FROM agencies");
  console.log(agencies);

  //   const [agents] = await db.query("select * from agents where agencyid=1");
  //   console.log(agents);
  return agencies;
}
//getAgencies();
