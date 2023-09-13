import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
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
        const result = await response.json();
        console.log(result);
  
        // Create an object to store the aggregated data
        const aggregatedData = {};
  
        result.forEach((data) => {
          const datetime = moment(data.timestamp).format("MM-YYYY");
  
          if (aggregatedData[datetime]) {
            aggregatedData[datetime].sumweight += data.weight;
          } else {
            aggregatedData[datetime] = {
              label: datetime,
              real: data.weight,
              sumweight: data.weight*21,
            };
          }
        });
  
        // Convert the aggregatedData object into an array
        const formattedData = Object.values(aggregatedData);
  
        console.log(formattedData);
        return formattedData;
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  
    useEffect(() => {
      fetchUserData();
    }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1></h1>
        <div className="textshadow" style={{ fontFamily: 'Athiti, sans-serif', fontWeight: 'bold',fontSize:'36px'}}>กราฟแสดงจำนวนเงินต่อเดือน</div>
        <h2></h2>
      </div>
      <div className="section col-md-6">
        <div className="section-title">Income (Bath)</div>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={users} margin={{ top: 15, right: 15, bottom: 15, left: 0 }}>
              <XAxis dataKey="label" fontSize={20}/>
              <YAxis fontSize={20}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
              <Legend/>
              <Bar dataKey="sumweight" fill="#30BE96" />
              {/* <Bar dataKey="predict" fill="#c7c8c9" /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}