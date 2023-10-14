import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { AppContext } from '../../AppContext';
export default function Navbar() {
  const {contextData , setContextData} = React.useContext(AppContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6"  sx={{ color:"white" , textDecoration:"none", flexGrow: 1 }}>
            Attendance Management App 
          </Typography>
          {contextData.user ?
          <>
            <Typography>{contextData.user.firstName} {contextData.user.lastName}</Typography>
            <Button component={Link} to="/login" color="primary" style={{ marginLeft:"10px" ,backgroundColor:"white"}} onClick={() => setContextData({})} >Logout</Button>
          </> 
          :
          <>
            <Button component={Link} to="/register" color="primary" style={{ marginLeft:"10px" ,backgroundColor:"white"}}  >Register</Button>
            <Button component={Link} to="/login" color="primary" style={{ marginLeft:"10px" ,backgroundColor:"white"}} >Login</Button>
          </>  
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
