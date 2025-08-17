import { CURRENCY } from '@/constants/format'
import { computeAll } from '@/features/quotes/lib/calc'
import { Quote } from '@/features/quotes/types'

type Props = {
  quotes: Quote[]
}

export const QuotesTable = ({ quotes }: Props) => {
  const ranked = [...quotes]
    .map((q) => ({ q, c: computeAll(q) }))
    .sort((a, b) => a.c.realTotal - b.c.realTotal)

  const minRealTotal = Math.min(...ranked.map((r) => r.c.realTotal))
  const minDAS = Math.min(...ranked.map((r) => r.c.totalDAS))
  const minMonthly = Math.min(...ranked.map((r) => r.c.monthlyAfterTax))

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Notes</th>
            <th className="p-2 text-right">Down Payment</th>
            <th className="p-2 text-right">Monthly</th>
            <th className="p-2 text-right">DMV</th>
            <th className="p-2 text-right">Total</th>
            <th className="p-2 text-right">Effective</th>
            <th className="p-2">Badges</th>
          </tr>
        </thead>
        <tbody className="[&_tr:nth-child(odd)]:bg-muted/30">
          {ranked.map(({ q, c }) => {
            const badges: string[] = []
            if (c.realTotal === minRealTotal) badges.push('Lowest Total')
            if (c.totalDAS === minDAS) badges.push('Lowest DAS')
            if (c.monthlyAfterTax === minMonthly) badges.push('Lowest Monthly')
            return (
              <tr key={q.id} className="border-b hover:bg-muted/40">
                <td className="p-2">{q.dealer ?? '-'}</td>
                <td className="p-2 text-xs text-muted-foreground max-w-[18rem] truncate" title={q.extras ?? ''}>{q.extras ?? '-'}</td>
                <td className="p-2 text-right">{CURRENCY.format(c.totalDAS)}</td>
                <td className="p-2 text-right">{CURRENCY.format(c.monthlyAfterTax)}</td>
                <td className="p-2 text-right">{CURRENCY.format(q.dmvFee)}</td>
                <td className="p-2 text-right font-medium">{CURRENCY.format(c.realTotal)}</td>
                <td className="p-2 text-right">{CURRENCY.format(c.effectiveMonthly)}</td>
                <td className="p-2 text-xs">{badges.join(', ') || '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}


