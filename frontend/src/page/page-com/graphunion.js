import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './graph.css';
import moment from 'moment';

export default function Graphunion() {
  const [users, setUsers] = useState([]);
  const numCols = 305;
  const colSums = new Array(numCols).fill(0);

  const fetchUserData = () => {
    fetch("../api/getMilkRecords/")
      .then(async (res) => {
        const milkpercow = await res.json();
        const arrmilk = new Array(10); // Create an array with 10 rows
        for (let i = 0; i < 10; i++) {
          arrmilk[i] = new Array(); // For each row, create an array with no initial columns
        }

        let a = moment("09-01-2023 +0000", "MM-DD-YYYY Z").valueOf();
        let b = moment.duration(a, 'milliseconds');
        let starto = Math.floor(b.asDays());

        milkpercow.forEach((data) => {
          let rower = data.cowID;
          const dmy = moment(data.timestamp).format("MM-DD-YYYY");
          let mill = moment(dmy, "MM-DD-YYYY").valueOf();
          let duration = moment.duration(mill, 'milliseconds');
          let coler = Math.floor(duration.asDays()) - starto;
          arrmilk[rower][coler] = data.weight;
        });

        const prediction = new Array(10).fill(0).map(() => []);

        arrmilk.forEach((milkData, index) => {
          if (index === 3) return;
          fetch("../ai/predict_milk", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "data": milkData,
            }),
          })
            .then(async (response) => {
              const result = await response.json();
              result.forEach((milkInDay, idx) => {
                colSums[idx] += milkInDay;
              });
              prediction[index].push(...result);
            });
        });

        fetch("../api/getMilkRecords/")
          .then(async (response) => {
            const result = await response.json();

            // Create an object to store the aggregated data
            const aggregatedData = {};
            console.log(colSums);
            result.forEach((data,dex) => {
              const datetime = moment(data.timestamp).format("DD-MM-YYYY");
              if (aggregatedData[datetime]) {
                aggregatedData[datetime].sumweight += data.weight;
              } else {
                aggregatedData[datetime] = {
                  label: datetime,
                  real: data.weight,
                  predicter: colSums[dex], // Use colSums[0] for demonstration; replace with the desired column
                  sumweight: data.weight,
                };
              }
            });

            // Convert the aggregatedData object into an array
            const formattedData = Object.values(aggregatedData);
            console.log(formattedData);
            setUsers(formattedData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
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
              <Line type="monotone" dataKey="predicter" stroke="#808080" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
