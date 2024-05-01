import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartMSNBRL = ({ data }) => {
  const uniqueTypes = ['QTR I','QTR II','QTR III','QTR IV', 'More'];
  let missionVal = 50;

  const typeCounts = uniqueTypes.map(type => ({
    type,
    count: data.filter(item => {
        switch(type) {
            case uniqueTypes[0]:
                return item['EFC/RDS Fired'] > 0 && (item['EFC/RDS Fired'] + missionVal) <= 62.5;
            case uniqueTypes[1]:
                return item['EFC/RDS Fired'] > 62.5 &&  (item['EFC/RDS Fired'] + missionVal) <= 125;
            case uniqueTypes[2]:
                return item['EFC/RDS Fired'] > 125 &&  (item['EFC/RDS Fired'] + missionVal) <= 187.5;
            case uniqueTypes[3]:
                return item['EFC/RDS Fired'] > 187.5 &&  (item['EFC/RDS Fired'] + missionVal) <= 250;
            case uniqueTypes[4]:
                return  (item['EFC/RDS Fired'] + missionVal) > 250;
            default:
                return false;
        }
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
      <h3 style={{ textAlign: "center" }}>MSN RLIABILITY(BRL)</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartMSNBRL;
