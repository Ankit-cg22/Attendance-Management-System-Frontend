import React from 'react'
import { useParams } from 'react-router-dom'
import List from '../List/List'
import { Typography } from '@mui/material'

export default function StudentAttendance() {
    const arr = [
        {text : "1" } ,
        {text : "2" } ,
        {text : "3" } ,
        {text : "4" } ,
    ]
    const {courseId} = useParams()
    const onButtonClick = (item) => {
        alert(`Marking student id ${item.text} present for course id ${courseId}`)
    }
  return (
    <div>
        <Typography align="center">Course {courseId}</Typography>
        {/* <List arr={arr} buttonText={"Mark Present"} onButtonClick={onButtonClick}/> */}
    </div>
  )
}
