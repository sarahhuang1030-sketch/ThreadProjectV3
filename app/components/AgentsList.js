import Image from "next/image";

let image1 = [
  { picture: "/agents/1.jpg" },
  { picture: "/agents/2.jpg" },
  { picture: "/agents/3.jpg" },
  { picture: "/agents/4.jpg" },
  { picture: "/agents/5.jpg" },
  { picture: "/agents/6.jpg" },
  { picture: "/agents/7.jpg" },
  { picture: "/agents/8.jpg" },
];

let image2 = [
  { picture: "/agents/9.jpg" },
  { picture: "/agents/10.jpg" },
  { picture: "/agents/11.jpg" },
  { picture: "/agents/12.jpg" },
  { picture: "/agents/13.jpg" },
  { picture: "/agents/14.jpg" },
  { picture: "/agents/15.jpg" },
  { picture: "/agents/16.jpg" },
];

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
            {agentList.map((agent, index) => {
              const selectedImages =
                agent.AgencyId === 1
                  ? image1
                  : agent.AgencyId === 2
                  ? image2
                  : [];

              return (
                <div
                  key={agent.AgtEmail}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      width={96}
                      height={96}
                      src={
                        selectedImages[index % selectedImages.length]
                          ?.picture || "/default-avatar.png"
                      }
                      alt={`${agent.AgtFirstName} ${agent.AgtLastName}`}
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                    <div className="text-xl font-semibold text-gray-900 mb-2">
                      {agent.AgtFirstName} {agent.AgtLastName}
                    </div>
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
