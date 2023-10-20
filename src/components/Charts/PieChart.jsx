import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FF5733', '#3384FF', '#FFFF33', '#33FF5A', '#FF8C33'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

const PieCharts = (props) => {
  const parsedData = props.data.map((entry, index) => ({
    name: entry.name,
    value: parseFloat(entry.value),
    color: COLORS[index % COLORS.length],
  }));

  return (
    <PieChart width={600} height={400}> {/* Adjust width and height as needed */}
      <Pie
        dataKey="value"
        data={parsedData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        isAnimationActive={false}
      >
        {parsedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieCharts;
