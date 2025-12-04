import ContactMap from "../components/ContactMap";
import { getAgency } from "../lib/agencies";

export default async function IframePage() {
  console.log("Agencies from getAgency:", agencies);

  const agencies = await getAgency(); // should return an array
  return <ContactMap agencies={agencies ?? []} />;
}
