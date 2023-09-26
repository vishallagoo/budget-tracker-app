import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Box, Fab, Container, Modal, Typography} from '@mui/material';
import { ThemeProvider } from './theme/ThemeContext';
import {UserContext} from './context/UserContext'
import { Add } from "@mui/icons-material"
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import EntryForm from './components/EntryForm';
import firebase from 'firebase/compat/app'
import SkeletonUI from './components/SkeletonUI';
import Home from './components/Home';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '370px',
  backgroundColor: 'background.paper',
  border: '2px solid background.paper',
  boxShadow: '24',
  borderRadius: '20px',
  m: {xs: 0.25, md: 0}
};

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectedAmounts, setProjectedAmounts] = useState({})
  const [entries, setEntries] = useState({})
  const [monthlyData, setMonthlyData] = useState({});
  const [visualizationArray, setVisualizationArray] = useState([])

  const database = firebase.database();

  const fetchFinancialData = async () => {
    try {
      if (user && user.profile && user.profile.id) {
        const projectedRef =  database.ref(`/users/${user.profile?.id}/projected_budget`)
        projectedRef.on('value', (snapshot) => {
          setProjectedAmounts(snapshot.val())
        })
      }
    } catch (error) {
      console.log(error);
    }

    try {
      if(user && user.profile && user.profile.id) {
        let currentYearEntries = []
          const entriesRef =  database.ref(`/users/${user.profile?.id}/entries`)
          entriesRef.on('value', (snapshot) => {
            const allEntries = snapshot.val()
            if (allEntries) {
              currentYearEntries = Object.values(allEntries).filter((entry) => {
                const createdAt = new Date(entry.createdAt);
                return createdAt.getFullYear() === new Date().getFullYear();;
              })
              setEntries(currentYearEntries)
              setIsLoading(false)
            }
            setIsLoading(false)
          })
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }

  const getMonthlyData = () => {
    const newMonthlyData = {};
    // Iterate through the received data and categorize by month
    if (!entries) {
        return
    }
    //Obtain monthly data from all entries
    Object.keys(entries).forEach((entry) => {
      // console.log(entry);
      const item = entries[entry];
      const monthMatch = item.createdAt.match(/[A-Za-z]+/)
      // Create a key in the newMonthlyData object for each month and year combination
      const monthName = monthMatch[0];
      const categoryKey = `${monthName}`;
      if (!newMonthlyData[categoryKey]) {
        newMonthlyData[categoryKey] = [];
      }
      // newEntry[entry] = item
      // Add the item to the corresponding category
      newMonthlyData[categoryKey].push(item);
    });
    // console.log(newMonthlyData);
    if (Object.keys(newMonthlyData).length === 0) {
      setMonthlyData({}); // You can set it to an empty object or an initial value
    } else {
      setMonthlyData({...newMonthlyData});
    }
  }

  useEffect(() => {
    fetchFinancialData();
  }, [user]);

  useEffect(() => {
    getMonthlyData();
  }, [entries])
  
  useEffect(() => {
    if (localStorage.getItem('User')) {
      setUser(JSON.parse(localStorage.getItem('User')))
    }
  }, [])
// console.log(typeof visualizationArray);
  const handleOpen = () => {setIsModalOpen(true)}
  const handleClose = () => {setIsModalOpen(false)}
  return (
    <ThemeProvider>
      <UserContext.Provider value={{user, setUser, projectedAmounts, entries, monthlyData, visualizationArray, setVisualizationArray}}>
        <Box sx={{ height: '100vh', backgroundColor: 'background.default', overflow: 'auto'}}>
          <Header />
          {!user ? (
            <Container maxWidth='xl' sx={{height: 'calc(100% - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Typography variant='h4' sx={{color: 'text.primary'}}>Sign in to Get Started</Typography>
            </Container>
          ) : (
          <>
          {isLoading ? (<SkeletonUI />) : (
            <>
              <Container maxWidth='xl'>
              <Outlet />
              <Home />
              <Fab variant='extended' color="primary"
                sx={{position: 'fixed', right: 25, bottom: 25, zIndex: 1, p:1}} 
                onMouseEnter={() => {setIsHovered(true)}} 
                onMouseLeave={() => {setIsHovered(false)}}
                onClick={handleOpen}>
                  <Add sx={{fontSize: 30}}/> {isHovered ? 'Add Entry' : ''}
              </Fab>
            </Container>
            <Modal open={isModalOpen} onClose={handleClose}>
              <Grid2 container sx={style}>
                <Grid2 xs={12} md={12} sx={{backgroundColor: 'inherit', borderRadius: 'inherit'}}>
                  <EntryForm handleClose={handleClose}/>
                </Grid2>
              </Grid2>
            </Modal>
            </>
          )}
          </>)}
        </Box>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
