import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CURRENCY } from '@/constants/format'
import { computeAll } from '@/features/quotes/lib/calc'
import { Quote } from '@/features/quotes/types'

type Props = { quote: Quote }

export const ResultCard = ({ quote }: Props) => {
  const c = computeAll(quote)
  const essentialFilled =
    quote.termMonths > 0 && quote.monthlyBase >= 0 && quote.taxPercent >= 0 && quote.downpayment >= 0 && quote.dmvFee >= 0

  const money = (v: number) => CURRENCY.format(v)
  const realFormula = `= ${money(c.totalDAS)} + ${money(c.monthlyAfterTax)} × ${c.payMonths} + ${money(quote.dmvFee)} + ${money(quote.dispositionFee || 0)} = ${money(c.realTotal)}`
  const effFormula = `= ${money(c.realTotal)} ÷ ${quote.termMonths} = ${money(c.effectiveMonthly)}`

  return (
    <Card className={essentialFilled ? '' : 'opacity-60'} title={essentialFilled ? undefined : '필수칸을 입력하면 결과가 표시됩니다.'}>
      <CardHeader>
        <CardTitle>결과</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          <div className="cell-sum-strong rounded p-4">
            <div className="text-xs text-muted-foreground">Real Total</div>
            <div className="text-3xl font-bold">{CURRENCY.format(c.realTotal)}</div>
            <div className="mt-1 text-xs text-muted-foreground whitespace-pre-wrap break-words">
              Real Total = DAS + 월(세후)×납부횟수 + DMV + 종료수수료 + 초과마일
              <br />
              {realFormula}
            </div>
          </div>
          <div className="cell-sum rounded p-4">
            <div className="text-xs text-muted-foreground">Effective Monthly</div>
            <div className="text-3xl font-bold">{CURRENCY.format(c.effectiveMonthly)}</div>
            <div className="mt-1 text-xs text-muted-foreground whitespace-pre-wrap break-words">
              Effective Monthly = Real Total ÷ 기간(개월)
              <br />
              {effFormula}
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>월(세전): {CURRENCY.format(c.monthlyPreTax)}</div>
          <div>월(세후): {CURRENCY.format(c.monthlyAfterTax)}</div>
          <div>Total Down Payment: {CURRENCY.format(c.totalDAS)}</div>
          <div>납부 횟수: {c.payMonths}</div>
          {/* mileage fields removed */}
        </div>
        {quote.taxPercent > 20 || quote.taxPercent < 0 ? (
          <div className="mt-3 text-xs text-destructive">세율은 0–20% 범위를 권장합니다.</div>
        ) : null}
      </CardContent>
    </Card>
  )
}


