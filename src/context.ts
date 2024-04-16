import { createContext } from 'react'
import { Locale } from './types'

// define defualt context value
export const ThemeWithLocaleContext = createContext({
  locale: 'en',
  changeLocale: (locale: Locale) => {
    localStorage.setItem('locale', locale)
  },
  toggleColorMode: () => {},
})