import { Bar } from '@ant-design/charts';

const ActiveUsersChart = () => {
  const data = [
    { month: '01', value: 300 },
    { month: '02', value: 450 },
    { month: '03', value: 600 },
    { month: '04', value: 800 },
    { month: '05', value: 750 },
    { month: '06', value: 650 },
    { month: '07', value: 900 },
    { month: '08', value: 1100 },
    { month: '09', value: 1000 },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'value',
    legend: {
      position: 'top-left',
    },
  };

  return <Bar {...config} />;
};

export default ActiveUsersChart;