import React, {useContext, useEffect, useState} from 'react'
import {Box, Tooltip, IconButton, Avatar, Button, Menu, MenuItem, Typography} from '@mui/material'
import firebase from 'firebase/compat/app'
import { auth } from '../firebaseConfig'
import {database} from 'firebase/compat/database'
import { UserContext } from '../context/UserContext'
import GoogleIcon from '../assets/google.png'

const Profile = () => {
    const {user, setUser} = useContext(UserContext)
    const settings = ['Logout', ]

    const insertUser = async ({isNewUser, profile}) => {
        if (isNewUser) {
            const userData = {
                user_details : {
                    first_name: profile.given_name,
                    last_name: profile.family_name,
                    email: profile.email
                },
                projected_budget : {
                    projected_income: 0,
                    projected_expense: 0,
                    projected_investments: 0,
                    projected_balance: 0
                }
            }
            try {
                const database = firebase.database();
                await database.ref('users/' + profile.id).set(userData)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const {additionalUserInfo} = await auth.signInWithPopup(provider)
            await insertUser(additionalUserInfo)
            setUser(additionalUserInfo)
            localStorage.setItem('User', JSON.stringify(additionalUserInfo))
            handleCloseUserMenu()
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('User');
            setUser(null)
            handleCloseUserMenu()
        } catch (error) {
            console.log(error);
        }
    }

    // Anchor Menu
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box>
        {user ? (
        <>
            <Tooltip title='Open Settings'>
                <IconButton sx={{p: 0}} onClick={handleOpenUserMenu}>
                <Avatar src={user.profile?.picture}></Avatar>
                </IconButton>
            </Tooltip>
            <Menu sx={{mt: '45px'}}
            anchorEl={anchorElUser} 
            anchorOrigin={{vertical: 'top', horizontal: 'right'}} 
            keepMounted 
            transformOrigin={{vertical: 'top', horizontal: 'right'}} 
            open={Boolean(anchorElUser)} 
            onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
        ) : (
        <Button sx={{my: 0, px: 3, py: 1, backgroundColor: 'background.paper', color: 'text.primary', display: 'block', borderRadius: '20px', display: 'flex', alignItems: 'center'}} 
        onClick={signInWithGoogle}>Sign In <img src={GoogleIcon} style={{paddingLeft: 10}}/></Button>
        )}
        </Box>
    )
}

export default Profile