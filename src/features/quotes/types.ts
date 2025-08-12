export type Quote = {
  id: string
  dealer?: string
  termMonths: number
  monthlyBase: number
  monthlyCreditAdd?: number
  monthlyMilesAdd?: number
  taxPercent: number
  firstMonthInDAS: boolean
  firstMonthAmount?: number
  downpayment: number
  acquisition: number
  dmvFee: number
  dispositionFee?: number
  allowMiles?: number
  expectMiles?: number
  overmileRate?: number
}

export type QuoteComputed = {
  monthlyPreTax: number
  monthlyAfterTax: number
  totalDAS: number
  payMonths: number
  mileageOverage: number
  realTotal: number
  effectiveMonthly: number
}

