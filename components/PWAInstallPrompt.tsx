"use client"

import { useState, useEffect } from "react"
import { usePWAInstall } from "./usePWAInstall"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function PWAInstallPrompt() {
    const { install, canInstall } = usePWAInstall()
    const [isVisible, setIsVisible] = useState(false)
    const [isIOS, setIsIOS] = useState(false)

    useEffect(() => {
        // Check if device is iOS
        const userAgent = window.navigator.userAgent.toLowerCase()
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
        setIsIOS(isIosDevice)

        if (canInstall) {
            setIsVisible(true)
        }
    }, [canInstall])

    if (!isVisible && !isIOS) return null

    // Special handling for iOS since it doesn't support BEFOREINSTALLPROMPT
    // We only show this if it's iOS and NOT in standalone mode
    if (isIOS) {
        // Check if already installed/standalone
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches
        if (isStandalone) return null
        if (!isVisible) {
            // We can show it once on mount or based on some logic, 
            // but for now let's reuse isVisible state which we default to false.
            // We need a trigger for iOS to show it. 
            // Let's force it true for iOS for now if not standalone, but maybe check local storage to not annoy.
            // For this MVP, let's stick to the requested "canInstall" flow mostly, 
            // but since `canInstall` won't happen on iOS, we might skip iOS specifics unless requested.
            // The user asked for `usePWAInstall` usage. That hook relies on `beforeinstallprompt`.
            // So standard PWA flow. 

            // actually, let's stick to just `canInstall` for now as that was the main request.
            // if `canInstall` is false (which it is on iOS), this component renders null.
            // If the user wants iOS instructions, that's a separate feature usually.
            // Reverting iOS specific logic to keep it simple and focused on the hook provided.
        }
    }

    if (!canInstall) return null

    return (
        <div
            className={cn(
                "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md transform transition-all duration-500 ease-in-out md:bottom-8 md:right-8 md:left-auto",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
            )}
        >
            <div className="flex flex-col gap-4 rounded-xl border bg-background/80 p-4 shadow-xl backdrop-blur-md dark:bg-card/80">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            {/* App Icon placeholder or generic generic icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="size-6 text-primary"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-semibold leading-none">Install Beacon</h3>
                            <p className="text-xs text-muted-foreground">
                                Add to home screen for fast access and real-time alerts.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-muted-foreground cursor-pointer transition-colors hover:text-foreground"
                        aria-label="Dismiss"
                    >
                        <X className="size-4" />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        onClick={() => setIsVisible(false)}
                        variant="ghost"
                        size="sm"
                        className="w-full cursor-pointer"
                    >
                        Not now
                    </Button>

                    <Button
                        onClick={install}
                        size="sm"
                        className="w-full cursor-pointer"
                    >
                        Install
                    </Button>
                </div>

            </div>
        </div>
    )
}
