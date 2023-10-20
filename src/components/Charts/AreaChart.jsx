import React from 'react';
import { Area, AreaChart, XAxis, YAxis, Tooltip } from 'recharts';

const AreaChart1 = (props) => {

  return (
    <AreaChart width={800} height={250} data={props.data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="principalPayment" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    <Area type="monotone" dataKey="principalPayment" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    <Area type="monotone" dataKey="totalPayment" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
    <Area type="monotone" dataKey="balance" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
  </AreaChart>
  );
}

export default AreaChart1;
