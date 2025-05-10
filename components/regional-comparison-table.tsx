interface RegionalComparisonTableProps {
  role: string
  currentLocation: string
}

export default function RegionalComparisonTable({ role, currentLocation }: RegionalComparisonTableProps) {
  // Generate comparison data based on role and current location
  // In a real app, this would come from an API
  const baseValue =
    role.includes("Engineer") || role.includes("Developer")
      ? 120000
      : role.includes("Manager")
        ? 140000
        : role.includes("Director")
          ? 180000
          : 90000

  const locations = [
    { name: "San Francisco, CA", multiplier: 1.25, costOfLiving: "High" },
    { name: "New York, NY", multiplier: 1.2, costOfLiving: "High" },
    { name: "Seattle, WA", multiplier: 1.15, costOfLiving: "High" },
    { name: "Boston, MA", multiplier: 1.1, costOfLiving: "High" },
    { name: "Austin, TX", multiplier: 1.0, costOfLiving: "Medium" },
    { name: "Chicago, IL", multiplier: 1.05, costOfLiving: "Medium" },
    { name: "Denver, CO", multiplier: 1.0, costOfLiving: "Medium" },
    { name: "Atlanta, GA", multiplier: 0.95, costOfLiving: "Medium" },
    { name: "Dallas, TX", multiplier: 0.95, costOfLiving: "Medium" },
    { name: "Remote", multiplier: 0.9, costOfLiving: "Varies" },
  ]

  // Format salary
  const formatSalary = (value: number) => {
    return `$${value.toLocaleString()}`
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Median Salary
            </th>
            <th scope="col" className="px-6 py-3">
              Salary Range
            </th>
            <th scope="col" className="px-6 py-3">
              Cost of Living
            </th>
            <th scope="col" className="px-6 py-3">
              Adjusted Value
            </th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => {
            const medianSalary = Math.round(baseValue * location.multiplier)
            const minSalary = Math.round(medianSalary * 0.85)
            const maxSalary = Math.round(medianSalary * 1.15)

            // Calculate cost-of-living adjusted value
            // Using San Francisco as baseline (highest cost of living)
            const sfMultiplier = 1.25
            const adjustedValue = Math.round((medianSalary / location.multiplier) * sfMultiplier)

            return (
              <tr
                key={location.name}
                className={`border-b ${location.name === currentLocation ? "bg-blue-50" : "bg-white"} hover:bg-gray-50`}
              >
                <td className="px-6 py-4 font-medium">
                  {location.name}
                  {location.name === currentLocation && (
                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">Current</span>
                  )}
                </td>
                <td className="px-6 py-4">{formatSalary(medianSalary)}</td>
                <td className="px-6 py-4">
                  {formatSalary(minSalary)} - {formatSalary(maxSalary)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      location.costOfLiving === "High"
                        ? "bg-red-100 text-red-800"
                        : location.costOfLiving === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {location.costOfLiving}
                  </span>
                </td>
                <td className="px-6 py-4">{formatSalary(adjustedValue)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-gray-500">
        <p>
          <strong>Adjusted Value:</strong> Salary adjusted for cost of living differences, using San Francisco as the
          baseline. This represents the equivalent purchasing power across locations.
        </p>
      </div>
    </div>
  )
}
