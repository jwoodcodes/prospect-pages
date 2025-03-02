import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin
import styles from './dataTable.module.css'

const PlayerGradesChart = ({ rookieGuideData, filmGrades = [] }) => {
    // Extract grades from rookieGuideData
    const { Film_Grade, Analytical_Grade, Landing_Spot, Overall_Grade } = rookieGuideData;

    // Function to determine color based on value
    const getColor = (value) => {
        if (value >= 90) {
            
            return 'oklch(76.47% 0.2763 141.53 / 83.04%)'; // Bright neon green
        } else if (value >= 80) {
            // return 'oklch(44.67% 0.071 203.29)'; // Medium green
            return 'oklch(60.68% 0.2122 141.53 / 94.25%)'; // Medium green
            
        } else if (value >= 70) {
            // return 'oklch(73.24% 0.1554 97.41)'; // Yellow
            // return 'oklch(73.24% 0.1554 97.41)'; // Yellow
            return 'oklch(66.48% 0.1576 120.18 / 94.25%)'; // Yellow
        }
        else {
            return 'oklch(49.33% 0.2092 29.65)'; // Dark red
        }
    };

    const getFilmColor = (value) => {
        if (value >= 4.5) {
            
            return 'oklch(76.47% 0.2763 141.53 / 83.04%)'; // Bright neon green
        } else if (value >= 3.5) {
            // return 'oklch(44.67% 0.071 203.29)'; // Medium green
            return 'oklch(60.68% 0.2122 141.53 / 94.25%)'; // Medium green
            
        } else if (value >= 2.5) {
            // return 'oklch(73.24% 0.1554 97.41)'; // Yellow
            // return 'oklch(73.24% 0.1554 97.41)'; // Yellow
            return 'oklch(66.48% 0.1576 120.18 / 94.25%)'; // Yellow
        }
        else {
            return 'oklch(49.33% 0.2092 29.65)'; // Dark red
        }
    };

    // Function to filter unique film grades by Metric
    const getUniqueFilmGrades = (grades) => {
        const seenMetrics = new Set();
        return grades.filter(grade => {
            if (!seenMetrics.has(grade.Metric)) {
                seenMetrics.add(grade.Metric);
                return true; // Keep this grade
            }
            return false; // Skip duplicates
        });
    };

    // Filter unique film grades
    const uniqueFilmGrades = getUniqueFilmGrades(filmGrades);

    // Data for the chart
    const data = {
        labels: ['Film Grade', 'Analytical Grade', 'Landing Spot', 'Overall Grade'],
        datasets: [
            {
                label: 'Prospect Grades',
                data: [Film_Grade, Analytical_Grade, Landing_Spot, Overall_Grade],
                backgroundColor: [
                    getColor(Film_Grade),
                    getColor(Analytical_Grade),
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
                anchor: 'center', // Position of the label
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

    // Data for the film grades chart
    const filmGradesData = {
        labels: uniqueFilmGrades.map(grade => grade.Metric), // Extract unique metrics as labels
        datasets: [
            {
                label: 'Film Grades',
                data: uniqueFilmGrades.map(grade => grade.Grade), // Extract grades from unique metrics
                backgroundColor: uniqueFilmGrades.map(grade => getFilmColor(grade.Grade)), // Use the same color logic
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Options for the film grades chart
    const filmGradesOptions = {
        plugins: {
            datalabels: {
                anchor: 'center',
                align: 'end',
                formatter: (value) => value.toFixed(1),
                color: 'white',
                font: {
                    weight: 'bold',
                },
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5, // Adjust max value based on expected grades
            },
        },
    };

    // Debugging: Log filmGrades to check its structure
    console.log('Film Grades:', uniqueFilmGrades);

    return (
        <div className={styles.chartsWrapper}>
        <div style={{ width: '500px', height: '250px', display: 'flex'} }> {/* Container for the rookie grades chart */}
            <Bar data={data} options={options} plugins={[ChartDataLabels]} className={styles.prospectGradesChart} />
            {uniqueFilmGrades.length > 0 && ( // Only render the film grades chart if there are unique grades
                <Bar data={filmGradesData} options={filmGradesOptions} plugins={[ChartDataLabels]} /> 
            )}
        </div>
        </div>
    );
};

export default PlayerGradesChart;