import { getPool } from "./database.js";

/* ---------------- CUSTOMERS ---------------- */

// Get all customers
export async function getCustomer() {
  const pool = await getPool();

  const result = await pool
    .request()
    .query(`SELECT * FROM customers`);

  return result.recordset;
}

// Get customer by ID
export async function getCustomerById(id) {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("id", id)
    .query(`
      SELECT *
      FROM customers
      WHERE CustomerId = @id
    `);

  return result.recordset[0] || null;
}

// Create a new customer
export async function createCustomer(customer) {
  const {
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
  } = customer;

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

  const existing = await pool
    .request()
    .input("CustEmail", CustEmail)
    .query(`SELECT CustomerId FROM customers WHERE CustEmail = @CustEmail`);

  if (existing.recordset.length > 0) {
    throw new Error("Customer with this email already exists");
  }

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

// Update customer
export async function updateCustomer(id, customer) {
  const {
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
  } = customer;

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

  const existing = await pool
    .request()
    .input("CustEmail", CustEmail)
    .input("CustomerId", id)
    .query(`
      SELECT CustomerId
      FROM customers
      WHERE CustEmail = @CustEmail AND CustomerId <> @CustomerId
    `);

  if (existing.recordset.length > 0) {
    throw new Error("Customer with this email already exists");
  }

  await pool
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
      UPDATE customers SET
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
      WHERE CustomerId = @CustomerId
    `);

  return { id };
}

// Minimal customer creation
export async function createCustomer2({
  CustFirstName,
  CustLastName,
  CustHomePhone,
  CustEmail,
}) {
  if (
    !CustFirstName?.trim() ||
    !CustLastName?.trim() ||
    !CustHomePhone?.trim() ||
    !CustEmail?.trim()
  ) {
    throw new Error("Please enter the required field");
  }

  const pool = await getPool();

  const existing = await pool
    .request()
    .input("CustEmail", CustEmail)
    .query(`SELECT CustomerId FROM customers WHERE CustEmail = @CustEmail`);

  if (existing.recordset.length > 0) {
    throw new Error("Customer with this email already exist");
  }

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

  return { id: result.recordset[0].CustomerId };
}
