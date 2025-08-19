import './globals.css'
import type { Metadata } from 'next'
import { SITE, SITE_URL } from '@/constants/site'
import { Navbar } from '@/components/site/Navbar'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Car Lease Comparison Calculator | CarLeaseNest',
  description: SITE.description,
  keywords: SITE.keywords,
  icons: {
    icon: [{ url: '/images/favicon.ico', type: 'image/x-icon' }],
    shortcut: ['/images/favicon.ico'],
    apple: [{ url: '/images/favicon.ico' }],
  },
  themeColor: '#9CB9C0',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Car Lease Comparison Calculator | CarLeaseNest',
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/images/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Lease Comparison Calculator | CarLeaseNest',
    description: SITE.description,
    images: ['/images/logo.png'],
  },
  robots: 'index, follow, max-image-preview:large',
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Navbar />
        <div className="mx-auto max-w-6xl p-4 md:p-8">
          {children}
          <footer className="mt-10 flex justify-center">
            <a
              href="https://github.com/jeonsion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
              aria-label="Visit Sion's GitHub profile"
            >
              <span className="opacity-80">made by</span>
              <span className="font-semibold">Sion</span>
              <span aria-hidden>↗</span>
            </a>
          </footer>
        </div>
      </body>
    </html>
  )
}

