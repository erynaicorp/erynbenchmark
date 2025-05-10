"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart2,
  Search,
  PieChart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
}

export default function DashboardSidebar({ isOpen }: SidebarProps) {
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>("benchmarks")

  const toggleSubMenu = (menu: string) => {
    if (expandedSubMenu === menu) {
      setExpandedSubMenu(null)
    } else {
      setExpandedSubMenu(menu)
    }
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-4">
        <div className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FNqZaBmsvQivyiPfCeOKaxOANsN8QB.png"
            alt="Eryn Logo"
            width={40}
            height={40}
            className="h-8 w-auto"
          />
          <span className="ml-2 text-xl font-semibold text-gray-900">eryn</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                activeMenu === "dashboard"
                  ? "bg-[#182654] text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveMenu("dashboard")}
            >
              <BarChart2 className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
          </li>

          <li>
            <button
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
                expandedSubMenu === "benchmarks"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => toggleSubMenu("benchmarks")}
            >
              <div className="flex items-center">
                <Search className="mr-3 h-5 w-5" />
                Benchmarks
              </div>
              {expandedSubMenu === "benchmarks" ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {expandedSubMenu === "benchmarks" && (
              <ul className="mt-1 space-y-1 pl-10">
                <li>
                  <Link
                    href="/jobs"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Saved
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Recent
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
                expandedSubMenu === "reports"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => toggleSubMenu("reports")}
            >
              <div className="flex items-center">
                <PieChart className="mr-3 h-5 w-5" />
                Reports
              </div>
              {expandedSubMenu === "reports" ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {expandedSubMenu === "reports" && (
              <ul className="mt-1 space-y-1 pl-10">
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Salary Trends
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Industry Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Custom Reports
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              href="#"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                activeMenu === "team"
                  ? "bg-[#182654] text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveMenu("team")}
            >
              <Users className="mr-3 h-5 w-5" />
              Team
            </Link>
          </li>
        </ul>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Settings</h3>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <Settings className="mr-3 h-5 w-5" />
                Account Settings
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Help & Support
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#182654] text-white">
            <span className="text-sm font-medium">A</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
            <p className="text-xs text-gray-500">alex@example.com</p>
          </div>
          <Link href="/" className="ml-auto text-gray-400 hover:text-gray-500">
            <LogOut className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
