import { Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useContext, useState } from 'react'
import { BACKEND_URL } from '../../Utils/Costansts';
import { AppContext } from '../../AppContext';
import axios from 'axios';

export default function CourseWiseStudentAttendanceInAMonth() {
  const {contextData} = useContext(AppContext);
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        setLoading(true);
        axios.post(`${BACKEND_URL}/api/statistics/courseWiseAttendanceOfStudentInAMonth` , {...formData , token : contextData.token})
        .then(res => {
          const resData = res.data.data ;
          const courses=[] , attendanceCount = []
          resData.map(item => {
            courses.push(item.courseTitle)
            attendanceCount.push(item.attendanceCount)
          })
          console.log(courses , attendanceCount)
          setData( {
            categories: courses ,
            series: [
              {
                name: 'Attendance count in this month',
                data: attendanceCount,
              },
            ],
          })
          setLoading(false);
        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        })
    }
    const [formData, setFormData] = useState({
      studentId:"" ,
      monthNumber:""
    });
    const [loading , setLoading] =  useState(false)
    const handleChange=(event)=>{
        const {name , value} = event.target
        setFormData({
            ...formData,
            [name] : Number(value)
        })
    }
    const [data , setData] = useState({});
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
     
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div>
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h6" align="center">Course wise attendance count of a student in a particular month this year</Typography>
        <form onSubmit={handleSubmit}>
      <FormControl variant="outlined" fullWidth>
        <TextField
          id="student-id"
          label="Student ID"
          variant="outlined"
          value={formData.studentId}
          name="studentId"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
        <InputLabel id="month-label">Select Month</InputLabel>
        <Select
          labelId="month-label"
          id="month"
          value={formData.monthNumber}
          name="monthNumber"
          onChange={handleChange}
          label="Select Month"
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={index+1}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
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
