import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-lg border bg-gradient-to-b from-primary/10 to-transparent p-6 md:p-10">
      <div className="relative z-10 grid gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Find the coziest nest for your next car</h2>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground md:text-base">
            Compare quotes like a spreadsheet, but friendlier. Enter your local tax and see Real Total and
            Effective Monthly instantly.
          </p>
          <div className="mt-4 flex gap-2">
            <a href="#calculator" className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:brightness-95">Start comparing</a>
            <a href="#about" className="rounded-md border px-4 py-2 text-sm hover:bg-muted">Learn more</a>
          </div>
        </div>
        <div className="relative flex h-40 items-center justify-center md:h-48">
          <Image
            src="/images/logo.png"
            alt="CarLeaseNest logo"
            width={256}
            height={256}
            className="animate-float w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48"
            priority
          />
        </div>
      </div>
      {/* decorative shapes removed for a clean, minimal hero */}
    </section>
  )
}


