import React, { useContext, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Register from '../Register/Register'
import OptionBar from '../OptionBar/OptionBar'
import DateHighlighter from '../DateHighLighter/DateHighLighter'
import { Card, Typography } from '@mui/material'
import { AppContext } from '../../AppContext'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const {contextData} = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(()=>{
    const role = contextData.user?.role 
    if(role === "admin") navigate("/admin/markAttendance");
    if(role === "student") navigate("/student/report");
    if(role === "parent") navigate("/parent/report");
  },[])

  return (
    <div style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
      <Typography style={{marginTop:"50px", fontSize:"2rem"}}>Welcome to attendance management system</Typography>
    </div>
  )
}
