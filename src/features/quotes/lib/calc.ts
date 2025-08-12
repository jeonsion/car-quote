import { Quote, QuoteComputed } from '@/features/quotes/types'

const nz = (n?: number) => (typeof n === 'number' && !Number.isNaN(n) ? n : 0)

export const monthlyPreTax = (q: Quote) => q.monthlyBase + nz(q.monthlyCreditAdd) + nz(q.monthlyMilesAdd)

export const monthlyAfterTax = (q: Quote) => monthlyPreTax(q) * (1 + q.taxPercent / 100)

export const totalDAS = (q: Quote) => q.downpayment + q.acquisition + (q.firstMonthInDAS ? nz(q.firstMonthAmount) : 0)

export const payMonths = (q: Quote) => q.termMonths - (q.firstMonthInDAS ? 1 : 0)

export const mileageOverage = (q: Quote) =>
  Math.max(0, nz(q.expectMiles) - nz(q.allowMiles)) * (q.termMonths / 12) * nz(q.overmileRate)

export const realTotal = (q: Quote) =>
  totalDAS(q) + monthlyAfterTax(q) * payMonths(q) + q.dmvFee + nz(q.dispositionFee) + (q.allowMiles && q.expectMiles ? mileageOverage(q) : 0)

export const effectiveMonthly = (q: Quote) => realTotal(q) / q.termMonths

export const computeAll = (q: Quote): QuoteComputed => {
  const mpt = monthlyPreTax(q)
  const mat = mpt * (1 + q.taxPercent / 100)
  const das = totalDAS(q)
  const pm = payMonths(q)
  const mo = q.allowMiles && q.expectMiles ? mileageOverage(q) : 0
  const rt = das + mat * pm + q.dmvFee + nz(q.dispositionFee) + mo
  const em = rt / q.termMonths
  return {
    monthlyPreTax: mpt,
    monthlyAfterTax: mat,
    totalDAS: das,
    payMonths: pm,
    mileageOverage: mo,
    realTotal: rt,
    effectiveMonthly: em,
  }
}

export const validateQuote = (q: Quote) => {
  const errors: string[] = []
  if (q.taxPercent < 0 || q.taxPercent > 20) errors.push('세율은 0–20% 범위를 권장합니다.')
  const nonNegative: Array<[string, number | undefined]> = [
    ['기간', q.termMonths],
    ['월 기본요금', q.monthlyBase],
    ['크레딧 추가', q.monthlyCreditAdd],
    ['마일 추가', q.monthlyMilesAdd],
    ['세율', q.taxPercent],
    ['DAS 다운', q.downpayment],
    ['취득수수료', q.acquisition],
    ['DMV', q.dmvFee],
    ['종료 수수료', q.dispositionFee],
    ['초과요금', q.overmileRate],
  ]
  nonNegative.forEach(([label, value]) => {
    if (typeof value === 'number' && value < 0) errors.push(`${label}은(는) 음수일 수 없습니다.`)
  })
  return errors
}

