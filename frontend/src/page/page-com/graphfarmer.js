import React from 'react'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { label: 'Jan', real: 21, predict: 21 },
  { label: 'Feb', real: 35, predict: 35 },
  { label: 'Mar', real: 75, predict: 57 },
  { label: 'Apr', real: 51, predict: 55 },
  { label: 'May', real: 41, predict: 63 },
  { label: 'Jun', real: 47, predict: 71 }
];

export default function Graphfarmer() {
  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Charts with recharts library</h2>
      </div>

      <div className="section col-md-6">
        <h4 className="section-title">Bar Chart</h4>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 15, right: 15, bottom: 15, left: 0 }}>
              <XAxis dataKey="label" fontSize={20}/>
              <YAxis fontSize={20}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
              <Legend/>
              <Bar dataKey="real" fill="#FB8833" />
              <Bar dataKey="predict" fill="#17A8F5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}