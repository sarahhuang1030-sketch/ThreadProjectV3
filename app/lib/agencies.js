import { getPool } from "./database.js";

/* ---------------- AGENCIES ---------------- */

export async function getAgency() {
  const pool = await getPool();
  const result = await pool.request().query("SELECT * FROM Agencies");
  return result.recordset;
}

export async function getAgentsbyId1() {
  const pool = await getPool();
  const result = await pool
    .request()
    .query("SELECT * FROM agents WHERE AgencyId = 1");
  return result.recordset;
}

export async function getAgentsbyId2() {
  const pool = await getPool();
  const result = await pool
    .request()
    .query("SELECT * FROM agents WHERE AgencyId = 2");
  return result.recordset;
}

/* ---------------- CONTACT FORM ---------------- */

export async function createUser({ name, phone, email, message }) {
  if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
    throw new Error("Please enter the required field");
  }

  const pool = await getPool();

  const existing = await pool
    .request()
    .input("Email", email)
    .query("SELECT id FROM contact_messages WHERE email = @Email");

  if (existing.recordset.length > 0) {
    throw new Error("Customer with this email already exists");
  }

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

  return { id: insertResult.recordset[0].id };
}

/* ---------------- CUSTOMERS ---------------- */

export async function getCustomers() {
  const pool = await getPool();
  const result = await pool.request().query("SELECT * FROM customers");
  return result.recordset;
}

export async function createCustomers(data) {
  const {
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
  } = data;

  if (
    !CustFirstName?.trim() ||
    !CustLastName?.trim() ||
    !CustEmail?.trim() ||
    !CustHomePhone?.trim()
  ) {
    throw new Error("Please enter the required field");
  }

  const pool = await getPool();

  const existing = await pool
    .request()
    .input("CustEmail", CustEmail)
    .query("SELECT CustomerId FROM customers WHERE CustEmail = @CustEmail");

  if (existing.recordset.length > 0) {
    throw new Error("Customer with this email already exists");
  }

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

  return { id: insertResult.recordset[0].CustomerId };
}
