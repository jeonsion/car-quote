"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Quote } from '@/features/quotes/types'
import * as React from 'react'

type Props = {
  quote: Quote
  onChange: (next: Quote) => void
}

const toNumber = (v: string) => (v === '' || v === '-' ? 0 : Number(v))

export const QuoteForm: React.FC<Props> = ({ quote, onChange }) => {
  const set = <K extends keyof Quote>(k: K) => (v: Quote[K]) => onChange({ ...quote, [k]: v })

  const decimalPattern = /^-?\d*(\.\d*)?$/
  const [numInputs, setNumInputs] = React.useState<Record<string, string>>({})
  React.useEffect(() => {
    setNumInputs({
      termMonths: String(quote.termMonths ?? ''),
      downpayment: String(quote.downpayment ?? ''),
      dmvFee: String(quote.dmvFee ?? ''),
      dispositionFee: String(quote.dispositionFee ?? ''),
    })
  }, [quote.id])

  const bindNumber = (k: keyof Quote) => ({
    value: numInputs[k as string] ?? String(quote[k] ?? ''),
    inputMode: 'decimal' as const,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      if (decimalPattern.test(v)) {
        setNumInputs((prev) => ({ ...prev, [k]: v }))
      }
    },
    onBlur: () => {
      const raw = numInputs[k as string]
      const n = raw === '' || raw === '-' || raw === '.' || raw === '-.' ? NaN : parseFloat(raw)
      const next = Number.isFinite(n) ? n : 0
      set(k as any)(next as any)
      setNumInputs((prev) => ({ ...prev, [k]: String(next) }))
    },
  })

  // Keep raw string for taxPercent to allow entering intermediate values like "7." smoothly
  const [taxInput, setTaxInput] = React.useState<string>(String(quote.taxPercent ?? ''))
  React.useEffect(() => {
    setTaxInput(String(quote.taxPercent ?? ''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote.id])

  const [locating, setLocating] = React.useState(false)
  const locateAndSearchTax = React.useCallback(() => {
    try {
      setLocating(true)
      if (!('geolocation' in navigator)) {
        window.open('https://www.google.com/search?q=' + encodeURIComponent('sales tax near me'), '_blank', 'noopener,noreferrer')
        setLocating(false)
        return
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
              { headers: { 'Accept-Language': 'en' } }
            )
            const data = await res.json()
            const addr = data?.address || {}
            const place = addr.city || addr.town || addr.village || addr.county || addr.state || addr.country || 'near me'
            const q = encodeURIComponent(`${place} sales tax`)
            window.open(`https://www.google.com/search?q=${q}` , '_blank', 'noopener,noreferrer')
          } catch {
            window.open('https://www.google.com/search?q=' + encodeURIComponent('sales tax near me'), '_blank', 'noopener,noreferrer')
          } finally {
            setLocating(false)
          }
        },
        () => {
          window.open('https://www.google.com/search?q=' + encodeURIComponent('sales tax near me'), '_blank', 'noopener,noreferrer')
          setLocating(false)
        },
        { timeout: 8000 }
      )
    } catch {
      setLocating(false)
    }
  }, [])

  // Keep raw string for monthlyBase to avoid NaN and allow editing/deleting smoothly
  const [monthlyBaseInput, setMonthlyBaseInput] = React.useState<string>(String(quote.monthlyBase ?? ''))
  React.useEffect(() => {
    setMonthlyBaseInput(String(quote.monthlyBase ?? ''))
  }, [quote.id, quote.monthlyBase])

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <div className="col-span-2 md:col-span-3">
        <Label htmlFor="dealer">Notes/Dealer</Label>
        <Input id="dealer" value={quote.dealer ?? ''} onChange={(e) => set('dealer')(e.target.value as any)} />
      </div>
      <div className="col-span-2 md:col-span-3">
        <Label htmlFor="extras">Additional notes (trim, AWD/FWD, color, etc.)</Label>
        <Input id="extras" value={quote.extras ?? ''} onChange={(e) => set('extras')(e.target.value as any)} placeholder="e.g., XLE Premium, AWD, White" />
      </div>
      <div>
        <Label htmlFor="term">Term (months)</Label>
        <Input id="term" {...bindNumber('termMonths')} />
      </div>
      <div>
        <Label htmlFor="monthlyBase">Monthly Payment</Label>
        <Input
          id="monthlyBase"
          value={monthlyBaseInput}
          inputMode="decimal"
          placeholder="e.g., 129.00"
          onChange={(e) => {
            const v = e.target.value
            if (/^-?\d*(\.\d*)?$/.test(v)) setMonthlyBaseInput(v)
          }}
          onBlur={() => {
            const n = parseFloat(monthlyBaseInput)
            const next = Number.isFinite(n) ? n : 0
            set('monthlyBase')(next as any)
            setMonthlyBaseInput(String(next))
          }}
        />
      </div>
      
      <div>
        <div className="mb-1 flex items-center justify-between">
          <Label htmlFor="taxPercent">Tax (%)</Label>
          <button
            type="button"
            onClick={locateAndSearchTax}
            title="Search sales tax by current location"
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            {locating ? 'Searching…' : 'Find by location'}
            <span className="sr-only">Search local sales tax</span>
          </button>
        </div>
        <Input
          id="taxPercent"
          value={taxInput}
          inputMode="decimal"
          placeholder="e.g., 7.75"
          onChange={(e) => {
            const v = e.target.value
            // Allow empty, digits, one optional decimal point with optional trailing digits
            if (/^-?\d*(\.\d*)?$/.test(v)) {
              setTaxInput(v)
            }
          }}
          onBlur={() => {
            const n = parseFloat(taxInput)
            const next = Number.isFinite(n) ? n : 0
            set('taxPercent')(next as any)
            setTaxInput(String(next))
          }}
        />
      </div>
      <div className="col-span-2 md:col-span-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-6">
            <Label htmlFor="downpayment">Total Down Payment</Label>
            <div className="flex items-center gap-3">
              <Input id="downpayment" {...bindNumber('downpayment')} />
              <div className="flex items-center gap-2">
                <Switch
                  id="firstMonthInDAS"
                  checked={quote.firstMonthInDAS}
                  onCheckedChange={(v) => set('firstMonthInDAS')(v as any)}
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">Include first month</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <Label htmlFor="dmvFee">DMV/Registration</Label>
            <Input id="dmvFee" {...bindNumber('dmvFee')} />
          </div>
          <div className="md:col-span-3">
            <Label htmlFor="dispositionFee">Disposition Fee</Label>
            <Input id="dispositionFee" {...bindNumber('dispositionFee')} />
          </div>
        </div>
      </div>
    </div>
  )
}


