import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="md:col-span-12">
      <div className="rounded-lg border bg-white/70 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 md:p-10">
        <div className="grid items-start gap-6 md:grid-cols-[1.2fr_1fr] md:gap-10">
          {/* Intro copy */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">About CarLeaseNest</h3>
            <p className="mt-2 max-w-prose text-sm text-muted-foreground md:text-base">
              We help your next car find a cozy nest. CarLeaseNest compares lease quotes side-by-side so you can
              decide with clarity and calm — no sales, just comparison.
            </p>

            {/* Feature cards */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:gap-4">
              <div className="rounded-lg border p-4 transition-colors hover:bg-muted/40">
                <div className="text-xl">🧭</div>
                <h4 className="mt-1 font-semibold">We compare, you choose</h4>
                <p className="mt-1 text-sm text-muted-foreground">Dozens of offers organized into one clear view.</p>
              </div>
              <div className="rounded-lg border p-4 transition-colors hover:bg-muted/40">
                <div className="text-xl">🪺</div>
                <h4 className="mt-1 font-semibold">Dealer‑neutral</h4>
                <p className="mt-1 text-sm text-muted-foreground">No upselling, no agenda — just side‑by‑side facts.</p>
              </div>
              <div className="rounded-lg border p-4 transition-colors hover:bg-muted/40 sm:col-span-2">
                <div className="text-xl">🧮</div>
                <h4 className="mt-1 font-semibold">Transparent math</h4>
                <p className="mt-1 text-sm text-muted-foreground">Monthly taxed pricing with formulas you can read.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#calculator" className="rounded-full bg-primary px-4 py-2 text-sm text-white hover:brightness-95">Open calculator</a>
              <span className="text-xs text-muted-foreground">No sign‑up. Free to use.</span>
            </div>
          </div>

          {/* Visual side */}
          <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
            <div className="group relative aspect-square w-full rounded-xl border bg-gradient-to-b from-primary/10 to-transparent">
              <div className="absolute inset-0 grid place-items-center">
                <Image
                  src="/images/logo.png"
                  alt="CarLeaseNest logo"
                  width={220}
                  height={220}
                  className="animate-bounce w-32 select-none drop-shadow md:w-40 lg:w-48 transition-transform duration-700 group-hover:-rotate-3"
                />
              </div>
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full border border-primary/30 animate-pulse" />
              <div className="pointer-events-none absolute -bottom-6 -left-6 h-16 w-16 rounded-full border border-primary/30 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


