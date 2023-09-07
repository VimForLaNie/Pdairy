import React from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { label: 'January', sales: 21, leads: 141 },
  { label: 'February', sales: 35, leads: 79 },
  { label: 'March', sales: 75, leads: 57 },
  { label: 'April', sales: 51, leads: 47 },
  { label: 'May', sales: 41, leads: 63 },
  { label: 'June', sales: 47, leads: 71 }
];

export default function Graphunion() {
  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Charts with recharts library</h2>
      </div>
      <div className="section col-md-6">
        <h3 className="section-title">Line Chart</h3>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 15, right: 15, bottom: 15, left: 0 }}>
              <Tooltip />
              <XAxis dataKey="label" fontSize={20}/>
              <YAxis fontSize={20}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend/>
              <Line type="monotone" dataKey="sales" stroke="#FB8833" />
              <Line type="monotone" dataKey="leads" stroke="#17A8F5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}