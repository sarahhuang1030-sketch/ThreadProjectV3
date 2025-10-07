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
