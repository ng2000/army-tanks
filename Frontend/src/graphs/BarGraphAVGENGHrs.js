import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraphAVGENGHrs = ({ data }) => {
    // Extracting unique types of equipment and their counts
    const equipmentCounts = data.reduce((counts, item) => {
        const typeOfEqpt = item['Type of Eqpt'];
        counts[typeOfEqpt] = (counts[typeOfEqpt] || 0) + 1;
        return counts;
    }, {});

    const equipmentTypes = [...new Set(data.map(item => item["Type of Eqpt"].trim()))];

    let output = [];

    // Iterate through each equipment type
    equipmentTypes.forEach(type => {
        // Filter the data for the current equipment type
        const filteredData = data.filter(item => item["Type of Eqpt"].trim() === type);

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
                equipmentObj[engineType]["value"] += Number(item["Eng Km"]) || 0;
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
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }, {
            label: 'ORG',
            data: orgList,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
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

    return <div><h1 style={{textAlign: "center"}}>AVG ENG HRS</h1><Bar data={chartData} options={options} /></div>;
};

export default BarGraphAVGENGHrs;
