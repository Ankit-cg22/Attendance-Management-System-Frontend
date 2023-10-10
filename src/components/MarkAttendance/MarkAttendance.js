import React from 'react'
import { useNavigate } from 'react-router-dom';
import CourseList from '../CourseList/CourseList';
export default function MarkAttendance() {
    const navigate = useNavigate();
    const arr=[{text:"Maths" , id : "1"} , {text : "English" , id:"2"} , {text : "Science" , id:"3"} , {text : "Social Studies" , id:"4"},]
    const onButtonClick = (arritem) => {
        console.log(arritem);
        navigate(`/admin/markAttendance/course/${arritem.courseId}/${arritem.courseTitle}`)
    }
  return (
    <div>
        <CourseList arr={arr} buttonText="Mark Attendance" onButtonClick={onButtonClick}/>
    </div>
  )
}
