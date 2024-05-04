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
    '#f1af81', // Red
    '#32c9c9', // Blue
    '#a2f3a2', // Yellow
    '#f4dd93', // Green
  ];

  const chartData = {
    labels: labels,
    datasets: [{
      data: counts,
      backgroundColor: backgroundColors,
    }],
  };

  const options = {
    elements: {
      arc: {
        borderWidth: 0 // Remove border from slices
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'right'
      }
    },
    layout: {
    },
    radius: '80%' // Adjust the radius here
  };
  return (
      <div>
        <h3 style={{ textAlign: "center" }}>ORIGIN</h3>
        <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Pie data={chartData} options={options}/>
        </div>
      </div>
  );
};

export default PieChartOrigin;
