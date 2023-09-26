import { Box, Card, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Pie } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend);

const DataVis = () => {
    const {visualizationArray} = useContext(UserContext)
    // console.log(visualizationArray);
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        if (visualizationArray && visualizationArray.length > 0) {
            const labels = visualizationArray.map(item => item.name)
            const data = visualizationArray.map(item => item.amount)
            const backgroundColors = randomColor({ count: data.length });
            const hoverColors = randomColor({ count: data.length, luminosity: 'dark' });
            const newchartData = {
                labels,
                datasets: [{
                    data,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: hoverColors,
                }],
            }
            setChartData(newchartData)
        }
    }, [visualizationArray])
    
    return (
    <Card sx={{my: 3, p: 5, borderRadius: '20px'}}>
        {visualizationArray && chartData && visualizationArray.length > 0 ? (
            <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                tooltip: {
                  position: 'average', // Change the tooltip position (e.g., 'average', 'nearest', 'record', etc.)
                },
                legend: {
                  position: 'bottom', // Change the legend position (e.g., 'top', 'bottom', 'left', 'right')
                  margin: '10px',
                  labels: {
                    padding: 30
                  }
                },
                
              },
            }}/>
        ) : (
            <Typography variant='h6' color='text.primary'>No data available for the current month's expenses.</Typography>
        )}
    </Card>
    )
}

export default DataVis