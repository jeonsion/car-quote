import './globals.css'
import type { Metadata } from 'next'
import { SITE, SITE_URL } from '@/constants/site'
import { Navbar } from '@/components/site/Navbar'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  keywords: SITE.keywords,
  icons: {
    icon: [{ url: '/images/favicon.ico', type: 'image/x-icon' }],
    shortcut: ['/images/favicon.ico'],
    apple: [{ url: '/images/favicon.ico' }],
  },
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: '/images/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
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

