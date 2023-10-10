import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { AppContext } from '../../AppContext';
import { BACKEND_URL } from '../../Utils/Costansts';
import { CircularProgress } from '@mui/material';

function StudentDataUpdateForm() {
  const [loading , setLoading] = useState(false)
  const {contextData , setContextData} = useContext(AppContext)
  const [formData, setFormData] = useState({
    firstName: "Ankit",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    if(contextData.studentId){
      axios.get(`${BACKEND_URL}/api/student/${contextData.studentId}`)
      .then(res => {
        setFormData(res.data.data)
        console.log(formData)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!formData.password){
      alert("If you want to change password then enter the new passoword else enter old password .")
      return;
    }

    const body = {...formData , token : contextData.token}
    setLoading(true)
    axios.post(`${BACKEND_URL}/api/user/update/${contextData.user.userId}` , body)
    .then(res => {
      console.log(res)
      setLoading(false)
      alert("Student data updated successfully.")
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
  };
  return (
    <div>
      
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center">Update Data</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {loading ? <CircularProgress style={{color : "white" , margin:"2.25px 47.5px"}} size={20}/> : "Update"}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default StudentDataUpdateForm;
