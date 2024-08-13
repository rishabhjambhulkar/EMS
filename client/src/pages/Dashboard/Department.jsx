import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DepartmentDistributionChart = ({ employees =[]}) => {
    if (employees.length === 0) {
        return <p>No data available to display.</p>;
    }

    const departmentData = employees.map(emp => emp.department);
    const departmentLabels = [...new Set(departmentData)];
    const departmentCounts = departmentLabels.map(dept => departmentData.filter(d => d === dept).length);

    console.log(departmentData, departmentLabels,departmentCounts);
    const data = {
        labels: departmentLabels,
        datasets: [
            {
                label: 'Department Distribution',
                data: departmentCounts,
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

export default DepartmentDistributionChart;