import React, { useContext, useState } from 'react';
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
import { BACKEND_URL } from '../../Utils/Costansts';
import axios from 'axios';
import { AppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate =useNavigate();
  const {contextData , setContextData} = useContext(AppContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student', // Default role
    childId: 0, // New field for Child ID
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    if(name === "childId") value = Number(value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
   
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(formData.role === 'parent'){
      setFormData({...formData , childId : Number(formData.childId)})
    }
    console.log(formData)
    axios.post( `${BACKEND_URL}/api/user/register` , formData)
    .then(res => {
      console.log(res.data)
      setContextData(res.data)
      if(res.data.user.role === "student") navigate("/student/report")
      if(res.data.user.role === "parent")navigate("/parent/report")
    })
    .catch(e => {
      console.log(e)
    })

  };

  return (
    <div>
      
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center">Register</Typography>
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
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              row
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <FormControlLabel
                value="admin-request"
                control={<Radio />}
                label="Admin Request"
              />
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="parent"
                control={<Radio />}
                label="Parent"
              />
            </RadioGroup>
          </FormControl>
          {(formData.role === 'parent') && (
            <TextField
              fullWidth
              label="Child ID"
              name="childId"
              value={formData.childId}
              onChange={handleChange}
              margin="normal"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Register;
