export default function SignalCard() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className=" mx-auto">
        <h2 className="font-mono text-3xl font-bold mb-12 text-center">Example Signal</h2>

        <div className="glow-cyan max-w-2xl mx-auto rounded-lg border border-accent/30 bg-card/50 backdrop-blur-sm p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-sm text-muted-foreground mb-2">MARKET</p>
              <h3 className="font-mono text-xl font-bold">Will Bitcoin exceed $100k by Dec 31?</h3>
            </div>
            <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded font-mono">ACTIVE</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            <div>
              <p className="font-mono text-xs text-muted-foreground mb-2">OUTCOME</p>
              <p className="font-mono text-2xl font-bold text-accent">YES</p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground mb-2">SIZE</p>
              <p className="font-mono text-2xl font-bold">$50,000</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <p className="font-mono text-xs text-muted-foreground uppercase">Trigger Reasons</p>
            <ul className="space-y-2">
              <li className="font-mono text-sm text-foreground">✓ Fresh wallet entering market</li>
              <li className="font-mono text-sm text-foreground">✓ Size anomaly: 3x avg trade</li>
              <li className="font-mono text-sm text-foreground">✓ Repeated entries within 5 min</li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <p className="font-mono text-xs text-muted-foreground">At Detection</p>
              <p className="font-mono text-lg font-bold">67%</p>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-accent font-mono">→</span>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground">Current</p>
              <p className="font-mono text-lg font-bold">71%</p>
            </div>
          </div>

          <p className="font-mono text-xs text-muted-foreground pt-4 border-t border-border">Detected 2 minutes ago</p>
        </div>
      </div>
    </section>
  )
}
