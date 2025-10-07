export default function AgencyList({ agencies, showActions = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* #3 add a fallback  */}
      {(agencies || []).map((agencies, AgencyId) => (
        <div
          key={agencies.AgencyId}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="text-xl font-semibold text-gray-900 mb-2">
            {agencies.AgncyCity}
          </div>
          <p className="text-gray-600 mb-1">
            <strong>Address</strong> {agencies.AgncyAddress}
            {agencies.AgncyCity}
            {agencies.AgncyProv}
            {agencies.AgncyPostal}
            {agencies.AgncyCountry}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Phone:</strong> {agencies.AgncyPhone}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Fax:</strong> {agencies.AgncyFax}
          </p>
        </div>
      ))}
    </div>
  );
}
