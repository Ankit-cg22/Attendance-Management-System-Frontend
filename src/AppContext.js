import React, { createContext, useEffect, useMemo, useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SyncIcon from '@mui/icons-material/Sync';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddchartIcon from '@mui/icons-material/Addchart';
import { storeWithTTL , getDataWithTTL } from './Utils/LocalStorage';
import { USER_DATA_LOCAL_STORAGE_KEY } from './Utils/Costansts';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const DEFAULT_DATA = {};
  const [contextData, setContextData] = useState(() => {
    const storedData = getDataWithTTL(USER_DATA_LOCAL_STORAGE_KEY)
    return storedData ? storedData : DEFAULT_DATA;
  });
  useEffect(() => {
    storeWithTTL(USER_DATA_LOCAL_STORAGE_KEY , contextData , 30 * 60 ); // expires after 30 minutes 
  }, [contextData]);
  
  const sideBarOptions = {
    admin : [
      {text:"Mark Attendance" , link: "/admin/markAttendance" , icon : <CheckBoxIcon/>},
      {text:"Add Admin" , link: "/admin/addAdmin" , icon : <PersonAddAltIcon/>},
      {text:"Statistics" , link: "/admin/statistics/enrollment" , icon : <BarChartIcon/>},
      {text:"Enroll Student" , link: "/admin/enroll" , icon:<PersonAddAlt1Icon/>},
      {text:"Evict Student" , link: "/admin/evict" , icon :<PersonAddDisabledIcon/>},
      {text:"Add Course" , link: "/admin/addCourse" , icon:<AddBoxIcon/>} , 
      {text:"Attendance Correction" , link : "/admin/attendanceCorrection" , icon : <ModeEditIcon/>}
    ] , 
    student : [
      {text :"Attendance Report" , link: "/student/report" , icon : <SummarizeIcon/> }, 
      {text:"Update data" , link : "/student/updateData" , icon : <SyncIcon/>} , 
      {text:"Attendance Heatmap" , link:"/student/attendanceHeatMap" , icon : <CalendarMonthIcon/>}
    ],
    parent : [
      {text :"Attendance Report" , link: "/parent/report" ,  icon: <SummarizeIcon/>}
    ],
    statistics: [
      {text:"Enrollment Statistics" , link:"/admin/statistics/enrollment" , icon : <AddchartIcon/>},
      {text:"Student Attendance Statistics" , link:"/admin/statistics/student",icon : <BarChartIcon/>},
      {text:"Course Attendance Statistics" , link:"/admin/statistics/course",icon : <BarChartIcon/>},
      {text:"Student Attendance Statistics(Coursewise)" , link:"/admin/statistics/student-course",icon : <BarChartIcon/>},
    ]

  }

  const providerValue = useMemo(() => ({contextData: contextData , setContextData: setContextData , sideBarOptions : sideBarOptions}) , [contextData , setContextData])

    return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
