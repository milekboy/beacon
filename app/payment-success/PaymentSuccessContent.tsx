"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isInitializing, setIsInitializing] = useState(true)

    const reference = searchParams.get("reference")
    const trxref = searchParams.get("trxref")
    const transactionRef = reference || trxref

    useEffect(() => {
        const loggedIn = localStorage.getItem("beacon_logged_in") === "true"

        if (!loggedIn) {
            router.push("/login")
            return
        }

        // Mark user as subscribed
        localStorage.setItem("beacon_subscribed", "true")

        // Small delay for smooth UX
        setTimeout(() => {
            setIsInitializing(false)
        }, 500)
    }, [router])

    if (isInitializing) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="text-muted-foreground font-mono text-sm">verifying payment...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Success Icon */}
                <div className="text-center mb-12">
                    <div className="mb-8 flex justify-center">
                        <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center bg-accent/10">
                            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl font-mono font-bold tracking-tight mb-4">Payment Successful</h1>
                    <p className="text-muted-foreground text-sm">Your Beacon subscription is now active.</p>
                </div>

                {/* Transaction Reference (optional) */}
                {transactionRef && (
                    <div className="mb-8 p-4 bg-card/50 border border-border rounded-lg backdrop-blur">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Transaction Reference</p>
                        <p className="text-sm font-mono text-foreground break-all">{transactionRef}</p>
                    </div>
                )}

                {/* Primary CTA */}
                <Button
                    onClick={() => router.push("/dashboard")}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-mono cursor-pointer mb-6"
                >
                    Go to Dashboard
                </Button>

                {/* Secondary Note */}
                <p className="text-center text-xs text-muted-foreground">
                    You now have full access to real-time Beacon signals.
                </p>
            </div>
        </div>
    )
}
