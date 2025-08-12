import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '리스 비교 계산기',
  description: '자동차 리스 견적 비교',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <div className="mx-auto max-w-6xl p-4 md:p-8">
          {children}
          <footer className="mt-10 text-center text-xs text-muted-foreground">
            made by Sion
          </footer>
        </div>
      </body>
    </html>
  )
}

