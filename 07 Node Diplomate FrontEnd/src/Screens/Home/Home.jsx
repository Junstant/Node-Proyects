import React from 'react'
import Header from '../../components/layouts/Header'
import { Button } from '@mui/material'
import '../../assets/styles/global.css'
import '../../assets/styles/home.css'

const Home = () => {
  return (
    <main>
      <Header></Header>
      <h2>Unlock your full academic</h2>
      <h1>potential</h1>
      <h3>Simplify your academic life with smart tools</h3>
      <Button variant="outlined" color="primary">About</Button>
      <Button variant="contained" color="primary"><a href='/login'>Get started</a></Button>
    </main>
  )
}

export default Home