import React, { useEffect, useState } from "react";
import axios from "axios";
import BarGraphAVGENGHrs from "./BarGraphAVGENGHrs";
import VintageGraph from "./VintageGraph";
import BarGraphAuthHeld from "./BarGraphAuthHeld";
import PieChartEFCQTR from "./PieChartEFCQTR";
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
    <div className="row">
        <div className="col-3">
        <BarGraphAVGENGHrs data={data} />
         <VintageGraph data={data} />
        </div>

        <div className="col-3">
            <BarGraphAuthHeld data={data}></BarGraphAuthHeld>
            <PieChartEFCQTR data={data}></PieChartEFCQTR>
        </div>
        <div className="col-3"></div>
    </div>
  );
};

export default Analytics;
