import React , {useState , useContext, useEffect} from 'react'
import { AppContext } from '../../AppContext';
import axios from 'axios';
import { BACKEND_URL } from '../../Utils/Costansts';
import { Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import DateHighlighter from '../DateHighLighter/DateHighLighter';
import CourseSelectionDropDown from '../CourseSelectionDropDown/CourseSelectionDropDown';

export default function AttendanceDaysHighlight() {
    const {contextData} = useContext(AppContext)
    const [formData, setFormData] = useState({
      courseId : ""
    });
    const [courseData, setCourseData] = useState([]);
    const [loading , setLoading] =  useState(false)
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData)
      setLoading(true)
      axios.post(`${BACKEND_URL}/api/attendance/getReportByCourseId` , {studentData:{studentId:contextData.studentId} , courseId : formData.courseId})
      .then(res=>{
        setAttendanceDates(res.data.dateList)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
      })
    };

    useEffect(()=>{
      axios.get(`${BACKEND_URL}/api/student/enrolledCourses/${contextData.studentId}`)
      .then(res => {
        setCourseData(res.data.data)  
      })
      .catch(err => {
        console.log(err)
      })
    } ,[])

    const [attendanceDates , setAttendanceDates] = useState([])
    return (
      <div>
        
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
          <Typography variant="h6" align="center">Fetch attendance heatmap for any course</Typography>
          <form onSubmit={handleSubmit}>
            
            <CourseSelectionDropDown formData={formData} handleChange={handleChange} courses={courseData}/>
            
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {loading ? <CircularProgress style={{color : "white" , margin:"2.25px 47.5px"}} size={20}/> : "Fetch Attendance Dates"}
            </Button>
          </form>
        <DateHighlighter highlightedDates={attendanceDates} />
        </Container>
      </div>
    );
}
