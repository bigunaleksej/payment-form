export const formatAmount = (value: number) => {
  const locale = localStorage.getItem('locale') as string
  return  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
