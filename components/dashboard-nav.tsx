"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DashboardNav() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("beacon_logged_in")
    localStorage.removeItem("beacon_subscribed")
    localStorage.removeItem("beacon_user_email")
    localStorage.removeItem("beacon_user_name")
    router.push("/login")
  }

  const userEmail = localStorage.getItem("beacon_user_email") || "user@example.com"
  const userName = localStorage.getItem("beacon_user_name")
  const displayName = userName || userEmail

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1 className="text-lg font-mono font-bold tracking-tight">BEACON</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <div className="text-sm">
            <div className="text-muted-foreground">Signed in as:</div>
            <div className="font-mono text-foreground text-xs">{displayName}</div>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="font-mono text-xs border-border   cursor-pointer"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
