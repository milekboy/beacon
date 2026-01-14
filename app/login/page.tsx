"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NetworkInstance from "@/components/network/NetworkInstance"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const api = NetworkInstance()

      // Create form data - FastAPI OAuth2 expects form-urlencoded data
      const formData = new URLSearchParams()
      formData.append("username", email)
      formData.append("password", password)

      const response = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      const { access_token, user } = response.data

      // Store login state and token
      localStorage.setItem("beacon_logged_in", "true")
      localStorage.setItem("beacon_user_email", user.email)
      localStorage.setItem("beacon_access_token", access_token)
      localStorage.setItem("beacon_user_name", user.name)
      localStorage.setItem("beacon_payment_plan", user.payment_plan)

      // Route based on payment plan
      if (user.payment_plan === "freemium") {
        router.push("/subscribe")
      } else {
        router.push("/dashboard")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to login. Please check your credentials."
      )
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-mono font-bold tracking-tight">BEACON</h1>
          <p className="text-muted-foreground text-sm mt-2">Polymarket Intelligence</p>
        </div>

        {/* Login Form */}
        <div className="border border-border rounded-lg p-8 bg-card/50 backdrop-blur">
          <h2 className="text-xl font-mono font-semibold mb-6">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm text-muted-foreground block mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-input border border-border rounded text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm text-muted-foreground block mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-input border border-border rounded text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded px-4 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90 font-mono cursor-pointer"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>

        {/* Back to landing */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition cursor-pointer">
            Back to Beacon
          </Link>
        </div>
      </div>
    </div>
  )
}
