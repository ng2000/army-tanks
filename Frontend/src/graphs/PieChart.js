import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['SER', 'EOA', 'Ser'],
    datasets: [{
      data: [
        data.filter(item => item['SER/R2/EOA/VOR'] === 'SER').length,
        data.filter(item => item['SER/R2/EOA/VOR'] === 'EOA').length,
        data.filter(item => item['SER/R2/EOA/VOR'] === 'Ser').length,
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
    }],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
