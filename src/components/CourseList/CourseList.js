import React, { useEffect, useState } from 'react'
import List from '../List/List'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import axios from 'axios'
import { BACKEND_URL } from '../../Utils/Costansts'

export default function CourseList({buttonText, onButtonClick}) {
  const [data , setData] = useState([])
  
  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/course/allCourses`)
    .then(res => {
       setData(res.data.data)

    })
    .catch(err=>{
      console.log(err)
    })
  })
  const CourseComponent = ({arrItem}) => {
    return (
      <>
      <Typography>{arrItem.courseId}</Typography>
      <Typography>{arrItem.courseTitle}</Typography>
      </>
    )
  }
  return (

    <div>
        <List ChildComponent={CourseComponent} arr={data} buttonText={buttonText} onButtonClick={onButtonClick}/>
    </div>
  )
}
