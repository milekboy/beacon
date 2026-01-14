import { Suspense } from "react"
import PaymentSuccessContent from "./PaymentSuccessContent"

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<PaymentSuccessLoadingFallback />}>
            <PaymentSuccessContent />
        </Suspense>
    )
}

function PaymentSuccessLoadingFallback() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <div className="text-center">
                <div className="text-muted-foreground font-mono text-sm">verifying payment...</div>
            </div>
        </div>
    )
}
