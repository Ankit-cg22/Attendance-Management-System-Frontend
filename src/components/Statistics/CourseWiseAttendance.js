import { Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useContext, useEffect, useState } from 'react'
import { BACKEND_URL } from '../../Utils/Costansts';
import { AppContext } from '../../AppContext';
import axios from 'axios';
import CourseSelectionDropDown from '../CourseSelectionDropDown/CourseSelectionDropDown';

export default function CourseWiseAttendaceCount() {
    const months = ['JAN' , 'FEB' , 'MAR' ,'APR' , 'MAY' , 'JUN', 'JUL' , 'AUG' , 'SEP', 'OCT','NOV' , 'DEC' ]
    const {contextData} = useContext(AppContext);
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true)
      axios.post(`${BACKEND_URL}/api/statistics/monthWiseCourseAttendance` , {...formData ,token : contextData.token})
      .then(res => {
        const resData = res.data.data 
        const values = []
        resData.map(item => values.push(item.attendanceCount))
        setLoading(false)
        setData({
          categories: months,
          series: [
            {
              name: 'Attendance count in this year',
              data: values
            },
          ],
        })
      })
      .catch(err => {
        console.log(err);
        setLoading(false)
        alert(err.response?.data.error)
      })
    }
    const [formData, setFormData] = useState({
      courseId:"" ,
    });
    const [loading , setLoading] =  useState(false)
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    };
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
        <Typography variant="h6" align="center">Monthwise attendance count in this particular course in current year</Typography>
        <form onSubmit={handleSubmit}>
          
          <CourseSelectionDropDown courses={courseData} formData={formData} handleChange={handleChange}/>
          
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
