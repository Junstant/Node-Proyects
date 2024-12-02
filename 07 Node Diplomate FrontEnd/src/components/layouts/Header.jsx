import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg';
import '../../assets/styles/global.css'
import '../../assets/styles/header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className='flex flex-row items-center gap-3'><Link to="/"><img src={logo} alt="Logo"/></Link>Studemio</div>
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