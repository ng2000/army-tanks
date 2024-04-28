import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = ({ data }) => {
  // Extracting unique types of equipment and their counts
  const equipmentCounts = data.reduce((counts, item) => {
    const typeOfEqpt = item['Type of Eqpt'];
    counts[typeOfEqpt] = (counts[typeOfEqpt] || 0) + 1;
    return counts;
  }, {});

  // Extracting labels and data for the chart
  const labels = Object.keys(equipmentCounts);
  const dataPoints = Object.values(equipmentCounts);

  // Generating random colors for each label
  const colors = labels.map(() => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate a random hex color code
  });

  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Count',
      data: dataPoints,
      backgroundColor: colors,
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
