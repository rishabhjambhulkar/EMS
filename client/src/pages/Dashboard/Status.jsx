

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const StatusDistributionChart = ({ employees }) => {
    const statusData = employees.map(emp => emp.status);
    const statusLabels = [...new Set(statusData)];
    const statusCounts = statusLabels.map(status => statusData.filter(s => s === status).length);

    const data = {
        labels: statusLabels,
        datasets: [
            {
                label: 'Status Distribution',
                data: statusCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} />;
};

export default StatusDistributionChart;
