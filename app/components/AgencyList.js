import Image from "next/image";

let image = [{ picture: "/agency/1.jpg" }, { picture: "/agency/2.jpg" }];

export default function AgencyList({ agencies = [], showActions = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agencies.map((agency) => {
        const imageIndex =
          agency.AgencyId === 1 ? 0 : agency.AgencyId === 2 ? 1 : null;
        const imageSrc =
          imageIndex !== null
            ? image[imageIndex].picture
            : "/default-agency.jpg";

        return (
          <div
            key={agency.AgencyId}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <Image
              src={imageSrc}
              width={200}
              height={150}
              alt={`Agency ${agency.AgncyCity}`}
              className="rounded-md object-cover mb-4"
            />
            <div className="text-xl font-semibold text-gray-900 mb-2">
              {agency.AgncyCity}
            </div>
            <p className="text-gray-600 mb-1">
              <strong>Address:</strong> {agency.AgncyAddress},{" "}
              {agency.AgncyCity}, {agency.AgncyProv}, {agency.AgncyPostal},{" "}
              {agency.AgncyCountry}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Phone:</strong> {agency.AgncyPhone}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Fax:</strong> {agency.AgncyFax}
            </p>
          </div>
        );
      })}
    </div>
  );
}
