"use client"

import type React from "react"

import { BarChart, Calendar, MessageSquare, Scissors, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart },
  { name: "Staff", href: "/admin/staff", icon: Users },
  { name: "Schedule", href: "/admin/schedule", icon: Calendar },
  { name: "Services", href: "/admin/services", icon: Scissors },
  { name: "Notifications", href: "/admin/notifications", icon: MessageSquare },
  // { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen max-w-[1400px] mx-auto">
      <div className="hidden w-64 flex-col border-r bg-muted/50 lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <span className="font-semibold">Admin Dashboard</span>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

