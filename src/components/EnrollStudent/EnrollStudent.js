import React from 'react'
import { useNavigate } from 'react-router-dom';
import CourseList from '../CourseList/CourseList';

export default function EnrollStudent() {
    const navigate = useNavigate();
    const onButtonClick = (item) => {
        console.log(item);
        navigate(`/admin/enrollStudent/course/${item.courseId}`)
    }
  return (
    <div>
        <CourseList  buttonText="Enroll Students" onButtonClick={onButtonClick}/>
    </div>
  )
}