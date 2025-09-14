import { Line } from '@ant-design/charts';
import { motion } from 'framer-motion';

const SalesOverviewChart = () => {
  const data = [
    { month: 'Apr', value: 100, type: 'Traffic' },
    { month: 'May', value: 200, type: 'Traffic' },
    { month: 'Jun', value: 150, type: 'Traffic' },
    { month: 'Jul', value: 300, type: 'Traffic' },
    { month: 'Aug', value: 500, type: 'Traffic' },
    { month: 'Sep', value: 400, type: 'Traffic' },
    { month: 'Oct', value: 350, type: 'Traffic' },
    { month: 'Nov', value: 450, type: 'Traffic' },
    { month: 'Dec', value: 600, type: 'Traffic' },
    { month: 'Apr', value: 50, type: 'Sales' },
    { month: 'May', value: 100, type: 'Sales' },
    { month: 'Jun', value: 200, type: 'Sales' },
    { month: 'Jul', value: 250, type: 'Sales' },
    { month: 'Aug', value: 300, type: 'Sales' },
    { month: 'Sep', value: 250, type: 'Sales' },
    { month: 'Oct', value: 350, type: 'Sales' },
    { month: 'Nov', value: 400, type: 'Sales' },
    { month: 'Dec', value: 500, type: 'Sales' },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    color: ['#06b6d4', '#8b5cf6'],
    legend: {
      position: 'top-right',
      itemName: {
        style: {
          fill: 'rgba(255, 255, 255, 0.9)',
          fontSize: 14,
          fontWeight: 500
        }
      }
    },
    xAxis: {
      label: {
        style: {
          fill: 'rgba(255, 255, 255, 0.8)',
          fontSize: 12
        }
      },
      line: {
        style: {
          stroke: 'rgba(255, 255, 255, 0.2)'
        }
      }
    },
    yAxis: {
      label: {
        style: {
          fill: 'rgba(255, 255, 255, 0.8)',
          fontSize: 12
        }
      },
      grid: {
        line: {
          style: {
            stroke: 'rgba(255, 255, 255, 0.1)',
            lineDash: [4, 4]
          }
        }
      }
    },
    smooth: true,
    point: {
      size: 4,
      shape: 'circle',
      style: {
        fillOpacity: 0.8,
        stroke: 'rgba(255, 255, 255, 0.9)',
        lineWidth: 2
      }
    },
    lineStyle: {
      lineWidth: 3,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowBlur: 8,
      shadowOffsetY: 2
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <Line {...config} />
    </motion.div>
  );
};

export default SalesOverviewChart;