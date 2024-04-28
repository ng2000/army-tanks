import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from './PieChart';
import BarGraph from './BarGraph';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allData");
        setData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Display loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' ,marginTop: '40px' ,marginBottom: '40px'}}>
      <div style={{ marginRight: '80px' }}>
        <PieChart data={data} />
      </div>
      <div style={{ marginLeft: '80px' }}>
        <BarGraph data={data} />
      </div>
    </div>
  );
};

export default Analytics;
