"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import NetworkInstance from "@/components/network/NetworkInstance"

export default function SubscribePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("beacon_logged_in") === "true"
    if (!loggedIn) {
      router.push("/login")
      return
    }
    setIsLoggedIn(true)
  }, [router])

  const handleSubscribe = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const api = NetworkInstance()
      const accessToken = localStorage.getItem("beacon_access_token")

      const response = await api.post("/paystack/initialize", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      console.log("Paystack Response:", response)
      console.log("Paystack Data:", response.data)

      // The endpoint returns the authorization URL as a string
      const authorizationUrl = response.data?.url


      if (authorizationUrl && typeof authorizationUrl === "string") {
        // Redirect user to Paystack payment page
        window.location.href = authorizationUrl
      } else {
        throw new Error("Invalid response from payment server")
      }
    } catch (err: unknown) {
      console.error("Subscription error:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize payment. Please try again."
      setError(errorMessage)
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return null
  }

  const userEmail = localStorage.getItem("beacon_user_email") || "user@example.com"

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-mono font-bold tracking-tight">BEACON</h1>
          <p className="text-muted-foreground text-sm mt-2">Polymarket Intelligence</p>
        </div>

        {/* Pricing Card */}
        <div className="border border-border rounded-lg p-8 bg-card/50 backdrop-blur">
          <h2 className="text-xl font-mono font-semibold mb-2">Beacon Access</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Real-time alerts for unusual, high-conviction Polymarket activity.
          </p>

          {/* Price */}
          <div className="mb-8">
            <span className="text-4xl font-mono font-bold">$20</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex items-start">
              <span className="text-accent mr-3">→</span>
              <span>Real-time signal detection</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3">→</span>
              <span>Browser push notifications</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3">→</span>
              <span>Access to Telegram Channel with live signals</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3">→</span>
              <span>Live dashboard access</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3">→</span>
              <span>Early-warning alerts</span>
            </li>
          </ul>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          {/* CTA Button */}
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-mono cursor-pointer"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>

          {/* Secondary Text */}
          <p className="text-center text-xs text-muted-foreground mt-6">Cancel anytime</p>
        </div>

        {/* User Info */}
        <p className="text-center text-sm text-muted-foreground mt-8">Logged in as {userEmail}</p>

        {/* Back button */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.back()}
            className="text-sm text-muted-foreground hover:text-foreground transition cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
