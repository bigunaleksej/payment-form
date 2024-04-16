import { PayerAccounts } from '../types'

const PAYER_ACCOUNTS_MOCK: PayerAccounts = [
  {
    iban: 'LT307300010172619160',
    id: '1',
    balance: 1000.12,
  },
  {
    iban: 'LT307300010172619161',
    id: '2',
    balance: 2.43,
  },
  {
    iban: 'LT307300010172619162',
    id: '3',
    balance: -5.87,
  },
]

export const getPayerAccounts = (payerId: string): Promise<PayerAccounts> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // mock logic for fetch payer accounts
      console.info(`Fetched mocked Payer Accounts data for payer: ${payerId}`)
      resolve(PAYER_ACCOUNTS_MOCK)
    }, 500)
  })  
}

export const getPayeeAccount = (iban: string) => {
  return fetch(`https://matavi.eu/validate?iban=${iban}`, {
    mode: 'no-cors',
  })
    .then(() => {
      // https://matavi.eu/validate doesn't support Access-Control-Allow-Origin *
      // mock logic for iban validation
      const res = { iban, valid: false }
      if (iban.slice(0,2) === 'LT' && iban.length === 20) {
        res.valid = true
      }
      return res
    })
}
