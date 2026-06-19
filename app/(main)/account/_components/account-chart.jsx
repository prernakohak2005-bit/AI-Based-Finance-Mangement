import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const DATE_RANGES={
  "7D":{label:"Last 7 Days ",days:7},
  "1M":{label:"Last 1 Month",days:30},
  "3M":{label:"Last 1 Month",days:90},
  "6M":{label:"Last 1 Month",days:180},
  ALL:{label:"All Time",days:null},
};

import { RechartsDevtools } from "recharts-devtools";

export const AccountChart = ({transactions}) => {
  const [dateRange,setDateRange]=useState("1M");

  const filteredData= useMemo(()=>{
  const range=DATE_RANGES[dateRange];
  const now=new Date();
  
  },[transactions,dateRange])

  return (
    <div>
      <BarChart
        style={{
          width: '100%',
          maxWidth: '700px',
          maxHeight: '70vh',
          aspectRatio: 1.618,
        }}
        responsive
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
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="pv"
          fill="#8884d8"
          activeBar={{ fill: 'pink', stroke: 'blue' }}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="uv"
          fill="#82ca9d"
          activeBar={{ fill: 'gold', stroke: 'purple' }}
          radius={[10, 10, 0, 0]}
        />
        <RechartsDevtools />
      </BarChart>
    </div>
  );
};