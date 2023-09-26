import React, { useState } from 'react'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ThemeToggler from './ThemeToggler'
import Profile from './Profile'

const Header = () => {
  return (
    <AppBar position='sticky' sx={{borderRadius: '0 0 20px 20px', py: 1}}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography variant='h5' noWrap flexGrow={1}>
            <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>Budget Tracker</Link>
          </Typography>
          <ThemeToggler />
          <Profile />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header