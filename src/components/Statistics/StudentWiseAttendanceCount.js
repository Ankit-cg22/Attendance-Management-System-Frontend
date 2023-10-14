import { Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../../Utils/Costansts';
import { AppContext } from '../../AppContext';
import CourseSelectionDropDown from '../CourseSelectionDropDown/CourseSelectionDropDown';

export default function StudentWiseAttendanceCount() {
    const months = ['JAN' , 'FEB' , 'MAR' ,'APR' , 'MAY' , 'JUN', 'JUL' , 'AUG' , 'SEP','OCT', 'NOV' , 'DEC' ]
    const {contextData} = useContext(AppContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setLoading(true)
        axios.post(`${BACKEND_URL}/api/statistics/studentAttendancePerCourse` , {...formData, token : contextData.token})
        .then(res=>{
            let values = []
            const resData= res.data.data
            resData.map(arrItem=>{
                values.push(arrItem.attendanceCount)
            })
            setData({
                categories: months,
                series: [
                  {
                    name: 'Attendance count in this year',
                    data:  values
                  },
                ],
              });
              setLoading(false)
        })
        .catch(e=>{
            console.log(e)
            setLoading(false)
            alert(e.response?.data.error)
        })
    }
    const [formData, setFormData] = useState({
      studentId:"" ,
      courseId:""
    });
    const [loading , setLoading] =  useState(false)
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    };
    const [data , setData] =  useState({});
      const options = {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Attendance Count',
        },
        xAxis: {
          categories: data.categories,
        },
        yAxis: {
          title: {
            text: 'Attendance',
          },
        },
        series: data.series,
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

  return (
    <div>
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h6" align="center">Monthwise attendance count of a student in current year</Typography>
        <form onSubmit={handleSubmit}>
          
          <TextField
            fullWidth
            label="Student Id"
            name="studentId"
            type="text"
            value={formData.studentId}
            onChange={handleChange}
            margin="normal"
          />
          <CourseSelectionDropDown courses={courseData} formData={formData} handleChange={handleChange}  />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {loading ? <CircularProgress style={{color : "white" , margin:"2.25px 47.5px"}} size={20}/> : "Fetch Data"}
          </Button>
        </form>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Container>
    </div>
  )
}
