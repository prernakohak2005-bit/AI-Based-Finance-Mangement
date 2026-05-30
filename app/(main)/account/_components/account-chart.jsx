"use client";

import React from "react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,

} from "recharts";

// Sample Data
const DATE_RANGES={
    "7D":{label :"last 7 days" ,days:7},
    "1M":{label :"last Month" ,days:30},
    "3M":{label :"last 3 Months" ,days:90},
    "6M":{label :"last 6 Months" ,days:180},
    ALL:{label:"ALL TIME",days:null},
};

const AccountChart = () => {
    const [dateRange,setDateRange]=useState("1M");
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="pv"
            fill="#8884d8"
            radius={[10, 10, 0, 0]}
          />

          <Bar
            dataKey="uv"
            fill="#82ca9d"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccountChart;