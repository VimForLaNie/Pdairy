import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './graph.css'
import * as moment from 'moment';
// const data = [
//   { label: 'Jan', real: 21, predict: 21 },
//   { label: 'Feb', real: 35, predict: 35 },
//   { label: 'Mar', real: 75, predict: 57 },
//   { label: 'Apr', real: 51, predict: 55 },
//   { label: 'May', real: 41, predict: 63 },
//   { label: 'Jun', real: 47, predict: 71 }
// ];

export default function Graphfarmer() {
  const [users, setUsers] = useState([])
const fetchUserData = () => {
  fetch("../api/getMilkRecords/")
    .then(async (response) => {
      const result = await response.json()
      console.log(result);
      const graphdata = result.map((data) => { const datetime = moment(data.timestamp, "YYYYMMDD").calendar(); return { 
        label: datetime, 
        real: data.weight,
      }})
      console.log(graphdata);
      return graphdata;
    })
    .then(data => {
      setUsers(data)
    })
}
useEffect(() => {
  fetchUserData()
}, [])
  return (
    <div className="row">
      <div className="col-md-12">
        <h1></h1>
        <div className="textshadow" style={{ fontFamily: 'Athiti, sans-serif', fontWeight: 'bold',fontSize:'36px'}}>กราฟแสดงจำนวนน้ำนมต่อเดือน</div>
        <h2></h2>
      </div>
      <div className="section col-md-6">
      <div className="section-title">Milk (ml.)</div>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={users} margin={{ top: 15, right: 15, bottom: 15, left: 0 }}>
              <Tooltip />
              <XAxis dataKey="label" fontSize={20}/>
              <YAxis fontSize={20}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend/>
              <Line type="monotone" dataKey="real" stroke="#237bba" />
              <Line type="monotone" dataKey="predict" stroke="#8f9090" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}