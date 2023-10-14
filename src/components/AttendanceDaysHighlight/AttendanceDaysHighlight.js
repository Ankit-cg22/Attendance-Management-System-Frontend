import React , {useState , useContext} from 'react'
import { AppContext } from '../../AppContext';
import axios from 'axios';
import { BACKEND_URL } from '../../Utils/Costansts';
import { Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import DateHighlighter from '../DateHighLighter/DateHighLighter';

export default function AttendanceDaysHighlight() {
    const {contextData} = useContext(AppContext)
    const [formData, setFormData] = useState({
      courseId : ""
    });
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
    const [attendanceDates , setAttendanceDates] = useState([])
    return (
      <div>
        
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
          <Typography variant="h6" align="center">Fetch attendance heatmap for any course</Typography>
          <form onSubmit={handleSubmit}>
            
            <TextField
              fullWidth
              label="Course Id"
              name="courseId"
              type="text"
              value={formData.courseId}
              onChange={handleChange}
              margin="normal"
            />
            
            
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
