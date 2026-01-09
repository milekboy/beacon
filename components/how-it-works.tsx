export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className=" mx-auto">
        <h2 className="font-mono text-3xl font-bold mb-16 text-center">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Monitor Markets",
              description: "We scan every Polymarket in real time, tracking all trades and market movements.",
            },
            {
              num: "02",
              title: "Detect Signals",
              description:
                "Our algorithms identify unusual activity: fresh wallets, size anomalies, and repeated conviction trades.",
            },
            {
              num: "03",
              title: "Alert You Early",
              description: "Get instant notifications before the market reacts, giving you the edge you need.",
            },
          ].map((step) => (
            <div key={step.num} className="space-y-4">
              <div className="font-mono text-5xl font-bold text-accent/50">{step.num}</div>
              <h3 className="font-mono text-lg font-bold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
