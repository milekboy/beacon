"use client"

import { useState, useEffect } from "react"
import {
  fetchNotificationHistory,
  connectNotificationWebSocket,
  formatRelativeTime,
  formatUSD,
  type ParsedNotification,
} from "@/lib/notification-service"

// Visual theme configuration for different notification types
const NOTIFICATION_THEMES = {
  LARGE_TRADE: {
    border: "border-accent",
    bg: "bg-accent/5",
    shadow: "shadow-accent/20",
    glow: "shadow-lg shadow-accent/30",
    badge: "bg-accent/20 text-accent",
    icon: "🔥",
    label: "Large Trade",
    pulse: true,
  },
  CLUSTER: {
    border: "border-amber-500/50",
    bg: "bg-amber-500/5",
    shadow: "shadow-amber-500/20",
    glow: "shadow-md shadow-amber-500/20",
    badge: "bg-amber-500/20 text-amber-400",
    icon: "⚡",
    label: "Cluster",
    pulse: false,
  },
  MARKET_OPEN: {
    border: "border-blue-500/50",
    bg: "bg-blue-500/5",
    shadow: "shadow-blue-500/10",
    glow: "",
    badge: "bg-blue-500/20 text-blue-400",
    icon: "📈",
    label: "Market Open",
    pulse: false,
  },
  MARKET_CLOSE: {
    border: "border-slate-500/30",
    bg: "bg-slate-500/5",
    shadow: "",
    glow: "",
    badge: "bg-slate-500/20 text-slate-400",
    icon: "📊",
    label: "Market Close",
    pulse: false,
  },
}

export default function SignalFeed() {
  const [notifications, setNotifications] = useState<ParsedNotification[]>([])
  const [newNotifications, setNewNotifications] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)

  // Load notification history on mount
  useEffect(() => {
    async function loadHistory() {
      setIsLoading(true)
      const history = await fetchNotificationHistory()
      setNotifications(history)
      setIsLoading(false)
    }

    loadHistory()
  }, [])

  // Connect to WebSocket for real-time updates
  useEffect(() => {
    const ws = connectNotificationWebSocket((notification) => {
      // Add new notification to the top
      setNotifications((prev) => [notification, ...prev])
      setNewNotifications((prev) => [...prev, notification.id])

      // Remove highlight after 3 seconds
      setTimeout(() => {
        setNewNotifications((prev) => prev.filter((id) => id !== notification.id))
      }, 3000)
    })

    if (ws) {
      setIsConnected(true)

      return () => {
        ws.close()
        setIsConnected(false)
      }
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-mono font-bold mb-2">Live Signals</h2>
        <p className="text-muted-foreground text-sm">Monitoring Polymarket in real time</p>
      </div>

      {/* Connection Status */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-accent animate-pulse" : "bg-muted"}`} />
          <span className="text-muted-foreground">
            {isConnected ? "Live updates enabled" : "Connecting..."}
          </span>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="border border-border rounded-lg p-12 bg-card/30 backdrop-blur text-center">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 border border-border rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            </div>
          </div>
          <h3 className="text-foreground font-mono mb-2">Loading signals</h3>
          <p className="text-muted-foreground text-sm">Fetching notification history...</p>
        </div>
      ) : notifications.length === 0 ? (
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
          {notifications.map((notification) => {
            const theme = NOTIFICATION_THEMES[notification.type]
            const isNew = newNotifications.includes(notification.id)

            return (
              <div
                key={notification.id}
                className={`border rounded-lg p-6 backdrop-blur transition-all duration-300 ${isNew
                    ? `${theme.border} ${theme.bg} ${theme.glow}`
                    : `${theme.border} ${theme.bg} hover:bg-card/50 ${theme.shadow}`
                  } ${theme.pulse && isNew ? 'animate-pulse' : ''}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div>
                    {/* Notification Type Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{theme.icon}</span>
                      <span className={`text-xs px-2 py-1 rounded font-mono font-bold ${theme.badge}`}>
                        {theme.label}
                      </span>
                      {isNew && (
                        <span className="text-xs px-2 py-1 rounded font-mono bg-accent/20 text-accent animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Market Title */}
                    <h3 className="font-mono text-sm mb-3 leading-tight">
                      {notification.data.market_title}
                    </h3>

                    {/* Message */}
                    <p className="text-xs text-muted-foreground mb-3">
                      {notification.message}
                    </p>

                    {/* Outcome Badge */}
                    <div className="mb-2">
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-mono font-bold ${notification.data.outcome === "BUY"
                            ? "bg-green-900/30 text-green-400 border border-green-900/50"
                            : "bg-red-900/30 text-red-400 border border-red-900/50"
                          }`}
                      >
                        {notification.data.outcome}
                      </span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col justify-between">
                    {/* Trade Amount */}
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">TRADE AMOUNT</div>
                      <div className="font-mono text-2xl text-accent mb-4">
                        {formatUSD(notification.data.amount_usd)}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Detected</span>
                        <span className="text-xs font-mono text-foreground">
                          {formatRelativeTime(notification.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Trade Time</span>
                        <span className="text-xs font-mono text-foreground">
                          {new Date(notification.data.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
