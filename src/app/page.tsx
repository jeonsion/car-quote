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
import { Hero } from '@/components/site/Hero'
import { AboutSection } from '@/components/site/AboutSection'
import { Reveal } from '@/components/site/Reveal'
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
    const id = `q-${Date.now()}`
    const empty: Quote = {
      id,
      dealer: 'Untitled',
      extras: '',
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
    setQuotes((prev) => [...prev, empty])
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
    <main id="calculator" className="grid grid-cols-1 gap-6 md:grid-cols-12">
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
      <div className="md:col-span-12">
        <Reveal>
          <Hero />
        </Reveal>
      </div>

      <div className="md:col-span-8">
        <Reveal delayMs={100}>
          <Card className="h-full">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Enter Quote</CardTitle>
              <div className="flex gap-3 md:gap-4 pb-2 md:pb-3">
                <button
                  onClick={resetActive}
                  className="rounded-full border px-4 py-1.5 text-sm text-foreground hover:bg-muted"
                  title="Reset current quote to zero"
                >
                  Reset
                </button>
                <button onClick={addQuote} className="rounded-full bg-primary px-4 py-1.5 text-sm text-primary-foreground hover:brightness-95">
                  Add Quote
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
                      {q.dealer || 'Untitled'}
                    </button>
                    {quotes.length > 1 && (
                      <button
                        onClick={() => deleteQuote(q.id)}
                        className="rounded bg-red-500 px-1.5 py-0.5 text-xs text-white hover:bg-red-600"
                        title="Delete quote"
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
        </Reveal>
      </div>

      <div className="md:col-span-4">
        <Reveal delayMs={130}>
          <ResultCard quote={active} className="h-full" />
        </Reveal>
      </div>

      <div id="compare" className="md:col-span-12">
        <Reveal delayMs={150}>
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Compare</CardTitle>
            </CardHeader>
            <CardContent id="comparison-table">
              <QuotesTable quotes={quotes} />
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <div className="md:col-span-12">
        <Reveal delayMs={200}>
          <AboutSection />
        </Reveal>
      </div>
    </main>
  )
}

