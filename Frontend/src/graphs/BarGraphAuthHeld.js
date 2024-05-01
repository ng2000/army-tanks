import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraphAuthHeld = ({ data }) => {
    console.log(data)

    const equipmentTypes = [...new Set(data.map(item => item["Type of Eqpt"].trim()))];

    let outputHeld = [];
    let outputAuth = [];

    // Example initialization of AuthTankValues
    const AuthTankValues = {
        "Tk T-90": 72,
        "Tk T-72": 22,
        "ICV BMP II": 15,
        // Add more initial values as needed
    };

    // Iterate through each equipment type
    equipmentTypes.forEach(type => {
        // Filter the data for the current equipment type
        const filteredData = data.filter(item => item["Type of Eqpt"].trim() === type);
        console.log(AuthTankValues)
        console.log(AuthTankValues[type])
        console.log(type)
        outputHeld.push(filteredData.length);
        outputAuth.push(AuthTankValues[type] != undefined ? AuthTankValues[type] : filteredData.length);
    });

    const chartData = {
        labels: equipmentTypes, // Use the keys of AuthTankValues as labels
        datasets: [{
            label: 'Auth',
            data: outputAuth, // Use the values of AuthTankValues as data
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }, {
            label: 'Held',
            data: outputHeld,
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
    return <div><h3 style={{textAlign: "center"}}>AUTH/HElD</h3><Bar data={chartData} options={options} /></div>;

};

export default BarGraphAuthHeld;
