import React from 'react'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { label: 'Jan', real: 21, predict: 41 },
  { label: 'Feb', real: 35, predict: 150 },
  { label: 'Mar', real: 75, predict: 57 },
  { label: 'Apr', real: 51, predict: 47 },
  { label: 'May', real: 41, predict: 63 },
  { label: 'Jun', real: 47, predict: 71 }
];

export default function Recharts() {
  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Charts with recharts library</h2>
      </div>

      <div className="row justify-content-center align-items-center">
      <div className="col-md-6">
        <h4 className="section-title text-center">Line Chart</h4>
        <div className="section-content text-center">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
              <Tooltip />
              <XAxis dataKey="label" fontSize={20}/>
              <YAxis fontSize={20}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend/>
              <Line type="monotone" dataKey="real" stroke="#FB8833"/>
              <Line type="monotone" dataKey="predict" stroke="#17A8F5"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

      <div className="section col-md-6">
        <h4 className="section-title">Bar Chart</h4>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
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