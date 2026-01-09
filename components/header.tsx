"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeaderProps {
  isLoggedIn?: boolean
  setIsLoggedIn?: (value: boolean) => void
}

export default function Header({ isLoggedIn = false, setIsLoggedIn }: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("beacon_logged_in")
    localStorage.removeItem("beacon_subscribed")
    localStorage.removeItem("beacon_user_email")
    localStorage.removeItem("beacon_plan")
    if (setIsLoggedIn) setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center font-mono text-sm font-bold text-background">
            B
          </div>
          <span className="font-mono font-bold text-lg">Beacon</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#what" className="text-sm text-muted-foreground hover:text-foreground transition">
            What This Does
          </a>
          <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition">
            How It Works
          </a>
          <a href="#built-for" className="text-sm text-muted-foreground hover:text-foreground transition">
            Built For
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="outline" className="text-xs cursor-pointer sm:text-sm bg-transparent">
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="text-xs cursor-pointer sm:text-sm bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="text-xs sm:text-sm bg-accent text-background hover:bg-accent/90 cursor-pointer">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
