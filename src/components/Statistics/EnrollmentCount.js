import React, { Component, useContext, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { BACKEND_URL } from '../../Utils/Costansts';
import { AppContext } from '../../AppContext';

export default function EnrollmentCount() {
  const {contextData} = useContext(AppContext)
  const [data , setData] = useState({
    categories: [],
    series: [
      {
        name: 'Enrollment Count in last 5 months',
        data: [],
      },
    ],
  });

  useEffect(()=>{
    axios.post(`${BACKEND_URL}/api/statistics/enrollmentStats`,{token : contextData.token})
    .then(res=>{
      const resData = res.data.data;

      const titles =[] , values=[]

      resData.map((item , index)=>{
        titles.push(item.courseTitle)
        values.push(item.enrollmentCount)
      })

      setData({
        categories: titles,
        series: [
          {
            name: 'Enrollment Count in last 5 months',
            data: values,
          },
        ],
      })
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Enrollment Count',
    },
    xAxis: {
      categories: data.categories,
    },
    yAxis: {
      title: {
        text: 'Quantity',
      },
    },
    series: data.series,
  };
  return (
    <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

