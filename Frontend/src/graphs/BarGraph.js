// BarGraph.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = ({ data }) => {
  const chartData = {
    labels: ['Unit 1A', 'Unit 1B', 'Unit 1C', 'Unit 1D', 'Unit 1E'],
    datasets: [{
      label: 'Engine Hours',
      data: [
        data.reduce((acc, item) => acc + item['Eng Hrs'], 0),
        // You can add similar reducers for other units or data points
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarGraph;
