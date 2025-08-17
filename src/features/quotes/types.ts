export type Quote = {
  id: string
  dealer?: string
  termMonths: number
  monthlyBase: number
  monthlyCreditAdd?: number
  monthlyMilesAdd?: number
  taxPercent: number
  firstMonthInDAS: boolean
  downpayment: number
  dmvFee: number
  dispositionFee?: number
}

export type QuoteComputed = {
  monthlyPreTax: number
  monthlyAfterTax: number
  totalDAS: number
  payMonths: number
  realTotal: number
  effectiveMonthly: number
}

