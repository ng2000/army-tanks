import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartEFCQTR = ({ data }) => {
  const uniqueTypes = ['QTR I','QTR II','QTR III','QTR IV', 'More'];

  const typeCounts = uniqueTypes.map(type => ({
    type,
    count: data.filter(item => {
        switch(type) {
            case uniqueTypes[0]:
                return item['EFC/RDS Fired'] > 0 && item['EFC/RDS Fired'] <= 62.5;
            case uniqueTypes[1]:
                return item['EFC/RDS Fired'] > 62.5 && item['EFC/RDS Fired'] <= 125;
            case uniqueTypes[2]:
                return item['EFC/RDS Fired'] > 125 && item['EFC/RDS Fired'] <= 187.5;
            case uniqueTypes[3]:
                return item['EFC/RDS Fired'] > 187.5 && item['EFC/RDS Fired'] <= 250;
            case uniqueTypes[4]:
                return item['EFC/RDS Fired'] > 250;
            default:
                return false;
        }
    }).length
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

export default PieChartEFCQTR;
