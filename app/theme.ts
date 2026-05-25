// app/theme.ts
'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      50:  '#e3f2fd',
      100: '#bbdefb',
    },
  },
})

export default theme