import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, CircularProgress } from '@mui/material';

const OptionBar = ({ ChildComponent , arrItem, buttonText, onButtonClick }) => {
  const[loading , setLoading] = useState(false)
  return (
    <Card style={{margin: "5px"}}>
       <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems={"center"} >
            <ChildComponent arrItem = {arrItem}/>
            <Button variant="contained" color="primary" onClick={(e)=>{
                onButtonClick(arrItem , setLoading)
            }}>
            {loading ? <CircularProgress style={{color : "white" , margin:"2.25px 47.5px"}} size={20}/> : buttonText}
        </Button>
        </Box>
       </CardContent>
      
    </Card>
  );
};

export default OptionBar;
