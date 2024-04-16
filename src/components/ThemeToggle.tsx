import { useContext } from 'react'
import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ThemeWithLocaleContext } from '../context'

const ThemeToggle = () => {
  const theme = useTheme()
  const themeContext = useContext(ThemeWithLocaleContext)

  return (
    <IconButton sx={{ ml: 1 }} onClick={themeContext.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

export default ThemeToggle