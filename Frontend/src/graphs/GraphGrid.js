import React, { useCallback, useMemo, useRef, useState, StrictMode, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const GraphGrid = ({ data }) => {
    // Extracting unique types of equipment and their counts
    const equipmentCounts = data.reduce((counts, item) => {
        const typeOfEqpt = item['Type of Eqpt'];
        counts[typeOfEqpt] = (counts[typeOfEqpt] || 0) + 1;
        return counts;
    }, {});

    const onGridReady = useCallback((params) => {
        setTimeout(() => {
            params.api.sizeColumnsToFit();
        }, 100);

    }, []);
    const gridOptions = {
    };
    const defaultColDef = useMemo(() => {
        return {
            editable: false,
            filter: false,
        };
    }, []);
    const equipmentTypes = [...new Set(data.map(item => item["SER/R2/EOA/VOR"].trim()))];
    let list1 = [...new Set(data.map(item => item["SER/R2/EOA/VOR"].trim()))];
    list1 = list1.filter(item => item != 'SER')
    let output = [];
    let outputRowData = [];
    const columns = [
        { headerName: "Eqpt", field: "Eqpt" },
        { headerName: "Assy", field: "Assy" },
        { headerName: "QTY", field: "QTY" },
        { headerName: "VOR/EOA", field: "VOR/EOA" },
        { headerName: "Fwd To", field: "Fwd To" }
      ];


    // Iterate through each equipment type
    list1.forEach(type => {
        // Filter the data for the current equipment type
        const filteredData = data.filter(item => item["SER/R2/EOA/VOR"].trim() === type);

        const assyTypes =  [...new Set(filteredData.map(item => item["Assy"].trim()))]

        assyTypes.forEach(assy => {
            const filteredDataAssy = filteredData.filter(item => item["Assy"].trim() === assy);
            const fwdToTypes =  [...new Set(filteredDataAssy.map(item => item["Fwd To"].trim()))]
            fwdToTypes.forEach(fwdTo => {
                console.log(fwdTo)
                const filteredDataFwdTo = filteredDataAssy.filter(item => item["Fwd To"].trim() === fwdTo);
                let eqptN = "";
                if (filteredDataFwdTo.length > 0) {
                    const firstRowData = filteredDataFwdTo[0];
                    // Now you can use firstRowData as needed
                    console.log(firstRowData);
                    eqptN = firstRowData["Type of Eqpt"];
                }
                let rowData = {"Eqpt":eqptN, "Assy":assy, "QTY":filteredDataFwdTo.length, "VOR/EOA": type, "Fwd To" : fwdTo};
                outputRowData.push(rowData);
            });
        });
        let equipmentObj = {
            OH: { value: 0, count: 0 },
            Org: { value: 0, count: 0 }
        };

        // Iterate through filtered data to count "Org" and "OH" occurrences
        //   filteredData.forEach(item => {
        //     // Increment the count for "Org" or "OH" based on "Engine Org/OH" value
        //     equipmentObj[item["Engine Org/OH"]]["value"] = (equipmentObj[item["Engine Org/OH"]]["value"] || 0) + (item["Eng Km"] || 0);
        //     equipmentObj[item["Engine Org/OH"]]["count"] = (equipmentObj[item["Engine Org/OH"]]["count"] || 0) + 1;
        //   });

        filteredData.forEach(item => {
            // Increment the count for "Org" or "OH" based on "Engine Org/OH" value
            const engineType = item["Engine Org/OH"];
            console.log(engineType)
            if (engineType == "OH" || engineType == "Org") {
                equipmentObj[engineType]["value"] += Number(item["Eng Hrs"]) || 0;
                equipmentObj[engineType]["count"] += 1;

            }
        });
        // Push the formatted object to output array
        output.push({
            "OH": equipmentObj["OH"]["value"] / (equipmentObj["OH"]["count"] == 0 ? 1 : equipmentObj["OH"]["count"]) || 0,
            "ORG": equipmentObj["Org"]["value"] / (equipmentObj["Org"]["count"] == 0 ? 1 : equipmentObj["Org"]["count"]) || 0,
        });
    });

    const ohList = [];
    const orgList = []
    console.log(output)
    output.forEach(item => {
        ohList.push(item.OH)
        orgList.push(item.ORG)
    });
    console.log("ohlist ", ohList)
    console.log("orgList ", orgList)
    // Extracting labels and data for the chart
    const labels = equipmentTypes;
    const dataPoints = Object.values(equipmentCounts);

    // Generating random colors for each label
    const colors = labels.map(() => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate a random hex color code
    });

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'OH',
            data: ohList,
            backgroundColor: '#32c9c9',
        }, {
            label: 'ORG',
            data: orgList,
            backgroundColor: '#f1af81',
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

    return <div><h3 style={{textAlign: "center"}}>OFF RD STATUS</h3>
    <div>
                <div className="ag-theme-quartz-dark">
                    <AgGridReact
                        rowData={outputRowData}
                        columnDefs={columns}
                        defaultColDef={defaultColDef}
                        className="graphGridClass"
                        onGridReady={onGridReady}
                        gridOptions={gridOptions}
                    />
                </div>
            </div>
    </div>;
};

export default GraphGrid;
