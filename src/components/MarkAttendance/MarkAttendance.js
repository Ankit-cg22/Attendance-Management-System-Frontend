import React from 'react'
import { useNavigate } from 'react-router-dom';
import CourseList from '../CourseList/CourseList';
export default function MarkAttendance() {
    const navigate = useNavigate();
    const onButtonClick = (arritem , setLoading) => {
        console.log(arritem);
        navigate(`/admin/markAttendance/course/${arritem.courseId}/${arritem.courseTitle}`)
    }
  return (
    <div>
        <CourseList buttonText="Mark Attendance" onButtonClick={onButtonClick}/>
    </div>
  )
}
