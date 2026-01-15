import { useEffect, useState } from "react"

export function usePWAInstall() {
    const [prompt, setPrompt] = useState<any>(null)

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault()
            setPrompt(e)
        }

        window.addEventListener("beforeinstallprompt", handler)
        return () => window.removeEventListener("beforeinstallprompt", handler)
    }, [])

    const install = async () => {
        if (!prompt) return
        prompt.prompt()
        await prompt.userChoice
        setPrompt(null)
    }

    return { install, canInstall: !!prompt }
}
