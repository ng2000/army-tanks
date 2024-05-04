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
    // Step 1: Calculate the sum of all counts
    const totalCount = counts.reduce((sum, count) => sum + count, 0);

    // Step 2: Calculate the percentage of each item
    const percentages = counts.map(count => (count / totalCount) * 100);

  // Predefined set of visually appealing colors
  const backgroundColors = [
    '#f1af81', // Red
    '#32c9c9', // Blue
    '#a2f3a2', // Yellow
    '#f4dd93', // Green
    '#ceb9ef', // Purple
  ];

  const chartData = {
    labels: labels,
    datasets: [{
      data: percentages,
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
            <h3 style={{ textAlign: "center" }}>EFC</h3>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie data={chartData} options={options}/>
            </div>
        </div>
    );
};

export default PieChartEFCQTR;
