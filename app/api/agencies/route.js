import { getAgency } from "../../lib/agencies";

export async function GET(request) {
  try {
    const agency = await getAgency();
    return Response.json(agency);
  } catch (err) {
    console.error("Error fetching agency:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch agency data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
