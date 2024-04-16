import { getPayeeAccount } from '../api/identities'

const MIN_AMOUNT = 0.01

export const validateAmout = (value: number, balance?: number) => {
  if (balance === undefined) {
    return 'choose payer account'
  }

  if (value > balance) {
    return 'not enough funds'
  }

  if (value < MIN_AMOUNT) {
    return `amount should be more then ${MIN_AMOUNT}`
  }
}

export const validatePayeeAccount = (value: string) => {
  if (value.length === 0) {
    return 'is required'
  }
  return getPayeeAccount(value).then(({ valid }) => {
    if (!valid) {
      return 'is invalid'
    }
  })
}

export const validatePayee = (value: string) => {
  if (value.length === 0) {
    return 'is required'
  }
  if (value.length > 70) {
    return 'is too long'
  }
}

export const validatePurpose = (value: string) => {
  if (value.length === 0) {
    return 'is required'
  }
  if (value.length < 3) {
    return 'is too short'
  }
  if (value.length > 135) {
    return 'is too long'
  }
}





