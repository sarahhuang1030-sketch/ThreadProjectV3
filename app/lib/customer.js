import {getPool } from "./database.js";
//get all customers

export async function getCustomer() {
  try {
    const pool = await getPool();
    if (!pool) {
  return []; // ✅ prevents crash
}
    const customers = await pool.request().query(`SELECT * FROM customers`);
    // return all customers (array)
    return customers.recordset;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
}
//get customer by id
export async function getCustomerById(id) {
  try {
    const pool = await getPool();
if (!pool) {
  return []; // ✅ prevents crash
}
    const result = await pool
      .request()
      .input("id", id)
      .query(`
        SELECT *
        FROM customers
        WHERE CustomerId = @id
      `);

    if (result.recordset.length === 0) return null;

    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching customer by id:", error);
    throw error;
  }
}
//create a new customer
export async function createCustomer({
  CustFirstName,
  CustLastName,
  CustAddress,
  CustCity,
  CustProv,
  CustPostal,
  CustCountry,
  CustHomePhone,
  CustBusPhone,
  CustEmail,
}) {
  // Required fields validation
  if (
    !CustFirstName?.trim() ||
    !CustLastName?.trim() ||
    !CustAddress?.trim() ||
    !CustCity?.trim() ||
    !CustProv?.trim() ||
    !CustPostal?.trim() ||
    !CustCountry?.trim() ||
    !CustHomePhone?.trim() ||
    !CustBusPhone?.trim() ||
    !CustEmail?.trim()
  ) {
    throw new Error("Please enter the required field");
  }

  const pool = await getPool();
if (!pool) {
  return []; // ✅ prevents crash
}
  // Check if email already exists
  const existingEmail = await pool
    .request()
    .input("CustEmail", CustEmail)
    .query(
      `SELECT CustomerId FROM customers WHERE CustEmail = @CustEmail`
    );

  if (existingEmail.recordset.length > 0) {
    throw new Error("Customer with this email already exists");
  }

  // Insert customer & return new ID
  const result = await pool
    .request()
    .input("CustFirstName", CustFirstName)
    .input("CustLastName", CustLastName)
    .input("CustAddress", CustAddress)
    .input("CustCity", CustCity)
    .input("CustProv", CustProv)
    .input("CustPostal", CustPostal)
    .input("CustCountry", CustCountry)
    .input("CustHomePhone", CustHomePhone)
    .input("CustBusPhone", CustBusPhone)
    .input("CustEmail", CustEmail)
    .query(`
      INSERT INTO customers (
        CustFirstName, CustLastName, CustAddress, CustCity, CustProv,
        CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail
      )
      OUTPUT INSERTED.CustomerId
      VALUES (
        @CustFirstName, @CustLastName, @CustAddress, @CustCity, @CustProv,
        @CustPostal, @CustCountry, @CustHomePhone, @CustBusPhone, @CustEmail
      );
    `);

  return { id: result.recordset[0].CustomerId };
}
//update customer
export async function updateCustomer(
  id,
  {
    CustFirstName,
    CustLastName,
    CustAddress,
    CustCity,
    CustProv,
    CustPostal,
    CustCountry,
    CustHomePhone,
    CustBusPhone,
    CustEmail,
  }
) {
  // Validate required fields
  if (
    !CustFirstName?.trim() ||
    !CustLastName?.trim() ||
    !CustAddress?.trim() ||
    !CustCity?.trim() ||
    !CustProv?.trim() ||
    !CustPostal?.trim() ||
    !CustCountry?.trim() ||
    !CustHomePhone?.trim() ||
    !CustBusPhone?.trim() ||
    !CustEmail?.trim()
  ) {
    throw new Error("Please enter the required field");
  }

  const pool = await getPool();
if (!pool) {
  return []; // ✅ prevents crash
}
  // Check if email is used by another customer
  const existingEmail = await pool
    .request()
    .input("CustEmail", CustEmail)
    .input("CustomerId", id)
    .query(`
      SELECT CustomerId 
      FROM customers 
      WHERE CustEmail = @CustEmail AND CustomerId <> @CustomerId
    `);

  if (existingEmail.recordset.length > 0) {
    throw new Error("Customer with this email already exists");
  }

  // Perform update
  const result = await pool
    .request()
    .input("CustFirstName", CustFirstName)
    .input("CustLastName", CustLastName)
    .input("CustAddress", CustAddress)
    .input("CustCity", CustCity)
    .input("CustProv", CustProv)
    .input("CustPostal", CustPostal)
    .input("CustCountry", CustCountry)
    .input("CustHomePhone", CustHomePhone)
    .input("CustBusPhone", CustBusPhone)
    .input("CustEmail", CustEmail)
    .input("CustomerId", id)
    .query(`
      UPDATE customers
      SET
        CustFirstName = @CustFirstName,
        CustLastName = @CustLastName,
        CustAddress = @CustAddress,
        CustCity = @CustCity,
        CustProv = @CustProv,
        CustPostal = @CustPostal,
        CustCountry = @CustCountry,
        CustHomePhone = @CustHomePhone,
        CustBusPhone = @CustBusPhone,
        CustEmail = @CustEmail
      WHERE CustomerId = @CustomerId;
    `);

  return { id }; // return updated ID
}

export async function createCustomer2({
  CustFirstName,
  CustLastName,
  CustHomePhone,
  CustEmail,
}) {
  // Validate required fields
  if (
    !CustFirstName?.trim() ||
    !CustLastName?.trim() ||
    !CustHomePhone?.trim() ||
    !CustEmail?.trim()
  ) {
    throw new Error("Please enter the required field");
  }

  const pool = await getPool();
if (!pool) {
  return []; // ✅ prevents crash
}
  // Check if email already exists
  const existing = await pool
    .request()
    .input("CustEmail", CustEmail)
    .query(`
      SELECT CustomerId 
      FROM customers 
      WHERE CustEmail = @CustEmail
    `);

  if (existing.recordset.length > 0) {
    throw new Error("Customer with this email already exist");
  }

  // Insert new customer
  const result = await pool
    .request()
    .input("CustFirstName", CustFirstName)
    .input("CustLastName", CustLastName)
    .input("CustHomePhone", CustHomePhone)
    .input("CustEmail", CustEmail)
    .query(`
      INSERT INTO customers (
        CustFirstName, 
        CustLastName,  
        CustHomePhone, 
        CustEmail
      )
      OUTPUT INSERTED.CustomerId
      VALUES (
        @CustFirstName, 
        @CustLastName,  
        @CustHomePhone, 
        @CustEmail
      );
    `);

  // Return inserted ID
  return { id: result.recordset[0].CustomerId };
}
