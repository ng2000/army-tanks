import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import BarGraphAVGENGHrs from "./BarGraphAVGENGHrs";
import VintageGraph from "./VintageGraph";
import BarGraphAuthHeld from "./BarGraphAuthHeld";
import PieChartEFCQTR from "./PieChartEFCQTR";
import BarGraphMSNReliabilityENG from "./BarGraphMSNReliabilityENG";
import PieChartMSNBRL from "./PieChartMSNBRL";
import PieChartOrigin from "./PieChartOrigin";
import './Analytics.css'

const Analytics = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedDIV, setSelectedDIV] = useState(null);
    const [selectedBDE, setSelectedBDE] = useState(null);

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

    const handleSelectionChangeDIV = useCallback((event) => {
        setSelectedDIV(event.target.value);
    }, []);

    const handleSelectionChangeBDE = useCallback((event) => {
        setSelectedBDE(event.target.value);
    }, []);

    const filteredRowData = useMemo(() => {
        let filteredData = data;

        if (selectedUnit) {
            filteredData = filteredData.filter(row => row["Unit"].trim() === selectedUnit.trim());
        }
        if (selectedDIV) {
            filteredData = filteredData.filter(row => row["DIV"].trim() === selectedDIV.trim());
        }
        if (selectedBDE) {
            filteredData = filteredData.filter(row => row["BDE"].trim() === selectedBDE.trim());
        }

        return filteredData;
    }, [selectedUnit, selectedDIV, selectedBDE, data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                marginBottom: '10px',
                background: '#e9e5f0',
                width: '369px',
                margin: '17px 0px 20px 17px',
                padding: '10px',
                border: '1px solid #b78ffd',
                borderRadius: '6px'
            }}>
                <div style={{ marginRight: '10px' }}>
                    <label htmlFor="Unit-select">Unit</label>
                    <select id="Unit-select" value={selectedUnit || ""} onChange={handleSelectionChangeUnit} style={{ marginLeft: '10px' }}>
                        <option value="">All</option>
                        {data &&
                            Array.from(new Set(data.map(row => row["Unit"]))).map(unit => (
                                <option key={unit} value={unit}>{unit}</option>
                            ))}
                    </select>
                </div>
                <div style={{ marginRight: '10px' }}>
                    <label htmlFor="DIV-select">DIV</label>
                    <select id="DIV-select" value={selectedDIV || ""} onChange={handleSelectionChangeDIV} style={{ marginLeft: '10px' }}>
                        <option value="">All</option>
                        {data &&
                            Array.from(new Set(data.map(row => row["DIV"]))).map(div => (
                                <option key={div} value={div}>{div}</option>
                            ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="BDE-select">BDE</label>
                    <select id="BDE-select" value={selectedBDE || ""} onChange={handleSelectionChangeBDE} style={{ marginLeft: '10px' }}>
                        <option value="">All</option>
                        {data &&
                            Array.from(new Set(data.map(row => row["BDE"]))).map(bde => (
                                <option key={bde} value={bde}>{bde}</option>
                            ))}
                    </select>
                </div>
            </div>

            <div className="row">
                <h2>EQPT Profile</h2>

                <div className="col-3 graphContainer" style={{ margin: '10px' }}>
                    <BarGraphAuthHeld data={filteredRowData}></BarGraphAuthHeld>
                </div>

                <div className="col-3 graphContainer" style={{ margin: '10px' }}>
                    <PieChartOrigin data={filteredRowData}></PieChartOrigin>
                </div>
                <div className="col-3 graphContainer" style={{ margin: '10px' }}>
                    <VintageGraph data={filteredRowData} />

                </div>
            </div>
            <div className="row">
                <h2>EQPT Avalability</h2>

                <div className="col-4 graphContainer" style={{ margin: '10px' }}>

                    <BarGraphAVGENGHrs data={filteredRowData} />
                </div>

                <div className="col-4 graphContainer" style={{ margin: '10px' }}>
                    <PieChartEFCQTR data={filteredRowData}></PieChartEFCQTR>
                </div>
                <div className="col-4 graphContainer" style={{ margin: '10px' }}>
                    <BarGraphMSNReliabilityENG data={filteredRowData}></BarGraphMSNReliabilityENG>
                </div>
            </div>
            <div className="row">
                <h2>MSN Reliability</h2>

                <div className="col-4 graphContainer" style={{ margin: '10px' }}>

                    <BarGraphMSNReliabilityENG data={filteredRowData}></BarGraphMSNReliabilityENG>
                </div>

                <div className="col-4 graphContainer" style={{ margin: '10px' }}>
                    <PieChartMSNBRL data={filteredRowData}></PieChartMSNBRL>

                </div>
                <div className="col-4 graphContainer" style={{ margin: '10px' }}>
                    <PieChartMSNBRL data={filteredRowData} ></PieChartMSNBRL>
                </div>
            </div>


        </div>
    );
};

export default Analytics;
