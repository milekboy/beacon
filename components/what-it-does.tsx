export default function WhatItDoes() {
  return (
    <section id="what" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className=" mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-mono text-3xl font-bold mb-6">What This Platform Does</h2>
            <p className="text-muted-foreground leading-relaxed">
              We monitor Polymarket in real time, detecting unusual trading patterns and informed behavior across all
              markets. Our algorithms identify fresh wallets, size anomalies, and repeated entries that signal
              conviction before odds move.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This is intelligence, not prediction. We show you what informed traders are doing, letting you make better
              decisions faster.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:border-accent/50 transition">
              <h3 className="font-mono text-sm font-bold text-accent mb-2">Real-Time Monitoring</h3>
              <p className="text-sm text-muted-foreground">Every Polymarket trade analyzed instantly</p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:border-accent/50 transition">
              <h3 className="font-mono text-sm font-bold text-accent mb-2">Signal Detection</h3>
              <p className="text-sm text-muted-foreground">Fresh wallets, size anomalies, and conviction signals</p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:border-accent/50 transition">
              <h3 className="font-mono text-sm font-bold text-accent mb-2">Early Alerts</h3>
              <p className="text-sm text-muted-foreground">Get notified before the rest of the market reacts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
