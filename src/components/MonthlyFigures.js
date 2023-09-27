import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useContext, useEffect, useState } from 'react'
import BudgetCards from './BudgetCards'
import { AccountBalanceWallet, Business, CreditCard, CurrencyRupee,  } from '@mui/icons-material'
import SalaryImg from '../assets/001-salary.png'
import ExpenseImg from '../assets/002-accounts.png'
import InvestImg from '../assets/003-saving.png'
import BalanceImg from '../assets/004-wallet.png'
import { format } from 'date-fns'

import { UserContext } from '../context/UserContext'

const MonthlyFigures = () => {
  const {user, projectedAmounts, entries, monthlyData, setVisualizationArray} = useContext(UserContext)
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0)
  
  const calculateActualFigures = () => {
    let income = 0;
    let expense = 0;
    let investments = 0;
    let balance = 0;
    let currentMonth = format(new Date(), "MMMM")
    const currentMonthData = monthlyData[currentMonth]
    if (currentMonthData) {
      let visArrObj = {}
      Object.values(currentMonthData).map((entrydata) => {
        // monthrows.map((entrydata) => {
        // })
        const amount = parseFloat(entrydata.amount);
          if (entrydata.type === 'Dr') {
            if (entrydata.category === 'Expense') {
              expense += amount;
            } else if (entrydata.category === 'Investments') {
              investments += amount;
            }
          } else if (entrydata.type === 'Cr') {
            income += amount;
          }
          
          if (entrydata.category === 'Expense') {
            const subCategory = entrydata.sub_category;
            const amount = entrydata.amount;
        
            if (visArrObj[subCategory]) {
              visArrObj[subCategory] += amount;
            } else {
              visArrObj[subCategory] = amount;
            }
          }
          // console.log(visArrObj);
      })
      // visArr.push(visArrObj)
      const resultArray = []
      Object.entries(visArrObj).map(([name, amount]) => {
        resultArray.push({name, amount})
      })
      // console.log(resultArray);
      setVisualizationArray(resultArray)
    }
    balance = income - (expense + investments)
    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalInvestments(investments);
    setTotalBalance(balance)
  }

  useEffect(() => {
    calculateActualFigures()
  }, [monthlyData])
  return (
    // icon={<CurrencyRupee sx={{fontSize: '50px', color: 'purple'}}/>}
    <Box>
      <Typography variant='h6' color='text.primary' sx={{py:1}}>Current Month's Budget Overview</Typography>
      <Typography color='text.primary' sx={{}}>Click on the pencil icon to edit projected budget.</Typography>
      <Grid2 container spacing={2} sx={{my: 2}}>
        <Grid2 xs={12} sm={6} md={3}>
          <BudgetCards type='projected_income' title='Income' textColor='#4CAF50' projected={projectedAmounts.projected_income} actual={totalIncome} img={SalaryImg} />
        </Grid2>
        <Grid2 xs={12} sm={6} md={3}>
          <BudgetCards type='projected_expense' title='Expense' textColor='#F44336' projected={projectedAmounts.projected_expense} actual={totalExpense} img={ExpenseImg}/>
        </Grid2>
        <Grid2 xs={12} sm={6} md={3}>
          <BudgetCards type='projected_investments' title='Investments' textColor='#2196F3' projected={projectedAmounts.projected_investments} actual={totalInvestments} img={InvestImg}/>
        </Grid2>
        <Grid2 xs={12} sm={6} md={3}>
          <BudgetCards type='projected_balance' title='Balance' textColor='#009688' projected={projectedAmounts.projected_balance} actual={totalBalance} img={BalanceImg} />
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default MonthlyFigures