import React, { createContext, useEffect, useMemo, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const DEFAULT_DATA = {firstName:"Ankit" , lastName : "Das"};
  const [contextData, setContextData] = useState(() => {
    // Check if data exists in local storage and use it, or use a default value
    const storedData = localStorage.getItem('myData');
    return storedData ? JSON.parse(storedData) : DEFAULT_DATA;
  });

  const sideBarOptions = {
    admin : [
      {text:"Mark Attendance" , link: "/admin/markAttendance"},
      {text:"Add Admin" , link: "/admin/addAdmin"},
      {text:"Statistics" , link: "/admin/statistics"},
      {text:"Enroll Student" , link: "/admin/enroll"},
      {text:"Evict Student" , link: "/admin/evict"},
      {text:"Add Course" , link: "/admin/addCourse"}
    ] ,
    student : [
      {text :"Attendance Report" , link: "/student/report" }, 
      {text:"Update data" , link : "/student/updateData"}
    ],
    parent : [
      {text :"Attendance Report" , link: "/parent/report" }
    ]

  }

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem('myData', JSON.stringify(contextData));
  }, [contextData]);
  const providerValue = useMemo(() => ({contextData: contextData , setContextData: setContextData , sideBarOptions : sideBarOptions}) , [contextData , setContextData])
  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
