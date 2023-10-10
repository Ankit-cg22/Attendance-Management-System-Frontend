import React from 'react'
import { useNavigate } from 'react-router-dom';
import CourseList from '../CourseList/CourseList';

export default function EvictStudent() {
    const navigate = useNavigate();
    const onButtonClick = (item) => {
        console.log(item);
        navigate(`/admin/evictStudent/course/${item.courseId}/${item.courseTitle}`)
    }
  return (
    <div>
        <CourseList buttonText="Evict Students" onButtonClick={onButtonClick}/>
    </div>
  )
}