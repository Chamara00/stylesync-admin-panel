import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface Props {
  data: { name: string; count: number }[];
  title: string;
}

const RegistrationChart = ({ data, title }: Props) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="border-none px-10 py-4 bg-font_secondary mr-4 rounded-3xl">
        <div className="text-[20px] font-medium text-font_primary text-center pb-6">{title}</div>
        <div className="flex justify-center">
          <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="count" stroke="white" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default RegistrationChart;
