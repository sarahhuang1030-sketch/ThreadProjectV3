import db from "./database.js";

export async function getAgency() {
  try {
    const [agencies] = await db.query("SELECT * FROM agencies");
    //#8 array error
    return agencies;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
}

export async function getAgentsbyId1() {
  try {
    const [agents] = await db.query("SELECT * FROM agents WHERE AgencyId =1");

    //#8 array error
    return agents;
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
}

export async function getAgentsbyId2() {
  try {
    const [agents] = await db.query("SELECT * FROM agents WHERE AgencyId =2");

    //#8 array error
    return agents;
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
}
//this is for the contact form
export async function createUser({ name, phone, email, message }) {
  //check if name and email are undefined
  //these are required fields
  if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim())
    throw new Error("Please enter the required field");

  //check if the email is unique
  const [existing] = await db.query(
    "SELECT id FROM contact_messages where email = ?",
    [email]
  );

  if (existing.length > 0)
    throw new Error("Customer with this email already exist");

  //otherwise store new user
  const result = await db.query(
    "Insert into contact_messages (name, phone, email, message) values(?,?,?,?)",
    [name, phone, email, message]
  );
  //return id of the inserted object
  console.log(result);
  return { id: result.insertid };
}

export async function getCustomers() {
  try {
    const [customers] = await db.query("SELECT * FROM customers");
    //#8 array error
    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
}

export async function createCustomers({
  CustFirstName,
  CustLastName,
  CustAddress,
  CustHomePhone,
  CustBusPhone,
  CustCity,
  CustProv,
  CustCountry,
  CustEmail,
  CustPostal,
}) {
  //check if name and email are undefined
  //these are required fields
  if (
    !CustFirstName?.trim() ||
    !CustLastName?.trim() ||
    !CustEmail?.trim() ||
    !CustHomePhone?.trim()
  )
    throw new Error("Please enter the required field");

  //check if the email is unique
  const [row] = await db.query(
    "SELECT CustomerId FROM customers where CustEmail = ?",
    [CustEmail]
  );

  if (row.length > 0) throw new Error("Customer with this email already exist");
  // alert("Customer with this email already exist");

  //otherwise store new user
  const result = await db.query(
    "INSERT INTO customers (CustFirstName, CustLastName, CustAddress, CustHomePhone, CustBusPhone, CustCity, CustProv, CustCountry, CustEmail, CustPostal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      CustFirstName,
      CustLastName,
      CustAddress,
      CustHomePhone,
      CustBusPhone,
      CustCity,
      CustProv,
      CustCountry,
      CustEmail,
      CustPostal,
    ]
  );

  //return id of the inserted object
  console.log(result);
  return { id: result.insertId };
}
