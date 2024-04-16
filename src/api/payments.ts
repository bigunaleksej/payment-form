import { Payment } from '../types'

export const sendPayment = (payment: Payment) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payment)
    }, 500)
  })  
}