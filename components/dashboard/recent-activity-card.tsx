export default function RecentActivityCard() {
  const activities = [
    {
      id: 1,
      action: "Created benchmark",
      target: "Software Engineer",
      time: "10 minutes ago",
      user: "You",
    },
    {
      id: 2,
      action: "Generated report",
      target: "Q2 Salary Trends",
      time: "2 hours ago",
      user: "You",
    },
    {
      id: 3,
      action: "Added team member",
      target: "Sarah Thompson",
      time: "Yesterday",
      user: "You",
    },
    {
      id: 4,
      action: "Updated benchmark",
      target: "Product Manager",
      time: "2 days ago",
      user: "Michael Chen",
    },
    {
      id: 5,
      action: "Commented on",
      target: "Marketing Specialist benchmark",
      time: "3 days ago",
      user: "Lisa Wong",
    },
  ]

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm font-medium text-[#182654] hover:text-[#182654]/80">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
              {activity.user === "You" ? "Y" : activity.user.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
