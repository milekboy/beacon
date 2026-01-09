"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Hero from "@/components/hero"
import WhatItDoes from "@/components/what-it-does"
import HowItWorks from "@/components/how-it-works"
import SignalCard from "@/components/signal-card"
import BuiltFor from "@/components/built-for"
import Alerts from "@/components/alerts"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"

export default function Page() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("beacon_logged_in") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="relative z-10">
        <Hero isLoggedIn={isLoggedIn} />
        <WhatItDoes />
        <HowItWorks />
        <SignalCard />
        <BuiltFor />
        <Alerts />
        <FinalCTA isLoggedIn={isLoggedIn} />
      </main>
      <Footer />
    </div>
  )
}
