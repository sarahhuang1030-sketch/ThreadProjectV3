import db from "./database.js";
//get all customers

export async function getCustomer() {
  try {
    const [customers] = await db.query("SELECT * FROM customers");
    // return all customers (array)
    return customers;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
  n;
}
//get customer by id
export async function getCustomerById(id) {
  try {
    // Use a parameterized query to fetch by id
    const [customers] = await db.query(
      "SELECT * FROM customers WHERE CustomerId = ?",
      [id]
    );
    if (!customers || customers.length === 0) return null;
    return customers[0];
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
  //check if name and email are undefined
  //these are required fields
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
  )
    throw new Error("Please enter the required field");
  //check if the email is unique
  const [existing] = await db.query(
    "SELECT CustomerId FROM customers where CustEmail = ?",
    [CustEmail]
  );
  if (existing.length > 0)
    throw new Error("Customer with this email already exist");
  //otherwise store new user
  const result = await db.query(
    "Insert into customers (CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail) values(?,?,?,?,?,?,?,?,?,?)",
    [
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
    ]
  );
  //return id of the inserted object
  console.log(result);
  return { id: result.insertid };
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
  //check if name and email are undefined
  //these are required fields
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
  )
    throw new Error("Please enter the required field");
  //check if the email is unique
  const [existing] = await db.query(
    "SELECT CustomerId FROM customers where CustEmail = ? AND CustomerId <> ?",
    [CustEmail, id]
  );
  if (existing.length > 0)
    throw new Error("Customer with this email already exist");
  //otherwise update user
  const result = await db.query(
    "Update customers set CustFirstName=?, CustLastName=?, CustAddress=?, CustCity=?, CustProv=?, CustPostal=?, CustCountry=?, CustHomePhone=?, CustBusPhone=?, CustEmail=? where CustomerId=?",

    [
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
      id,
    ]
  );
  //return id of the updated object
  console.log(result);

  return { id: result.insertid };
}

export async function createCustomer2({
  CustFirstName,
  CustLastName,

  CustHomePhone,

  CustEmail,
}) {
  //check if name and email are undefined
  //these are required fields
  if (
    !CustFirstName?.trim() ||
    !CustLastName?.trim() ||
    !CustHomePhone?.trim() ||
    !CustEmail?.trim()
  )
    throw new Error("Please enter the required field");
  //check if the email is unique
  const [existing] = await db.query(
    "SELECT CustomerId FROM customers where CustEmail = ?",
    [CustEmail]
  );
  if (existing.length > 0)
    throw new Error("Customer with this email already exist");
  //otherwise store new user
  const result = await db.query(
    "Insert into customers (CustFirstName, CustLastName,  CustHomePhone, CustEmail) values(?,?,?,?)",
    [CustFirstName, CustLastName, CustHomePhone, CustEmail]
  );
  //return id of the inserted object
  console.log(result);
  return { id: result.insertid };
}
