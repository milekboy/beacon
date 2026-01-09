"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroProps {
  isLoggedIn?: boolean
}

export default function Hero({ isLoggedIn = false }: HeroProps) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="space-y-6">
            <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              See Informed <span className="text-accent">Polymarket</span> Activity <br />
              Before Odds Move
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Real-time detection of unusual, high-conviction trading activity. Get alerts before the market moves.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
                <Button className="bg-accent text-background cursor-pointer hover:bg-accent/90 font-mono" size="lg">
                  {isLoggedIn ? "Go to Dashboard" : "Get Started"}
                </Button>
              </Link>
              {!isLoggedIn && (
                <Link href="/login">
                  <Button variant="outline" className="font-mono bg-transparent" size="lg">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="lg:flex items-center justify-center hidden">
            <div className="glow-cyan w-full max-w-sm h-64 rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">SIGNAL</span>
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded font-mono">FRESH</span>
              </div>
              <div className="space-y-3">
                <p className="text-foreground font-mono">Will Bitcoin exceed $100k by Dec 31?</p>
                <p className="text-sm text-accent font-mono">YES - 67% → 71%</p>
                <div className="space-y-2 text-xs text-muted-foreground font-mono">
                  <p>• Fresh wallet: $50k</p>
                  <p>• Repeated entries: 3x</p>
                  <p>• Market anomaly detected</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-mono pt-2">Detected 2 min ago</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
