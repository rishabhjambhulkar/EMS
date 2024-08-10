import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const AgeDistributionChart = ({ employees }) => {
    const ageRanges = [
        { label: '18-30', min: 18, max: 30 },
        { label: '30-40', min: 30, max: 40 },
        { label: '40-50', min: 40, max: 50 },
        { label: '50-60', min: 50, max: 60 },
    ];

    const ageCounts = ageRanges.map(range => {
        return employees.filter(emp => emp.age >= range.min && emp.age < range.max).length;
    });

    const data = {
        labels: ageRanges.map(range => range.label),
        datasets: [
            {
                label: 'Age Distribution',
                data: ageCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    stepSize: 1, // Ensures only whole numbers are displayed
                    precision: 0, // Ensures the precision is set to 0, so no decimals are displayed
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default AgeDistributionChart;
