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
      monthlyCreditAdd: String(quote.monthlyCreditAdd ?? ''),
      monthlyMilesAdd: String(quote.monthlyMilesAdd ?? ''),
      firstMonthAmount: String(quote.firstMonthAmount ?? ''),
      downpayment: String(quote.downpayment ?? ''),
      acquisition: String(quote.acquisition ?? ''),
      dmvFee: String(quote.dmvFee ?? ''),
      dispositionFee: String(quote.dispositionFee ?? ''),
      allowMiles: String(quote.allowMiles ?? ''),
      expectMiles: String(quote.expectMiles ?? ''),
      overmileRate: String(quote.overmileRate ?? ''),
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

  // Keep raw string for monthlyBase to avoid NaN and allow editing/deleting smoothly
  const [monthlyBaseInput, setMonthlyBaseInput] = React.useState<string>(String(quote.monthlyBase ?? ''))
  React.useEffect(() => {
    setMonthlyBaseInput(String(quote.monthlyBase ?? ''))
  }, [quote.id, quote.monthlyBase])

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <div className="col-span-2 md:col-span-3">
        <Label htmlFor="dealer">메모/딜러명</Label>
        <Input id="dealer" value={quote.dealer ?? ''} onChange={(e) => set('dealer')(e.target.value as any)} />
      </div>
      <div>
        <Label htmlFor="term">기간(개월)</Label>
        <Input id="term" {...bindNumber('termMonths')} />
      </div>
      <div>
        <Label htmlFor="monthlyBase">월 기본요금</Label>
        <Input
          id="monthlyBase"
          value={monthlyBaseInput}
          inputMode="decimal"
          placeholder="예: 129.00"
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
        <Label htmlFor="monthlyCreditAdd">크레딧 추가</Label>
        <Input id="monthlyCreditAdd" {...bindNumber('monthlyCreditAdd')} />
      </div>
      <div>
        <Label htmlFor="monthlyMilesAdd">마일 추가</Label>
        <Input id="monthlyMilesAdd" {...bindNumber('monthlyMilesAdd')} />
      </div>
      <div>
        <Label htmlFor="taxPercent">세율(%)</Label>
        <Input
          id="taxPercent"
          value={taxInput}
          inputMode="decimal"
          placeholder="예: 7.75"
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
      <div className="flex items-end gap-2">
        <div className="flex flex-col">
          <Label htmlFor="firstMonthInDAS">첫 달 요금 DAS 포함</Label>
          <Switch
            id="firstMonthInDAS"
            checked={quote.firstMonthInDAS}
            onCheckedChange={(v) => set('firstMonthInDAS')(v as any)}
          />
        </div>
        <div className="flex-[4] min-w-0">
          <Label htmlFor="firstMonthAmount">금액</Label>
          <Input id="firstMonthAmount" {...bindNumber('firstMonthAmount')} />
        </div>
      </div>
      <div>
        <Label htmlFor="downpayment">DAS: 다운페이</Label>
        <Input id="downpayment" {...bindNumber('downpayment')} />
      </div>
      <div>
        <Label htmlFor="acquisition">취득수수료</Label>
        <Input id="acquisition" {...bindNumber('acquisition')} />
      </div>
      <div>
        <Label htmlFor="dmvFee">DMV/등록비</Label>
        <Input id="dmvFee" {...bindNumber('dmvFee')} />
      </div>
      <div>
        <Label htmlFor="dispositionFee">종료 수수료(선택)</Label>
        <Input id="dispositionFee" {...bindNumber('dispositionFee')} />
      </div>
      <div>
        <Label htmlFor="allowMiles">연간 허용(선택)</Label>
        <Input id="allowMiles" {...bindNumber('allowMiles')} />
      </div>
      <div>
        <Label htmlFor="expectMiles">예상(선택)</Label>
        <Input id="expectMiles" {...bindNumber('expectMiles')} />
      </div>
      <div>
        <Label htmlFor="overmileRate">초과요금($/mile)</Label>
        <Input id="overmileRate" {...bindNumber('overmileRate')} />
      </div>
    </div>
  )
}


