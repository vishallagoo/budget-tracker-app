import { Edit, WalletRounded } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, CardMedia, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import firebase from 'firebase/compat/app'
import {database} from 'firebase/compat/database'
import { UserContext } from '../context/UserContext'

const BudgetCards = ({type, projected, actual, title, img}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(projected || '')
    const {user} = useContext(UserContext)

    useEffect(() => {
        setText(projected || '')
    }, [projected])

    const handleLabelClick = () => {
        setIsEditing(true)
    }

    const handleBlur = async () => {
        setIsEditing(false)
        // console.log(`function is running on ${type}`);
        try {
            const database = firebase.database();
            const updateFigure = {
                [type]: text
            }
            await database.ref(`users/${user.profile?.id}/projected_budget/`).update(updateFigure)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setText(parseFloat(e.target.value))
    }
    return (
        <Card sx={{display: 'flex', p: 1, borderRadius: '20px'}}>
            <CardMedia sx={{minWidth: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/* {icon} */}
                <img src={img}/>
            </CardMedia>
            <Box sx={{minWidth: '75%'}}>
                <CardContent sx={{ py: '10px !important', px: '10px', display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                    <Typography variant='h6'>
                        {title}
                    </Typography>
                    <Typography variant='h6'>
                        ₹ {!actual ? '0' : actual}
                    </Typography>
                    {isEditing ? (
                        <TextField type='number' controls={false} variant='standard' id={type} value={text} onChange={handleChange} onBlur={handleBlur} autoFocus onFocus={(event) => {event.target.select()}}></TextField>
                    ) : (
                        <Typography variant='subtitle2'>
                            Projected ₹ {projected}
                            <Tooltip title='Edit'>
                                <IconButton sx={{padding: '0px 0px 0px 5px'}} onClick={handleLabelClick}>
                                    <Edit fontSize='small'/>
                                </IconButton>
                            </Tooltip>  
                        </Typography>
                    )}
                </CardContent>
            </Box>
        </Card>
    )
}

export default BudgetCards