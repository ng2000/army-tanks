import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const VintageGraph = ({ data }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Extract first two digits from BA No and group into intervals
    const intervalCounts = {};
    data.forEach(item => {
      const firstTwoDigits = parseInt(item["BA No"].trim().substring(0, 2));
      const decade = firstTwoDigits;
      console.log("decade ",decade)
      intervalCounts[decade] = (intervalCounts[decade] || 0) + 1;
    });
    console.log("intervalCounts ", intervalCounts);
    // Prepare data for chart.js
    const labels = [];
    const counts = [0,0,0,0,0,0];
    for (let i = 80; i <= 130; i += 10) {
      const label = `${i % 100}-${(i + 10) % 100}`;
      labels.push(label);
    }

    const count = [0, 0, 0, 0, 0]; // Initialize array to store counts for each interval

    Object.entries(intervalCounts).forEach(([key, value]) => {
      const parsedKey = parseInt(key); // Convert key to integer
      if (parsedKey >= 80 && parsedKey < 90) {
        count[0] += value; // Increment count for the 80-90 interval
      } else if (parsedKey >= 90 && parsedKey < 100) {
        count[1] += value; // Increment count for the 90-00 interval
      } else if (parsedKey >= 0 && parsedKey < 10) {
        count[2] += value; // Increment count for the 00-10 interval
      } else if (parsedKey >= 10 && parsedKey < 20) {
        count[3] += value; // Increment count for the 10-20 interval
      } else if (parsedKey >= 20 && parsedKey < 30) {
        count[4] += value; // Increment count for the 20-30 interval
      }

      console.log(`Key: ${parsedKey}, Value: ${value}`);
    });

    console.log('Counts:', count);


    // Create chart
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Items',
          data: count,
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // Change color as needed
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return <div><h3 style={{textAlign: "center"}}>VINTAGE</h3><canvas ref={canvasRef} /></div>;

};

export default VintageGraph;
