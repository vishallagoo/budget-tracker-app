import { Autocomplete, Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import firebase from 'firebase/compat/app'
import {database} from 'firebase/compat/database'
import { UserContext } from '../context/UserContext'
import { v4 } from 'uuid'
import { format } from 'date-fns'

const EntryForm = ({handleClose}) => {

    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [entryAmount, setEntryAmount] = useState('')
    const [comment, setComment] = useState('')
    const [categories, setCategories] = useState({})
    const {user} = useContext(UserContext)

    const database = firebase.database();

    useEffect(() => {
        try {
            const dataRef =  database.ref(`/categories`)
            dataRef.on('value', (snapshot) => {
                setCategories(snapshot.val())
            })
          } catch (error) {
            console.log(error);
          }
    }, [])

    const submitEntryForm = async () => {
        if (!entryAmount || !category || !subCategory) {
            alert("Please fill in all required fields.");
            return; // Do not submit if any required field is empty
        }
        const entry_id = v4()
        const payload = {
            entry_id,
            amount: parseFloat(entryAmount),
            category,
            sub_category: subCategory,
            type: category === 'Income' ? 'Cr' : 'Dr',
            comment,
            createdAt: format(new Date(), "dd-MMMM-yyyy HH:mm:ss")
        }
        
        try {
            const database = firebase.database();
            await database.ref(`users/${user.profile?.id}/entries/${entry_id}`).update(payload)
            await handleClose()
        } catch (error) {
            console.log(error);
        }
    }
    const resetForm = () => {
        setEntryAmount('')
        setCategory(null)
        setSubCategory(null)
        setComment('')
    }

    return (
        <Card sx={{borderRadius: '20px'}}>
            <CardHeader title='Add entry details' sx={{px: '30px', mt: '10px'}}/>
            <CardContent>
                <TextField type='number' variant='outlined' label='Enter Amount' value={entryAmount} onChange={(e) => setEntryAmount(e.target.value)} sx={{width: '100%', '& .MuiOutlinedInput-root': {
          borderRadius: '20px'}}}/>
                <Autocomplete value={category} onChange={(event, newValue) => {setCategory(newValue); setSubCategory(null)}} options={Object.keys(categories)}
                renderInput={(params) => <TextField {...params} label='Select Category'/>} sx={{mt: 2, '& .MuiOutlinedInput-root': {
                    borderRadius: '20px'}}}/>
                {category ? (
                    <Autocomplete options={categories[category] || []}  value={subCategory}
                    onChange={(event, newValue) => {setSubCategory(newValue)}}
                    renderInput={(params) => <TextField {...params} label='Select Type'/>} sx={{mt: 2, '& .MuiOutlinedInput-root': {
                        borderRadius: '20px'}}}/>
                ) : ''}
                <TextField type='text' variant='outlined' label='Comments' value={comment} onChange={(e) => setComment(e.target.value)} sx={{width: '100%', mt: 2, '& .MuiOutlinedInput-root': {
          borderRadius: '20px'}}}/>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'right', mb: 2,mx: 2}}>
                <Button sx={{ borderRadius: '20px'}} onClick={resetForm}>Reset</Button>
                <Button variant='contained' sx={{ borderRadius: '20px'}} onClick={submitEntryForm}>Submit</Button>
            </CardActions>
        </Card>
    )
}

export default EntryForm