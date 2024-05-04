import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraphMSNReliabilityENG = ({ data }) => {
    console.log(data)
    let missonVal = 130;

    const equipmentTypes = [...new Set(data.map(item => item["Type of Eqpt"].trim()))];

    let outputPMC = [];
    let outputNMC = [];
    let outputFMC = [];

    // Example initialization of AuthTankValues
    const lifeTankValues = {
        "Tk T-90": 500,
        "Tk T-72": 500,
        "ICV BMP II": 500,
        // Add more initial values as needed
    };

    // Iterate through each equipment type
    equipmentTypes.forEach(type => {
        // Filter the data for the current equipment type
        const filteredData = data.filter(item => item["Type of Eqpt"].trim() === type);
        let fmc = filteredData.filter(item=> Number(item["Eng Hrs"]) + missonVal < (lifeTankValues[type] != undefined ? lifeTankValues[type] : 0)).length;
        let pmc = filteredData.filter(item=> Number(item["Eng Hrs"]) + missonVal > (lifeTankValues[type] != undefined ? lifeTankValues[type] : 0)).length;
        let nmc = filteredData.filter(item=> Number(item["Eng Hrs"]) > (lifeTankValues[type] != undefined ? lifeTankValues[type] : 0)).length;

        outputFMC.push(fmc);
        outputPMC.push(pmc);
        outputNMC.push(nmc);
    });
    console.log(outputFMC)
    console.log(outputPMC)
    console.log(outputNMC)

    const chartData = {
        labels: equipmentTypes, // Use the keys of AuthTankValues as labels
        datasets: [{
            label: 'FMC',
            data: outputFMC, // Use the values of AuthTankValues as data
            backgroundColor: '#f1af81',
        }, {
            label: 'PMC',
            data: outputPMC,
            backgroundColor: '#32c9c9',
        },
        {
            label: 'NMC',
            data: outputNMC,
            backgroundColor: 'rgba(53, 99, 135, 0.5)',
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
    return <div><h3 style={{textAlign: "center"}}>ENG</h3><Bar data={chartData} options={options} /></div>;

};

export default BarGraphMSNReliabilityENG;
