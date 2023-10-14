import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

export default function CourseSelectionDropDown({courses , formData  , handleChange}) {
    
  return (
    <div style={{marginBottom:"15px"}}>
        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
        <InputLabel id="month-label">Select Course</InputLabel>
        <Select
          labelId="course-label"
          id="course"
          value={formData.monthNumber}
          name="courseId"
          onChange={handleChange}
          label="Select Course"
        >
          {courses.map((item, index) => (
            <MenuItem key={index} value={item.courseId}>
              {item.courseTitle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
