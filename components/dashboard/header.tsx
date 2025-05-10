"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Menu, Search, X } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export default function DashboardHeader({ onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New benchmark data available",
      description: "Software Engineer salaries updated for San Francisco",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Report generated",
      description: "Your custom report for Marketing roles is ready",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Team member joined",
      description: "Sarah Thompson accepted your invitation",
      time: "Yesterday",
      read: true,
    },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Search */}
          <div className="ml-4 hidden md:block">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search benchmarks..."
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
              />
            </div>
          </div>

          {/* Mobile search toggle */}
          <button
            type="button"
            className="ml-2 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
          </button>
        </div>

        <div className="flex items-center">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
              onClick={toggleNotifications}
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-md border border-gray-200 bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  <button
                    type="button"
                    className="text-xs font-medium text-[#182654] hover:text-[#182654]/80"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-gray-500">No notifications</div>
                  ) : (
                    <ul>
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className={`border-b border-gray-100 p-4 last:border-0 ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.description}</p>
                              <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                            </div>
                            {!notification.read && <div className="ml-2 h-2 w-2 rounded-full bg-blue-500"></div>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="border-t border-gray-200 p-2 text-center">
                  <Link
                    href="#"
                    className="block rounded-md px-4 py-2 text-sm font-medium text-[#182654] hover:bg-gray-50"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User menu - simplified for this example */}
          <div className="ml-4">
            <button className="flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#31E2EF] focus:ring-offset-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#182654] text-white">
                <span className="text-sm font-medium">A</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search - expanded */}
      {isSearchOpen && (
        <div className="border-b border-gray-200 bg-white p-4 md:hidden">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search benchmarks..."
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-[#31E2EF] focus:outline-none focus:ring-1 focus:ring-[#31E2EF]"
            />
          </div>
        </div>
      )}
    </header>
  )
}
