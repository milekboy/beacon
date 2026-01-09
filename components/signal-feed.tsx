"use client"

import { useState, useEffect } from "react"

interface Signal {
  id: string
  market: string
  outcome: "YES" | "NO"
  freshness: string
  triggers: string[]
  oddsDetection: number
  oddsCurrent: number
  timestamp: string
}

const SAMPLE_SIGNALS: Signal[] = [
  {
    id: "1",
    market: "Will Bitcoin exceed $100k by Dec 31?",
    outcome: "YES",
    freshness: "2 min ago",
    triggers: ["Size anomaly", "Fresh wallet"],
    oddsDetection: 12,
    oddsCurrent: 27,
    timestamp: "2024-01-09 14:42:33 UTC",
  },
  {
    id: "2",
    market: "Will Trump be president on Jan 1, 2025?",
    outcome: "YES",
    freshness: "5 min ago",
    triggers: ["Cluster detected", "Repeated entries"],
    oddsDetection: 85,
    oddsCurrent: 88,
    timestamp: "2024-01-09 14:39:22 UTC",
  },
  {
    id: "3",
    market: "Will US inflation be below 3% by Q2?",
    outcome: "NO",
    freshness: "12 min ago",
    triggers: ["Fresh wallet", "Size anomaly"],
    oddsDetection: 42,
    oddsCurrent: 38,
    timestamp: "2024-01-09 14:30:15 UTC",
  },
]

export default function SignalFeed() {
  const [signals, setSignals] = useState<Signal[]>(SAMPLE_SIGNALS)
  const [newSignals, setNewSignals] = useState<string[]>([])
  const [isPushEnabled, setIsPushEnabled] = useState(true)

  // Simulate real-time signal streaming
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        // 40% chance of new signal every 4 seconds
        const newSignal: Signal = {
          id: Date.now().toString(),
          market: [
            "Will Bitcoin exceed $150k by end of 2025?",
            "Will Fed cut rates to below 4% by June?",
            "Will Ethereum overtake Bitcoin in market cap?",
            "Will crypto market cap exceed $3T by December?",
            "Will SEC approve Bitcoin ETF spot by March?",
          ][Math.floor(Math.random() * 5)],
          outcome: Math.random() > 0.5 ? "YES" : "NO",
          freshness: "NEW",
          triggers: [
            ["Fresh wallet", "Size anomaly"],
            ["Cluster detected"],
            ["Repeated entries", "Fresh wallet"],
            ["Size anomaly"],
          ][Math.floor(Math.random() * 4)],
          oddsDetection: Math.floor(Math.random() * 80) + 10,
          oddsCurrent: Math.floor(Math.random() * 80) + 10,
          timestamp: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }),
        }

        setSignals((prev) => [newSignal, ...prev])
        setNewSignals((prev) => [...prev, newSignal.id])

        // Remove highlight after 3 seconds
        setTimeout(() => {
          setNewSignals((prev) => prev.filter((id) => id !== newSignal.id))
        }, 3000)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-mono font-bold mb-2">Live Signals</h2>
        <p className="text-muted-foreground text-sm">Monitoring Polymarket in real time</p>
      </div>

      {/* Push Alerts Indicator */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isPushEnabled ? "bg-accent animate-pulse" : "bg-muted"}`} />
          <span className="text-muted-foreground">
            {isPushEnabled ? "Push alerts enabled" : "Push alerts disabled"}
          </span>
        </div>
      </div>

      {/* Signal Feed */}
      {signals.length === 0 ? (
        // Empty State
        <div className="border border-border rounded-lg p-12 bg-card/30 backdrop-blur text-center">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 border border-border rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            </div>
          </div>
          <h3 className="text-foreground font-mono mb-2">No active signals</h3>
          <p className="text-muted-foreground text-sm">Beacon is monitoring markets in real time</p>
        </div>
      ) : (
        <div className="space-y-3">
          {signals.map((signal) => (
            <div
              key={signal.id}
              className={`border rounded-lg p-6 backdrop-blur transition-all duration-300 ${
                newSignals.includes(signal.id)
                  ? "border-accent bg-card/80 shadow-lg shadow-accent/10"
                  : "border-border bg-card/30 hover:bg-card/50"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <h3 className="font-mono text-sm mb-3 leading-tight">{signal.market}</h3>

                  {/* Outcome Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs font-mono font-bold ${
                        signal.outcome === "YES"
                          ? "bg-green-900/30 text-green-400 border border-green-900/50"
                          : "bg-red-900/30 text-red-400 border border-red-900/50"
                      }`}
                    >
                      {signal.outcome}
                    </span>
                  </div>

                  {/* Trigger Tags */}
                  <div className="flex flex-wrap gap-2">
                    {signal.triggers.map((trigger, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-border text-muted-foreground rounded">
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col justify-between">
                  {/* Odds */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">ODDS AT DETECTION → CURRENT</div>
                    <div className="font-mono text-lg">
                      <span className="text-accent">{signal.oddsDetection}%</span>
                      <span className="text-muted-foreground mx-2">→</span>
                      <span className="text-foreground">{signal.oddsCurrent}%</span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-xs text-muted-foreground">{signal.timestamp}</div>
                    <span
                      className={`text-xs px-2 py-1 rounded font-mono ${
                        signal.freshness === "NEW"
                          ? "bg-accent/20 text-accent animate-pulse"
                          : "bg-border text-muted-foreground"
                      }`}
                    >
                      {signal.freshness}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
