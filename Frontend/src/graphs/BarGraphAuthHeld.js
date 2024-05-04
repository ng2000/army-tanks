import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraphAuthHeld = ({ data }) => {
    const equipmentTypes = [...new Set(data.map(item => item["Type of Eqpt"].trim()))];
    const AuthTankValues = {
        "Tk T-90": 72,
        "Tk T-72": 22,
        "ICV BMP II": 15,
        "MBT ARJUN" : 72
    };

    const equipmentDataMap = new Map();

    equipmentTypes.forEach(type => {
        const filteredData = data.filter(item => item["Type of Eqpt"].trim() === type);
        const authValue = AuthTankValues[type] !== undefined ? AuthTankValues[type] : filteredData.length;
        const heldValue = filteredData.length;
        equipmentDataMap.set(type.toLowerCase(), { auth: authValue, held: heldValue });
    });

    const chartData = {
        labels: equipmentTypes,
        datasets: [{
            label: 'Auth',
            data: equipmentTypes.map(type => equipmentDataMap.get(type.toLowerCase()).auth),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }, {
            label: 'Held',
            data: equipmentTypes.map(type => equipmentDataMap.get(type.toLowerCase()).held),
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

    return (
        <div className="container">
            <h3 className="text-center">AUTH/HELD</h3>
            <div className="row">
                {equipmentTypes.map(type => (
                    <div className="col-md-6 mb-3" key={type}>
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-4">{`${equipmentDataMap.get(type.toLowerCase()).held} / ${equipmentDataMap.get(type.toLowerCase()).auth}`}</h2>
                                <h4 className="card-subtitle mb-2 text-muted">{type ? type.toUpperCase() : type}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarGraphAuthHeld;
