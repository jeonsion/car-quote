import { Quote } from '@/features/quotes/types'

export const SAMPLE_QUOTE: Quote = {
  id: 'sample-1',
  dealer: '',
  termMonths: 0,
  monthlyBase: 0,
  monthlyCreditAdd: 0,
  monthlyMilesAdd: 0,
  taxPercent: 0,
  firstMonthInDAS: false,
  firstMonthAmount: 0,
  downpayment: 0,
  acquisition: 0,
  dmvFee: 0,
  dispositionFee: 0,
  allowMiles: 0,
  expectMiles: 0,
  overmileRate: 0,
}

export const SAMPLE_QUOTES: Quote[] = [SAMPLE_QUOTE]

