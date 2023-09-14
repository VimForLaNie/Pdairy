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
        const arrmilk = new Array(10).fill(0).map(() => []); // Initialize a 2D array

        let a = moment("09-01-2023 +0000", "MM-DD-YYYY Z").valueOf();
        let b = moment.duration(a, 'milliseconds');
        let starto = Math.floor(b.asDays());

        milkpercow.forEach((data) => {
          const dmy = moment(data.timestamp).format("MM-DD-YYYY");
          let mill = moment(dmy, "MM-DD-YYYY").valueOf();
          let duration = moment.duration(mill, 'milliseconds');
          let coler = Math.floor(duration.asDays()) - starto;

          // Validate cowID and coler
          if (
            typeof data.cowID === "number" &&
            data.cowID >= 0 &&
            data.cowID < arrmilk.length &&
            typeof coler === "number" &&
            coler >= 0 &&
            coler < numCols
          ) {
            arrmilk[data.cowID][coler] = data.weight;
          }
        });

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

                result.forEach((data) => {
                  let datetime = moment(data.timestamp).format("DD-MM-YYYY");
                  if (aggregatedData[datetime]) {
                    aggregatedData[datetime].sumweight += data.weight;
                  } else {
                    aggregatedData[datetime] = {
                      label: datetime,
                      real: data.weight,
                      sumweight: data.weight,
                    };
                    dex += 1;
                  }
                });

                let astro;
                for (let aa = dex; aa < 305; aa++) {
                  astro = moment(Object.keys(aggregatedData).slice(-1)[0], "DD-MM-YYYY").add(1, 'days');
                  let formattedDate = astro.format('DD-MM-YYYY');
                  aggregatedData[formattedDate] = {
                    label: formattedDate,
                    predicter: colSums[aa],
                  };
                }

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
              <Line type="monotone" dataKey="sumweight" stroke="#237bba" dot={false} />
              <Line type="monotone" dataKey="predicter" stroke="#808080" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
