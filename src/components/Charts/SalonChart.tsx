import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'Salons',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const valueFormatter = (value: number | null) => `${value}`;

export default function SalonChart() {
  return (
    <BarChart
      dataset={monthlySalonJoinDataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'count', label: 'Monthly Join Count', valueFormatter }]}
      {...chartSetting}
    />
  );
}

const monthlySalonJoinDataset = [
  { month: 'Jan', count: 0 },
  { month: 'Feb', count: 0 },
  { month: 'Mar', count: 0 },
  { month: 'Apr', count: 0 },
  { month: 'May', count: 0 },
  { month: 'Jun', count: 0 },
  { month: 'Jul', count: 6 },
  { month: 'Aug', count: 0 },
  { month: 'Sep', count: 0 },
  { month: 'Oct', count: 0 },
  { month: 'Nov', count: 0 },
  { month: 'Dec', count: 0 },
];
