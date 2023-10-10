import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import List from '../List/List'
import { Typography } from '@mui/material'
import axios from 'axios'
import { BACKEND_URL } from '../../Utils/Costansts'
import { AppContext } from '../../AppContext'

export default function StudentAttendance() {
    
    const {courseId, courseTitle} = useParams()
    const {contextData} = useContext(AppContext)
    const[data, setData] = useState([])
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/course/enrolledStudents/${courseId}`)
        .then(res => {
          console.log(res.data.data)
          setData(res.data.data)

        })
        .catch(err => {
          console.log(err)
        })
      },[])
    const onButtonClick = (arrItem) => {
      const requestBody = {
        studentData : {
          studentId : Number(arrItem.studentId) 
        },
        courseId : Number(courseId) , 
        token : contextData.token
      } 
      axios.post(`${BACKEND_URL}/api/attendance/markAttendance` ,requestBody)
      .then(res=>{
        console.log(res)
        alert("Student Marked Present For Today.")
      })
      .catch(err=>{
        console.log(err)
      })
    }
    const StudentComponent = ({arrItem}) => {
      return(
        <>
          <Typography>{arrItem.studentId}</Typography>
          <Typography>{arrItem.firstName}</Typography>
          <Typography>{arrItem.lastName}</Typography>
        </>
      )
    }
  return (
    <div>
        <Typography align="center">Course : {courseTitle}</Typography>
        <List arr={data} ChildComponent={StudentComponent} buttonText={"Mark Present"} onButtonClick={onButtonClick}/>
    </div>
  )
}
