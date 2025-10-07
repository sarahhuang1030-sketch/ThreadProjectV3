export default function AgentsList({ agents = [], showActions = false }) {
  // Group agents by AgencyId
  const grouped = agents.reduce((acc, agent) => {
    const key = agent.AgencyId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(agent);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([agencyId, agentList]) => (
        <div key={agencyId}>
          {/* <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Agency {agencyId}
          </h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentList.map((agent) => (
              <div
                key={agent.AgtEmail}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {agent.AgtFirstName} {agent.AgtLastName}
                </div>
                <p className="text-gray-600 mb-1">
                  <strong>Phone:</strong> {agent.AgtBusPhone}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Email:</strong> {agent.AgtEmail}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Position:</strong> {agent.AgtPosition}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
