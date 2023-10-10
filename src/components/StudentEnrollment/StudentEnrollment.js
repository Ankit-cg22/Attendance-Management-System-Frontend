import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import List from '../List/List'
import { Typography } from '@mui/material'
import { BACKEND_URL } from '../../Utils/Costansts'
import axios from 'axios'
import { AppContext } from '../../AppContext'

export default function StudentEnrollment() {
  const {courseId, courseTitle} = useParams()
  const {contextData} = useContext(AppContext)
  const[data, setData] = useState([])
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/course/notEnrolledStudents/${courseId}`)
        .then(res => {
          console.log(res.data.data)
          setData(res.data.data)

        })
        .catch(err => {
          console.log(err)
        })
      },[])
    
    const onButtonClick = (arrItem , setLoading) => {
        const requestBody = {
          studentId : Number(arrItem.studentId) , 
          courseId : Number(courseId) , 
          token : contextData.token
        } 
        setLoading(true)
        axios.post(`${BACKEND_URL}/api/enrollment/enrollStudent` ,requestBody)
        .then(res=>{
          console.log(res)
          alert("Student successfully enrolled.")
          const newData = data.filter(item => item.studentId !== arrItem.studentId)
          setData(newData)
          setLoading(false)
        })
        .catch(err=>{
          console.log(err)
          setLoading(false)
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
        <List arr={data} ChildComponent={StudentComponent} buttonText={"Enroll Student"} onButtonClick={onButtonClick}/>
    </div>
  )
}
