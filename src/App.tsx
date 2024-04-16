import { useEffect, useState, useMemo } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import { ThemeWithLocaleContext } from './context'
import LangSelector from './components/LangSelector'
import ThemeToggle from './components/ThemeToggle'
import PaymentForm from './components/PaymentForm'
import { ColorMode, Locale } from './types'

const App = () => {
  const [mode, setMode] = useState<ColorMode>('light')
  const [locale, setLocale] = useState<Locale>(localStorage.getItem('locale') as Locale || 'en')

  const themeWithLocaleContext = useMemo(
    () => ({
      locale,
      changeLocale: (locale: Locale) => {
        setLocale(locale)
        localStorage.setItem('locale', locale)
      },
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [locale],
  )

  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode],
  )

  useEffect(() => {
    if (!localStorage.getItem('locale')) {
      localStorage.setItem('locale', 'en')
    }
  }, [])

  return (
    <ThemeWithLocaleContext.Provider value={themeWithLocaleContext}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
          <LangSelector />
          <ThemeToggle />
        </Box>
        <PaymentForm />
      </ThemeProvider>
    </ThemeWithLocaleContext.Provider>
  )
}

export default App
