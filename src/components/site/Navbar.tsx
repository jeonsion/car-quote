import Link from 'next/link'
import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="w-full border-b border-primary/20 bg-primary">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-18 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="CarLeaseNest" width={40} height={40} className="rounded" />
          <span className="text-white text-xl font-semibold tracking-tight md:text-2xl">CarLeaseNest</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-white/90">
          <Link href="#calculator" className="hover:text-white">Calculator</Link>
          <Link href="#compare" className="hover:text-white">Compare</Link>
          <Link href="#about" className="hover:text-white">About</Link>
        </div>
      </div>
    </nav>
  )
}


