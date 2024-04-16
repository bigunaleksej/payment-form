import { useState, useEffect } from 'react'
import { getPayerAccounts } from '../api/identities'
import { PayerAccounts } from '../types'

export const usePayerAccounts = (payerId: string) => {
  const [payerAccounts, setPayerAccounts] = useState<PayerAccounts>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getPayerAccounts(payerId)
      .then((res) => {
        setIsLoading(false)
        setPayerAccounts(res)
      })
  }, [payerId])

  return {
    isLoading,
    payerAccounts,
  }
}