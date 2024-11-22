import React from 'react'
import { Button } from '@mui/material'

const Header = () => {
  return (
    <div>
        <div><a href='/'><img src="" alt="Logo"/>Studemio</a></div>
        <div>
            <ul>
                <li>Product</li>
                <li>Pricing</li>
                <li>Changelog</li>
            </ul>
        </div>
        <div>
            <Button variant="outlined"><a href='/Login'>Login</a></Button>
            <Button variant="contained"><a href='/Login'>Get Studemio</a></Button>
        </div>
    </div>
  )
}

export default Header