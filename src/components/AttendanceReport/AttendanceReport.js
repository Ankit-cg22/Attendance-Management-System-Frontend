import React , {useContext, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AppContext } from '../../AppContext';
import axios from 'axios';
import { BACKEND_URL } from '../../Utils/Costansts';
export default function AttendanceReport() {
    const {contextData , setContextData} = useContext(AppContext)
    const [report , setReport] = useState([]);
    useEffect(()=>{
       const body = {studentData : {studentId : Number(contextData.user.role==="parent" ? contextData.childId:contextData.studentId)}}
       
        axios.post(`${BACKEND_URL}/api/attendance/getReport` ,body)
        .then(res=>{
          setReport(res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }, [])
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Attendance Report for student ID : {contextData.user.role==="parent" ? contextData.childId :contextData.studentId}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course ID</TableCell>
              <TableCell>Course Title</TableCell>
              <TableCell>Attendance Count</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row) => (
              <TableRow key={row.courseId}>
                <TableCell>{row.courseId}</TableCell>
                <TableCell>{row.courseTitle}</TableCell>
                <TableCell>{row.attendanceCount}</TableCell>
                <TableCell>{(row.attendanceCount/30) >= 0.5  ? '✔' : '⚠'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}