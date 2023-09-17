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

async function sumArray(arr){
  let ans = new Array(305).fill(0);
  for(let idx = 0; idx < arr.length; idx ++){
    let milkData = arr[idx];
    // console.log(milkData);
    const response = await fetch("../ai/predict_milk", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "data": milkData,
      }),
    })
    const result = await response.json();
    result.forEach((milkInDay, idx) => {
      ans[idx]+=milkInDay;
    });
  }
  return ans;
};

export default function Graphunion() {
  const [users, setUsers] = useState([]);
  const numCols = 305;
  let colSums = new Array(numCols).fill(0);
  let milkpercow;

  let a = moment("08-01-23", "MM-DD-YY").valueOf();
  let b = moment.duration(a, 'milliseconds');
  let starto = Math.floor(b.asDays());

  const fetchUserData = () => {
    fetch("../api/getMilkRecords/") // iwing.cpe.ku.ac.th/pdairy/api/getMilkRecords/
      .then(async (res) => {
        milkpercow = await res.json();
        const arrmilk = new Array(10); // Create an array with 10 rows
        for (let i = 0; i < 10; i++) {
          arrmilk[i] = new Array(); // For each row, create an array with no initial columns
        }
        for (let i = 0; i < milkpercow.length; i++) {
          let rower = milkpercow[i].cowID-1;
          if(rower>=10 || rower<0 )
            continue;
          if(milkpercow[i].ID < 1402 || milkpercow[i].ID > 2202) // || milkpercow[i].ID > 351 
            continue;
          const dmy = moment(milkpercow[i].timestamp).format("MM-DD-YY");
          let mill = moment(dmy, "MM-DD-YY").valueOf();
          let duration = moment.duration(mill, 'milliseconds');
          let coler = Math.floor(duration.asDays()) - starto + 1;
          // console.log('c',coler);
          arrmilk[rower][coler - 1] = milkpercow[i].weight;
        }
        console.table(arrmilk);

        // arrmilk.forEach((milkData,idx) => {
        colSums = await sumArray(arrmilk);
        console.table(colSums);
        let minreal= 80;
        let datagraph = new Array(305);
        let i;
        let daysToAdd;
        for(i=0;i<minreal;i++){

          daysToAdd = i;
          let startDate = moment('2023-08-01', 'YYYY-MM-DD');
          let targetDate = startDate.add(daysToAdd, 'days');
          let formattedDate = targetDate.format('DD/MM/YY');

          datagraph[i]={
            label: formattedDate,
            milk: colSums[i],
          };
        }
        for(let j=i;j<305;j++){
          
          daysToAdd = j;
          let startDate = moment('2023-08-01', 'YYYY-MM-DD');
          let targetDate = startDate.add(daysToAdd, 'days');
          let formattedDate = targetDate.format('DD/MM/YY');

          datagraph[j]={
            label: formattedDate,
            predicter: colSums[j],
          }
        }
        console.log(datagraph);
        setUsers(datagraph);
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
              <Line type="monotone" dataKey="milk" stroke="#237bba" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="predicter" stroke="#808080" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>  
        </div>
      </div>
    </div>
  );
}
