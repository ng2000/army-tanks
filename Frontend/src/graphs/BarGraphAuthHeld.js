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

    const equipmentDataMap = new Map();

    equipmentTypes.forEach(type => {
        // Filter the data for the current equipment type
        const filteredData = data.filter(item => item["Type of Eqpt"].trim() === type);

        // Determine auth and held values
        const authValue = AuthTankValues[type] !== undefined ? AuthTankValues[type] : filteredData.length;
        const heldValue = filteredData.length;

        // Save auth and held values to the map
        equipmentDataMap.set(type.toLowerCase(), { auth: authValue, held: heldValue });
    });

    // Now you have a map containing the desired data
    console.log(equipmentDataMap);


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
    return <div><h3 style={{ textAlign: "center" }}>AUTH/HELD</h3>
        <div className='row'>
            <div className='col-6'>
                <h1>
                    {equipmentDataMap.get('TK t-90'.toLowerCase()) ? equipmentDataMap.get('TK t-90'.toLowerCase()).auth : 0}
                    /
                    {equipmentDataMap.get('TK t-90'.toLowerCase()) ? equipmentDataMap.get('TK t-90'.toLowerCase()).held : 0}

                    <br />
                </h1>
                <h3>
                    TK T-90

                </h3>
            </div>
            <div className='col-6'>
                <h1>
                    {equipmentDataMap.get('TK T-72'.toLowerCase()) ? equipmentDataMap.get('TK t-72'.toLowerCase()).auth : 0}
                    /
                    {equipmentDataMap.get('TK T-72'.toLowerCase()) ? equipmentDataMap.get('TK t-72'.toLowerCase()).held : 0}

                    <br />
                </h1>
                <h3>
                    TK T-72

                </h3>
            </div>
        </div>
        <div className='row'>
            <div className='col-6'>
                <h1>
                    {equipmentDataMap.get('MBT ARJUN'.toLowerCase()) ? equipmentDataMap.get('MBT ARJUN'.toLowerCase()).auth : 0}
                    /
                    {equipmentDataMap.get('MBT ARJUN'.toLowerCase()) ? equipmentDataMap.get('MBT ARJUN'.toLowerCase()).held : 0}

                    <br />
                </h1>
                <h3>
                    MBT ARJUN

                </h3>
            </div>
            <div className='col-6'>
                <h1>
                    {equipmentDataMap.get('ICV BMP II'.toLowerCase()) ? equipmentDataMap.get('ICV BMP II'.toLowerCase()).auth : 0}
                    /
                    {equipmentDataMap.get('ICV BMP II'.toLowerCase()) ? equipmentDataMap.get('ICV BMP II'.toLowerCase()).held : 0}

                    <br />
                </h1>
                <h3>
                    ICV BMP II

                </h3>
            </div>
        </div></div>;

};

export default BarGraphAuthHeld;
