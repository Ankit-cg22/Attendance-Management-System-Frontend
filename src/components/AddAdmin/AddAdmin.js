import { Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import List from '../List/List'
import { BACKEND_URL } from '../../Utils/Costansts'
import { AppContext } from '../../AppContext'
import axios from 'axios'
export default function AddAdmin() {
    const {contextData , setContextData} = useContext(AppContext)
    const [data , setData] = useState([])
    const onButtonClick = (item) => {
        try {
          axios.post(`${BACKEND_URL}/api/admin/makeAdmin/${item.userId}` , {token : contextData.token})
          .then(res=>{
            console.log(res)
            const newData = data.filter((dataItem) => dataItem.userId !== item.userId);
            setData(newData);
            alert("Successfully made admin.")
          })
          .catch(err=>{
            console.log(err)
          })
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=>{
      console.log(contextData.token);
      axios.post(`${BACKEND_URL}/api/admin/adminRequests` , {token : contextData.token})
      .then(res => {
        console.log(res.data.adminRequests)
        setData(res.data.adminRequests)
      })
      .catch(err => {
        console.log(err)
      })
    },[])
    const AdminComponent = ({arrItem}) => {
      return (
        <>
        <Typography>{arrItem.userId}</Typography>
        <Typography>{arrItem.firstName}</Typography>
        <Typography>{arrItem.lastName}</Typography>
        </>
      )
    }
  return (
    <div>
        <Typography align="center">Admin Requests</Typography>
        <List ChildComponent={AdminComponent} arr={data} buttonText={"Add Admin"} onButtonClick={onButtonClick}/>
    </div>
  )
}
