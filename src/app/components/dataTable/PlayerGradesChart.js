import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin

const PlayerGradesChart = ({ rookieGuideData }) => {
    // Extract grades from rookieGuideData
    const { Film_Grade, Landing_Spot, Overall_Grade } = rookieGuideData;

    // Function to determine color based on value
    const getColor = (value) => {
        if (value >= 90) {
            return 'rgba(57, 255, 20, 0.8)'; // Bright neon green
        } else if (value >= 80) {
            return 'rgba(144, 238, 144, 0.6)'; // Medium green
        } else if (value >= 70) {
            return 'rgba(255, 206, 86, 0.6)'; // Yellow
        } else if (value >= 60) {
            return 'rgba(255, 165, 0, 0.6)'; // Orange
        } else if (value >= 50) {
            return 'rgba(255, 99, 132, 0.6)'; // Light red
        } else {
            return 'rgba(255, 0, 0, 0.6)'; // Dark red
        }
    };

    // Data for the chart
    const data = {
        labels: ['Film Grade', 'Landing Spot', 'Overall Grade'],
        datasets: [
            {
                label: 'Rookie Guide Grades',
                data: [Film_Grade, Landing_Spot, Overall_Grade],
                backgroundColor: [
                    getColor(Film_Grade),
                    getColor(Landing_Spot),
                    getColor(Overall_Grade),
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options for the chart
    const options = {
        plugins: {
            // title: {
            //     display: true,
            //     text: 'Rookie Guide Grades', // Title text
            //     padding: {
            //         bottom: 20, // Add bottom margin to the title
            //     },
            // },
            datalabels: {
                anchor: 'end', // Position of the label
                align: 'end', // Align the label
                formatter: (value) => value.toFixed(1), // Display the value
                color: 'white', // Color of the label text
                font: {
                    weight: 'bold', // Make the font bold
                },
                display: true, // Ensure labels are always displayed
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100, // Set max value to 100
            },
        },
    };

    return (
        <div style={{ width: '500px', height: '400px', margin: '0 auto'}}> {/* Container for the chart */}
            <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
    );
};

export default PlayerGradesChart;