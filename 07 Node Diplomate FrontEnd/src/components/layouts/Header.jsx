import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <div><Link to="/"><img src="" alt="Logo"/>Studemio</Link></div>
        <div>
            <ul>
                <li>Product</li>
                <li>Pricing</li>
                <li>Changelog</li>
            </ul>
        </div>
        <div>
            <Button variant="outlined"><Link to="/Login">Login</Link> </Button>
            <Button variant="contained"><Link to="/Register">Get studemio</Link></Button>
        </div>
    </div>
  )
}

export default Header