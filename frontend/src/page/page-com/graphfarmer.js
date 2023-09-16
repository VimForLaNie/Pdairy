import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './graph.css';
import moment from 'moment';

// const data = [
//   { label: '09/2023', income: 3081 },
//   { label: '10/2023',  predicter: 3201 },
//   { label: '11/2023',  predicter: 3765 },
//   { label: '12/2023',  predicter: 3205 },
//   { label: '01/2024',  predicter: 2705 },
//   { label: '02/2024',  predicter: 2402 },
//   { label: '03/2024',  predicter: 2159 },
//   { label: '04/2024',  predicter: 1634 },
//   { label: '05/2024',  predicter: 1576 },
//   { label: '06/2024',  predicter: 1402 },
// ];

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

export default function Graphfarmer() {
  const [users, setUsers] = useState([]);
  const numCols = 305;
  let colSums = new Array(numCols).fill(0);
  let milkpercow;

  let a = moment("08-01-23", "MM-DD-YY").valueOf();
  let b = moment.duration(a, 'milliseconds');
  let starto = Math.floor(b.asDays());

  const fetchUserData = () => {
    fetch("https://iwing.cpe.ku.ac.th/pdairy/api/getMilkRecords/") // iwing.cpe.ku.ac.th/pdairy/api/getMilkRecords/
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
        let colSumsMonth = new Array();
        console.table(colSums);
        let tmp=0;
        let z;
        for(z=0;z<305;z++){
          tmp+=colSums[z];
          if(z%30==0 && z!=0){
            colSumsMonth.push(tmp);
            tmp=0;
          }
        }
        console.log(colSumsMonth);
        let datagraph = new Array(10);
        let i;
        let monthsToAdd;
        for(i=0;i<3;i++){
          monthsToAdd = i;
          let startDate = moment('2023-08', 'YYYY-MM');
          let targetDate = startDate.add(monthsToAdd, 'months');
          let formattedDate = targetDate.format('MM/YYYY');

          datagraph[i]={
            label: formattedDate,
            income: colSumsMonth[i]*21.25,
          };
        }
        for(let j=i;j<10;j++){
          monthsToAdd = j;
          let startDate = moment('2023-08', 'YYYY-MM');
          let targetDate = startDate.add(monthsToAdd, 'months');
          let formattedDate = targetDate.format('MM/YYYY');
          datagraph[j]={
            label: formattedDate,
            predicter: colSumsMonth[j]*21.25,
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
        <div style={{ fontFamily: 'Athiti, sans-serif', fontWeight: 'bold', fontSize: '36px' }}>กราฟแสดงรายได้ต่อเดือน</div>
        <h2></h2>
      </div>
      <div className="section col-md-6">
        <div className="section-title">Income (Bath)</div>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={users} margin={{ top: 15, right: 15, bottom: 15, left: 0 }}>
            <XAxis dataKey="label" fontSize={12} angle={-45} textAnchor="end"/>
            <YAxis fontSize={12}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip contentStyle={{ fontSize: '16px' }}/>
              <Legend verticalAlign="top" iconSize={12} formatter={(value) => <span style={{ fontSize: '20px' }}>{value}</span>} />
              <Bar dataKey="income" fill="#30BE96" />
              <Bar dataKey="predicter" fill="#c7c8c9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
