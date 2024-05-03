import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartOrigin = ({ data }) => {
  const uniqueTypes = [...new Set(data.map(item => item["Issue Type"].trim()))];


  const typeCounts = uniqueTypes.map(type => ({
    type,
    count: data.filter(item => {
      return item["Issue Type"].trim() == type;
    }).length
}));

  const labels = typeCounts.map(item => item.type);
  const counts = typeCounts.map(item => item.count);

  // Predefined set of visually appealing colors
  const backgroundColors = [
    '#FF6384', // Red
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#4BC0C0', // Green
    '#9966FF', // Purple
  ];

  const chartData = {
    labels: labels,
    datasets: [{
      data: counts,
      backgroundColor: backgroundColors,
    }],
  };

  return (
    <div style={{ height: '300px' }}>
      <h3 style={{ textAlign: "center" }}>OrIGIN</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartOrigin;
