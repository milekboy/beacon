export default function BuiltFor() {
  return (
    <section id="built-for" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className=" mx-auto">
        <h2 className="font-mono text-3xl font-bold mb-12 text-center">Built For</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Active Traders",
              desc: "Get an edge by seeing informed activity first",
            },
            {
              title: "Analysts & Researchers",
              desc: "Deep dive into market signals and patterns",
            },
            {
              title: "Crypto-Native Funds",
              desc: "Institutional-grade intelligence and alerts",
            },
            {
              title: "High-Stakes Bettors",
              desc: "Make conviction decisions with real-time data",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-lg border border-border bg-card/30 hover:border-accent/50 transition"
            >
              <h3 className="font-mono font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
