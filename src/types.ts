export type ColorMode = 'light' | 'dark'

export type Locale = 'en' | 'lt'

export type Payment = {
  payeeAccount: string,
  amount: number,
  purpose: string,
  payerAccount: string,
  payee: string,
}

export type PayerAccount = {
  iban: string,
  id: string,
  balance: number,
}

export type PayerAccounts = PayerAccount[]
