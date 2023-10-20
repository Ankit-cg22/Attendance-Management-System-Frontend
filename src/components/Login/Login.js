import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { BACKEND_URL } from '../../Utils/Costansts';
import { AppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function Login() {
  const navigate = useNavigate()
  const {contextData , setContextData} = useContext(AppContext)
  const[loading , setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setLoading(true)
    axios.post( `${BACKEND_URL}/api/user/login` , formData)
    .then(res => {
      if(res.data.user.role === "admin-request"){
        alert("Your admin request is pending.")
        navigate("/")
        return
      }
      setContextData(res.data)
      console.log(res.data);
      if(res.data.user.role === "student") navigate("/student/report")
      if(res.data.user.role === "parent") navigate("/parent/report")
      if(res.data.user.role === "admin")navigate("/admin/markAttendance")
      
      setLoading(false)
    })
    .catch(e => {
      console.log(e)
      alert(e.response?.data.error)
      setLoading(false)
    })
  };

  return (
    <div>
      
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          
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
            {loading ? <CircularProgress style={{ color: 'white' , margin:"2.25px 47.5px"}} size={20} /> :"Login"}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Login;
