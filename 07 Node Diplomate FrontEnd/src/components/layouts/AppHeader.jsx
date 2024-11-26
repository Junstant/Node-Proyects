import React from 'react'
import { Link } from 'react-router-dom'
import { MagnifyingGlass, HouseLine, CirclesFour, CheckCircle, Gear } from '@phosphor-icons/react'
import { Avatar } from '@mui/material'

// ? ------------------ AppHeader Component ------->
const AppHeader = () => {
  return (
    <div>
        {/* Image */}
        <div><Link to="/"><img src="" alt="Logo"/></Link></div>
        {/* Buttons */}
        <div>
            <ul>
                <li><Link to="/search"><MagnifyingGlass/></Link></li>
                <li><Link to="/app"><HouseLine/></Link></li>
                <li><Link to="/modules"><CirclesFour/></Link></li>
                <li><Link to="/homeworks"><CheckCircle/></Link></li>
            </ul>
        </div>
        {/* Settings */}    
        <div>
            <Link to="/app/userPanel"><Gear/></Link>
        </div>
        {/* Avatar */}
        <div>
            <Avatar alt="Avatar" src="https://avatar.iran.liara.run/public/41" />
        </div>
    </div>
  )
}

export default AppHeader