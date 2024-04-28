import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from './PieChart';
import BarGraph from './BarGraph';

const Analytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allData");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("data is ", data); // Corrected console.log statement

  return (
    <div>
      {/* Render your chart components */}
      <BarGraph data={data} />
      <PieChart data={data} /> {/* Pass data to PieChart */}
    </div>
  );
};

export default Analytics;