import { useContext } from 'react'
import { FormControl, Select, MenuItem, SelectChangeEvent} from '@mui/material/'
import { ThemeWithLocaleContext } from '../context'
import type { Locale } from '../types'

const ThemeToggle = () => {
  const localeContext = useContext(ThemeWithLocaleContext)

  const onLocaleChange = (event: SelectChangeEvent) => {
    localeContext.changeLocale(event.target.value as Locale)
  }

  return (
    <FormControl size="small">
      <Select
        value={localeContext.locale}
        onChange={onLocaleChange}
      >
        <MenuItem value="en">EN</MenuItem>
        <MenuItem value="lt">LT</MenuItem>
      </Select>
    </FormControl>
  )
}

export default ThemeToggle