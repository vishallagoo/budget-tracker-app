import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from '@mui/material'
import { DataGrid  } from '@mui/x-data-grid';
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'

const Entries = () => {

  const {monthlyData} = useContext(UserContext)
  const [expanded, setExpanded] = useState(false)

  const handleChange = (month) => (event, isExpanded) => {
      setExpanded(isExpanded ? month : false)
  }

  return (
    <Box sx={{width: '100%', overflowX: 'hidden', borderRadius: '20px', my: 3, boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.5)'}}>
        {Object.keys(monthlyData).map((header, index) => {
        return (
          <Accordion key={index} expanded={expanded === header} onChange={handleChange(header)}>
            <AccordionSummary expandIcon={<ExpandMore />} id={`${header}-header`}>
              <Typography variant='h6'>{header}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <DataGrid sx={{borderRadius: '20px'}}
              rows={monthlyData[header]}
              columns={[
                // { field: 'entry_id', headerName: 'Entry ID', width: 150},
                { field: 'amount', headerName: 'Amount', width: 150,},
                { field: 'category', headerName: 'Category', width: 150},
                { field: 'sub_category', headerName: 'Sub-Category', width: 150},
                { field: 'comment', headerName: 'Comment', width: 250},
                { field: 'createdAt', headerName: 'Created At', width: 250},
                // Add more columns as needed
              ]} getRowId={(row) => row.entry_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]} disableRowSelectionOnClick
            />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  )
}

export default Entries