import { Quote, QuoteComputed } from '@/features/quotes/types'

const nz = (n?: number) => (typeof n === 'number' && !Number.isNaN(n) ? n : 0)

export const monthlyPreTax = (q: Quote) => q.monthlyBase

export const monthlyAfterTax = (q: Quote) => monthlyPreTax(q) * (1 + q.taxPercent / 100)

export const totalDAS = (q: Quote) => q.downpayment + (q.firstMonthInDAS ? monthlyAfterTax(q) : 0)

export const payMonths = (q: Quote) => q.termMonths - (q.firstMonthInDAS ? 1 : 0)

export const realTotal = (q: Quote) =>
  totalDAS(q) + monthlyAfterTax(q) * payMonths(q) + q.dmvFee + nz(q.dispositionFee)

export const effectiveMonthly = (q: Quote) => realTotal(q) / q.termMonths

export const computeAll = (q: Quote): QuoteComputed => {
  const mpt = monthlyPreTax(q)
  const mat = mpt * (1 + q.taxPercent / 100)
  const das = totalDAS(q)
  const pm = payMonths(q)
  const rt = das + mat * pm + q.dmvFee + nz(q.dispositionFee)
  const em = rt / q.termMonths
  return {
    monthlyPreTax: mpt,
    monthlyAfterTax: mat,
    totalDAS: das,
    payMonths: pm,
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
    ['세율', q.taxPercent],
    ['DAS 다운', q.downpayment],
    ['DMV', q.dmvFee],
    ['종료 수수료', q.dispositionFee],
  ]
  nonNegative.forEach(([label, value]) => {
    if (typeof value === 'number' && value < 0) errors.push(`${label}은(는) 음수일 수 없습니다.`)
  })
  return errors
}

