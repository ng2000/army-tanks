import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const uniqueTypes = [...new Set(data.map(item => item['Type of Eqpt']))];
  const typeCounts = uniqueTypes.map(type => ({
    type,
    count: data.filter(item => item['Type of Eqpt'] === type).length,
  }));

  const labels = typeCounts.map(item => item.type);
  const counts = typeCounts.map(item => item.count);

  // Function to generate random colors
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  };

  // Generate colors dynamically based on the number of unique types
  const backgroundColors = Array.from({ length: uniqueTypes.length }, generateRandomColor);

  const chartData = {
    labels: labels,
    datasets: [{
      data: counts,
      backgroundColor: backgroundColors,
    }],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
