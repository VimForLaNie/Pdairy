import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './graph.css';
import moment from 'moment';

export default function Graphunion() {
  const [users, setUsers] = useState([]);

const fetchUserData = () => {
  fetch("../api/getMilkRecords/")
    .then(async (response) => {
      const result = await response.json();
      console.log(result);

      // Create an object to store the aggregated data
      const aggregatedData = {};

      result.forEach((data) => {
        const datetime = moment(data.timestamp).format("DD-MM-YYYY");

        if (aggregatedData[datetime]) {
          aggregatedData[datetime].sumweight += data.weight;
        } else {
          aggregatedData[datetime] = {
            label: datetime,
            real: data.weight,
            sumweight: data.weight,
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
        <div style={{ fontFamily: 'Athiti, sans-serif', fontWeight: 'bold', fontSize: '36px' }}>กราฟแสดงจำนวนน้ำนมต่อวัน</div>
        <h2></h2>
      </div>
      <div className="section col-md-6">
        <div className="section-title">Milk (ml.)</div>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={users} margin={{ top: 15, right: 15, bottom: 15, left: 0 }}>
              <Tooltip />
              <XAxis dataKey="label" fontSize={16} />
              <YAxis fontSize={16} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend />
              <Line type="monotone" dataKey="sumweight" stroke="#237bba" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
