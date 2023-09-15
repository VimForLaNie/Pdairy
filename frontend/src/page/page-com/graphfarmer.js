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

export default function Graphfarmer() {
  const [users, setUsers] = useState([]);
  const numCols = 305;
  const colSums = new Array(numCols).fill(0);
  const lovely=new Array();

  const fetchUserData = () => {
    fetch("../api/getMilkRecords/")
      .then(async (res) => {
        const milkpercow = await res.json();
        const arrmilk = new Array(10).fill(0).map(() => []); // Initialize a 2D array

        let a = moment("09-2023", "MM-YY").valueOf();
        let b = moment.duration(a, 'milliseconds');
        let starto = Math.floor(b.asMonths());

        milkpercow.forEach((data) => {
          const dmy = moment(data.timestamp).format("MM-YY");
          let mill = moment(dmy, "MM-YY").valueOf();
          let duration = moment.duration(mill, 'milliseconds');
          let coler = Math.floor(duration.asMonths()) - starto;

          // Validate cowID and coler
          // if (
          //   typeof data.cowID === "number" &&
          //   data.cowID >= 0 &&
          //   data.cowID < arrmilk.length &&
          //   typeof coler === "number" &&
          //   coler >= 0 &&
          //   coler < numCols
          // ) {
            arrmilk[data.cowID-1][coler] = data.weight;
          // }
        });
        console.log(arrmilk);

        const prediction = new Array(10).fill(0).map(() => []);

        Promise.all(arrmilk.map((milkData) =>
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
                if (!Array.isArray(prediction[idx])) {
                  prediction[idx] = []; // Initialize the array if it's not already an array
                }
                if (colSums[idx] !== undefined) {
                  colSums[idx] += milkInDay;
                }
                prediction[idx].push(milkInDay);
              });
            })
        ))


          .then(() => {
            fetch("../api/getMilkRecords/")
              .then(async (response) => {
                const result = await response.json();
                let dex = 0;
                const aggregatedData = {};
                
                let summary=0;
                for(let love=0;love<300;love++){
                  summary+=colSums[love];
                  if((love)%30==0){
                    lovely[love/30]=summary;
                    summary=0;
                  }
                }

                result.forEach((data) => {
                  let datetime = moment(data.timestamp).format("MM-YY"); // Format to month and year
                  if (aggregatedData[datetime]) {
                    aggregatedData[datetime].income += data.weight*21.25;
                  } else {
                    aggregatedData[datetime] = {
                      label: datetime,
                      real: data.weight,
                      income: data.weight*21.25,
                    };
                    dex += 1;
                  }
                });

                let astro;
                for (let aa = dex; aa < 10; aa++) {
                  astro = moment(Object.keys(aggregatedData).slice(-1)[0], "MM-YY").add(1, 'months'); // Increment by one month
                  let formattedDate = astro.format('MM-YY');
                  aggregatedData[formattedDate] = {
                    label: formattedDate,
                    predicter: lovely[aa],
                  };
                }
                console.log(lovely);
                console.log(aggregatedData);
                // Convert the aggregatedData object into an array
                const formattedData = Object.values(aggregatedData);
                setUsers(formattedData);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
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
