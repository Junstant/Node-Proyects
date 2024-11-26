import React from 'react'
import useUserStore from '../../stores/userStore'
import AppHeader from '../../components/layouts/AppHeader'
import { CirclesFour } from '@phosphor-icons/react'
import { Avatar } from '@mui/material'


const Modules = () => {
  return (
    <div>
        <AppHeader />
        {/* Top header */}
        <section>
            <div><CirclesFour/> Modules</div>
            <div>
                <Avatar alt="Avatar" src="https://picsum.photos/202" />
                
            </div>
            <div></div>
        </section>
    </div>
  )
}

export default Modules