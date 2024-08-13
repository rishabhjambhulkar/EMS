import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

const AddressDistributionChart = ({ employees }) => {
    const addressData = employees.map(emp => emp.address);
    const addressLabels = [...new Set(addressData)];
    const addressCounts = addressLabels.map(address => addressData.filter(a => a === address).length);

    const data = {
        labels: addressLabels,
        datasets: [
            {
                label: 'Address Distribution',
                data: addressCounts,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={data} />;
};


export default AddressDistributionChart