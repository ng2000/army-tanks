import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import BarGraphAVGENGHrs from "./BarGraphAVGENGHrs";
import VintageGraph from "./VintageGraph";
import BarGraphAuthHeld from "./BarGraphAuthHeld";
import PieChartEFCQTR from "./PieChartEFCQTR";
import BarGraphMSNReliabilityENG from "./BarGraphMSNReliabilityENG";
import PieChartMSNBRL from "./PieChartMSNBRL";
import PieChartOrigin from "./PieChartOrigin";

const Analytics = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUnit, setSelectedUnit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/allData");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSelectionChangeUnit = useCallback((event) => {
        setSelectedUnit(event.target.value);
    }, []);

    const filteredRowData = useMemo(() => {
        if (!selectedUnit) return data;
        return data.filter(row => {
            const unitTrimmed = row["Unit"].trim();
            const selectedUnitTrimmed = selectedUnit.trim();
            return unitTrimmed === selectedUnitTrimmed;
        });
    }, [selectedUnit, data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row">
            <div>
                <label htmlFor="Unit-select">Unit</label>
                <select id="Unit-select" value={selectedUnit || ""} onChange={handleSelectionChangeUnit}>
                    {data &&
                        Array.from(new Set(data.map(row => row["Unit"]))).map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                </select>
            </div>
            <div className="col-3">
                <BarGraphAVGENGHrs data={filteredRowData} />
                <VintageGraph data={filteredRowData} />
                <PieChartOrigin data={filteredRowData}></PieChartOrigin>
            </div>

            <div className="col-3">
                <BarGraphAuthHeld data={filteredRowData}></BarGraphAuthHeld>
                <PieChartEFCQTR data={filteredRowData}></PieChartEFCQTR>
            </div>
            <div className="col-3">
                <BarGraphMSNReliabilityENG data={filteredRowData}></BarGraphMSNReliabilityENG>
                <PieChartMSNBRL data={filteredRowData}></PieChartMSNBRL>
            </div>
        </div>
    );
};

export default Analytics;
