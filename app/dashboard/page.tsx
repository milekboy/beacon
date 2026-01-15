"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard-nav"
import SignalFeed from "@/components/signal-feed"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem("beacon_logged_in") === "true"
    const plan = localStorage.getItem("beacon_payment_plan")
    const subscribed = plan === "premium"

    if (!loggedIn) {
      router.push("/login")
      return
    }

    if (!subscribed) {
      router.push("/subscribe")
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [router])


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground font-mono">initializing beacon...</div>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <DashboardNav />
      <main className="flex-1 overflow-auto">
        <SignalFeed />
      </main>
    </div>
  )
}
