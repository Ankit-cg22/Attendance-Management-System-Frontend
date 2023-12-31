import React, { useState , useContext, useEffect } from 'react';
import { TextField, Button, Grid, Container, CircularProgress } from '@mui/material';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
import { BACKEND_URL } from '../../Utils/Costansts';
import axios from 'axios';
import { AppContext } from '../../AppContext';
import CourseSelectionDropDown from '../CourseSelectionDropDown/CourseSelectionDropDown';

export default function PastDayAttendance() {
  const {contextData} = useContext(AppContext);
  const [studentId, setStudentId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date ,setDate] = useState("")  
  const formatDate = (date)=>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(formatDate(date));
  };
  const [loading , setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formBody = {   studentData : {studentId} , courseId :formData.courseId , date   , token :contextData.token}
    console.log(formBody)
    setLoading(true)
    axios.post(`${BACKEND_URL}/api/attendance/markAttendance` , formBody)
    .then(res => {
        console.log(res.data)
        alert("Attendance Marked")
        setLoading(false)
    })
    .catch(err=>{
        console.log(err)
        alert(err.response.data.error)
        setLoading(false)
    })
  };
  const [courseData , setCourseData] = useState([])

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/course/allCourses`)
    .then(res=>{
      setCourseData(res.data.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  const [formData, setFormData] = useState({
    courseId:"" ,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };
  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <TextField
              label="Student ID"
              variant="outlined"
              fullWidth
              value={studentId}
              onChange={(e) => setStudentId(Number(e.target.value))}
              margin="normal"
            />
            <CourseSelectionDropDown courses={courseData} formData={formData} handleChange={handleChange}/>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                label="Select a Date"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth
                margin="normal"
              />
            </MuiPickersUtilsProvider>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {loading ? <CircularProgress style={{ color: 'white' , margin:"2.25px 47.5px"}} size={20} /> :"Submit"}
            </Button>
        </form>
      </Container>
    </div>
  )
}
