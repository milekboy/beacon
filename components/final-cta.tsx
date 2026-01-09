"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FinalCTAProps {
  isLoggedIn?: boolean
}

export default function FinalCTA({ isLoggedIn = false }: FinalCTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold mb-4">Get Early Access</h2>
          <p className="text-lg text-muted-foreground">
            Be the first to see informed Polymarket activity before odds move.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
            <Button className="bg-accent cursor-pointer text-background hover:bg-accent/90 font-mono text-base h-12" size="lg">
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground font-mono">Monthly subscription. Cancel anytime.</p>
      </div>
    </section>
  )
}
