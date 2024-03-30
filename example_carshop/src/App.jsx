import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import './App.css'
import ListCar from './assets/ListCar'
import AddCar from './assets/AddCar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppBar position="fixed">
      <Toolbar  variant="dense">

        <Typography variant="h6" color="inherit" component="div">
          Car List
        </Typography>

      </Toolbar>
      
      <ListCar />
    </AppBar>
  )
}

export default App
