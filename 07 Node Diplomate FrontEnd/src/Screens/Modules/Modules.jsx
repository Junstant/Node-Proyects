import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import React from 'react'

const Modules = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProvider>
  )
}

export default Modules