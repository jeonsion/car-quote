import './globals.css'
import type { Metadata } from 'next'
import { SITE, SITE_URL } from '@/constants/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  keywords: SITE.keywords,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <div className="mx-auto max-w-6xl p-4 md:p-8">
          <header className="mb-6 border-b pb-4 md:mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">리스 비교 계산기</h1>
            <p className="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">
              지역 세율 입력, 월 과세 고정. 여러 견적을 표처럼 입력해 Real Total과 Effective Monthly를 한눈에 비교하세요.
            </p>
          </header>

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

