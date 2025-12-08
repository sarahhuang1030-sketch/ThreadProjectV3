import {getPool } from "./database.js";



export async function getAgency() {
  try {
    //for SQL
    // const [agencies] = await db.query("SELECT * FROM agencies");
     // return agencies;

     //this is for Azure
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Agencies");
    return result.recordset; // THIS is your rows array
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
}

export async function getAgentsbyId1() {
  try {
    //for SQL
    // const [agents] = await db.query("SELECT * FROM agents WHERE AgencyId =1");
     // return agents;

     //This is for Azure
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM agents WHERE AgencyId =1");

    return result.recordset;
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
}

export async function getAgentsbyId2() {
  try {
    // const [agents] = await db.query("SELECT * FROM agents WHERE AgencyId =2");
    // return agents;
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM agents WHERE AgencyId =2");

    return result.recordset;
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
}
//this is for the contact form
export async function createUser({ name, phone, email, message }) {
  
  const pool = await getPool();
  //check if name and email are undefined
  //these are required fields
  if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim())
    throw new Error("Please enter the required field");
    
  //check if the email is unique
  const existingResult = await pool.request().input("Email",email)
  .query("SELECT id FROM contact_messages where email = @Email");

  if (existingResult.length > 0)
    throw new Error("Customer with this email already exist");

  //otherwise store new user
    const insertResult = await pool
    .request()
    .input("Name", name)
    .input("Phone", phone)
    .input("Email", email)
    .input("Message", message)
    .query(`
      INSERT INTO contact_messages (name, phone, email, message)
      OUTPUT INSERTED.id
      VALUES (@Name, @Phone, @Email, @Message)
    `);
  //return id of the inserted object
  // console.log(result);
  // return { id: result.insertid };
    return { id: insertResult.recordset[0].id };
}

export async function getCustomers() {
  
    try {
    const pool = await getPool();

    const result = await pool
      .request()
      .query("SELECT * FROM customers");

    return result.recordset;   // this is your array of customers
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
  
  // Required validation
  if (
    !CustFirstName?.trim() ||
    !CustLastName?.trim() ||
    !CustEmail?.trim() ||
    !CustHomePhone?.trim()
  ) {
    throw new Error("Please enter the required field");
  }

  const pool = await getPool();

  // CHECK IF EMAIL ALREADY EXISTS
  const existing = await pool
    .request()
    .input("CustEmail", CustEmail)
    .query("SELECT CustomerId FROM customers WHERE CustEmail = @CustEmail");

  if (existing.recordset.length > 0) {
    throw new Error("Customer with this email already exists");
  }

  // INSERT NEW CUSTOMER & RETURN ID
  const insertResult = await pool
    .request()
    .input("CustFirstName", CustFirstName)
    .input("CustLastName", CustLastName)
    .input("CustAddress", CustAddress)
    .input("CustHomePhone", CustHomePhone)
    .input("CustBusPhone", CustBusPhone)
    .input("CustCity", CustCity)
    .input("CustProv", CustProv)
    .input("CustCountry", CustCountry)
    .input("CustEmail", CustEmail)
    .input("CustPostal", CustPostal)
    .query(`
      INSERT INTO customers (
        CustFirstName, CustLastName, CustAddress, CustHomePhone, CustBusPhone,
        CustCity, CustProv, CustCountry, CustEmail, CustPostal
      )
      OUTPUT INSERTED.CustomerId
      VALUES (
        @CustFirstName, @CustLastName, @CustAddress, @CustHomePhone, @CustBusPhone,
        @CustCity, @CustProv, @CustCountry, @CustEmail, @CustPostal
      )
    `);

  // Get the inserted ID
  return { id: insertResult.recordset[0].CustomerId };
}
