"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SITE } from '@/constants/site'
import { SAMPLE_QUOTES } from '@/features/quotes/constants/sample'
import { QuoteForm } from '@/features/quotes/components/QuoteForm'
import { ResultCard } from '@/features/quotes/components/ResultCard'
import { QuotesTable } from '@/features/quotes/components/QuotesTable'
import { Quote } from '@/features/quotes/types'
import { useCapture } from '@/hooks/useCapture'
import { computeAll } from '@/features/quotes/lib/calc'
import * as React from 'react'

export default function Page() {
  const [quotes, setQuotes] = React.useState<Quote[]>(SAMPLE_QUOTES)
  const [activeId, setActiveId] = React.useState<string>(SAMPLE_QUOTES[0].id)
  const active = quotes.find((q) => q.id === activeId)!
  const { saveAsJSON } = useCapture()

  const updateActive = (next: Quote) => {
    setQuotes((prev) => prev.map((q) => (q.id === next.id ? next : q)))
  }

  const addQuote = () => {
    const base = quotes[0]
    const id = `q-${Date.now()}`
    const copy: Quote = { ...base, id, dealer: '' }
    setQuotes((prev) => [...prev, copy])
    setActiveId(id)
  }

  const resetActive = () => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === activeId
          ? {
              ...q,
              dealer: '',
              termMonths: 0,
              monthlyBase: 0,
              monthlyCreditAdd: 0,
              monthlyMilesAdd: 0,
              taxPercent: 0,
              firstMonthInDAS: false,
              downpayment: 0,
              dmvFee: 0,
              dispositionFee: 0,
            }
          : q
      )
    )
  }

  const deleteQuote = (id: string) => {
    if (quotes.length <= 1) return // Prevent deleting the last quote
    setQuotes((prev) => prev.filter((q) => q.id !== id))
    if (activeId === id) {
      const remaining = quotes.filter((q) => q.id !== id)
      setActiveId(remaining[0].id)
    }
  }

  return (
    <main className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: SITE.name,
            applicationCategory: 'BusinessApplication',
            description: SITE.description,
          }),
        }}
      />
      <Card className="md:col-span-8">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>견적 입력</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={resetActive}
              className="rounded border px-3 py-1.5 text-sm text-foreground hover:bg-muted"
              title="현재 견적 입력값을 0으로 초기화"
            >
              초기화
            </button>
            <button onClick={addQuote} className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              견적 추가
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-3 flex gap-2 overflow-x-auto">
            {quotes.map((q) => (
              <div key={q.id} className="flex items-center gap-1">
                <button
                  onClick={() => setActiveId(q.id)}
                  className={`rounded border px-2 py-1 text-xs ${activeId === q.id ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  {q.dealer || '무제'}
                </button>
                {quotes.length > 1 && (
                  <button
                    onClick={() => deleteQuote(q.id)}
                    className="rounded bg-red-500 px-1.5 py-0.5 text-xs text-white hover:bg-red-600"
                    title="견적 삭제"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <QuoteForm quote={active} onChange={updateActive} />
        </CardContent>
      </Card>

      <div className="md:col-span-4">
        <ResultCard quote={active} />
      </div>

      <div className="md:col-span-12">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>비교</CardTitle>
          </CardHeader>
          <CardContent id="comparison-table">
            <QuotesTable quotes={quotes} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}


