import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { BACKEND_URL } from '../../Utils/Costansts';
import { AppContext } from '../../AppContext';
import { CircularProgress } from '@mui/material';

function CourseAddForm() {
  const {contextData} = useContext(AppContext)
  const [formData, setFormData] = useState({
    courseTitle : ""
  });
  const [loading , setLoading] =  useState(false)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    axios.post(`${BACKEND_URL}/api/course/create` , {...formData , token: contextData.token})
    .then(res=>{
      console.log(res)
      alert('Course Created Successfully')
      setFormData({courseTitle:""})
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })
  };

  return (
    <div>
      
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center">Create Course</Typography>
        <form onSubmit={handleSubmit}>
          
          <TextField
            fullWidth
            label="Course Title"
            name="courseTitle"
            type="text"
            value={formData.courseTitle}
            onChange={handleChange}
            margin="normal"
          />
          
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {loading ? <CircularProgress style={{color : "white" , margin:"2.25px 47.5px"}} size={20}/> : "Create Course"}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default CourseAddForm;
