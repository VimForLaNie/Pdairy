import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './graph.css';
import moment from 'moment';

// const users = [
//   { label: 'January',  predicter: 41 },
//   { label: 'February',  predicter: 79 },
//   { label: 'March',  predicter: 57 },
//   { label: 'April', sumweight: 30, predicter: 47 },
//   { label: 'May', sumweight: 45, predicter: 63 },
//   { label: 'June', sumweight: 47, predicter: 71 }
// ];

// users.push({ label: 'July', sumweight: 66, predicter: 77 });

export default function Graphunion() {
  const [users, setUsers] = useState([]);
  const numCols = 305;
  const colSums = new Array(numCols).fill(0);

  const fetchUserData = () => {
    fetch("../api/getMilkRecords/") // iwing.cpe.ku.ac.th/pdairy/api/getMilkRecords/
      .then(async (res) => {
        const milkpercow = await res.json();
        const arrmilk = new Array(10); // Create an array with 10 rows
        for (let i = 0; i < 10; i++) {
          arrmilk[i] = new Array(); // For each row, create an array with no initial columns
        }

        let a = moment("09-01-2023", "MM-DD-YY").valueOf();
        let b = moment.duration(a, 'milliseconds');
        let starto = Math.floor(b.asDays());

        for (let i = 0; i < milkpercow.length; i++) {
          let rower = milkpercow[i].cowID-1;
          if (!Array.isArray(arrmilk[rower])) {
            arrmilk[rower] = []; // Initialize the row if it's not already an array
          }
          const dmy = moment(milkpercow[i].timestamp).format("MM-DD-YY");
          let mill = moment(dmy, "MM-DD-YY").valueOf();
          let duration = moment.duration(mill, 'milliseconds');
          let coler = Math.floor(duration.asDays()) - starto + 1;
          console.log(coler);
          arrmilk[rower][coler] = milkpercow[i].weight;
        }
        console.table(arrmilk);

        const prediction = new Array(10).fill(0).map(() => []);
        arrmilk.forEach((milkData, index) => {
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
                if (!Array.isArray(prediction[index])) {
                  prediction[index] = []; // Initialize the array if it's not already an array
                }
                if (colSums[idx] !== undefined) {
                  colSums[idx] += milkInDay;
                }
                prediction[index].push(milkInDay);
              });
            });
        });


        fetch("../api/getMilkRecords/")
          .then(async (response) => {
            const result = await response.json();
            let dex=0;
            const aggregatedData = {};

            console.table(colSums);
            let astro;
            let counting=1;
            result.forEach((data) => {
              let datetime = moment(data.timestamp).format("DD-MM-YY");
              astro = moment(datetime, "DD-MM-YY");
              console.log("cnt",counting,"r.leng",result.length);
              if (aggregatedData[datetime]) {
                aggregatedData[datetime].sumweight += data.weight;
              } else {
                if(counting==result.length){
                  aggregatedData[datetime] = {
                    label: datetime,
                    real: data.weight,
                    sumweight: data.weight,
                    predicter: data.weight,
                  };
                }
                else{
                  aggregatedData[datetime] = {
                    label: datetime,
                    real: data.weight,
                    sumweight: data.weight,
                  };
                }
                dex+=1;
              }
              counting+=1;
            // const parsedDate = moment(result[dex-1].timestamp).format("DD-MM-YYYY"); 
            });
            console.log(dex);
            for (let aa = dex; aa < 305; aa++) {
              astro.add(1, 'days'); // Increment astro by one day
              let formattedDate = astro.format('DD-MM-YY');
              aggregatedData[formattedDate] = {
                label: formattedDate,
                predicter: colSums[aa],
              };
            }
            // console.log(aggregatedData);
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
        <div className="section-title">Milk (liter)</div>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={users} margin={{ top: 15, right: 15, bottom: 15, left: 0 }} >
              <Tooltip contentStyle={{ fontSize: '16px' }}/>
              <XAxis dataKey="label" fontSize={11} angle={-40} textAnchor="end"/>
              <YAxis fontSize={12}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend verticalAlign="top" iconSize={12} formatter={(value) => <span style={{ fontSize: '20px' }}>{value}</span>} />
              <Line type="monotone" dataKey="sumweight" stroke="#237bba" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="predicter" stroke="#808080" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>  
        </div>
      </div>
    </div>
  );
}
