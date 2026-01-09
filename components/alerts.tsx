export default function Alerts() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className=" mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="glow-purple w-full rounded-lg border border-border bg-card/30 backdrop-blur-sm p-8 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                <span className="font-mono text-sm text-accent">Live Dashboard</span>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <p className="text-muted-foreground">Bitcoin Market (YES) +4%</p>
                <p className="text-muted-foreground">Ethereum Price (&gt;$3k) +2%</p>
                <p className="text-foreground text-accent">Solana TVL Signal Detected</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="font-mono text-3xl font-bold">Real-Time Alerts</h2>

            <p className="text-muted-foreground leading-relaxed">
              Browser push notifications keep you in the loop even when you're not on the site. Our live dashboard shows
              all detected signals with real-time odds movement.
            </p>

            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <span className="text-accent mt-1">✓</span>
                <span className="text-sm text-muted-foreground">Instant push notifications for new signals</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent mt-1">✓</span>
                <span className="text-sm text-muted-foreground">Live dashboard with all active signals</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent mt-1">✓</span>
                <span className="text-sm text-muted-foreground">Custom alerts for specific markets</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
