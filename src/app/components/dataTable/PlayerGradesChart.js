import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin
import styles from './dataTable.module.css'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

// Register the required components for radar charts
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const PlayerGradesChart = ({ rookieGuideData, filmGrades = [], isSelectedPlayer, name = 'Player' }) => {
    // Extract grades from rookieGuideData
    const { Film_Grade, Analytical_Grade, Landing_Spot, Overall_Grade } = rookieGuideData;

    console.log('this one', rookieGuideData)

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
            
        } else if (value >= 3) {
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
                formatter: (value) => value?.toFixed(1) ?? '0.0', // Display the value with fallback
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
                formatter: (value) => value?.toFixed(1) ?? '0.0',
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
    // console.log('Film Grades:', uniqueFilmGrades);

    // Create filtered data for prospect grades spider chart
    const selectedRookieGuideFields = {
        'Film': rookieGuideData?.Film_Grade || 0,
        'Analytical': rookieGuideData?.Analytical_Grade || 0,
        'Landing Spot': rookieGuideData?.Landing_Spot || 0,
        'Overall': rookieGuideData?.Overall_Grade || 0
    };

    const prospectSpiderData = {
        labels: Object.keys(selectedRookieGuideFields),
        datasets: [{
            label: 'Prospect Grades',
            data: Object.values(selectedRookieGuideFields),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: true,
            pointBackgroundColor: Object.values(selectedRookieGuideFields).map(value => getColor(value)),
            pointBorderColor: Object.values(selectedRookieGuideFields).map(value => getColor(value)),
            pointHoverBackgroundColor: Object.values(selectedRookieGuideFields).map(value => getColor(value)),
            pointHoverBorderColor: Object.values(selectedRookieGuideFields).map(value => getColor(value)),
            pointLabels: Object.values(selectedRookieGuideFields).map(value => value.toFixed(1)),
            pointRadius: 7,
            pointHoverRadius: 7,
        }]
    };

    // Get position from first film grade entry
    const position = filmGrades?.[0]?.Position;

    // Remove duplicate entries (appears data is duplicated in array)
    const uniqueFilmGradesFiltered = filmGrades ? 
        filmGrades.filter((grade, index, self) =>
            index === self.findIndex((t) => t.Metric === grade.Metric)
        ) : [];

    // Get metrics based on position
    let metrics = [];
    if (position === 'QB') {
        metrics = ['Processing', 'Accuracy', 'Arm Talent', 'Pocket', 'Run Threat'];
    } else if (position === 'RB') {
        metrics = ['Vision', 'Collisions', 'Elusiveness', 'Receiving', 'Burst'];
    } else if (position === 'WR') {
        metrics = ['Release', 'Route', 'Receiving', 'YAC', 'Explosiveness'];
    } else if (position === 'TE') {
        metrics = ['Blocking', 'Route', 'Receiving', 'YAC', 'Explosiveness'];
    }

    // Create data object with position-specific metrics
    const processedData = {};
    metrics.forEach(metric => {
        const grade = uniqueFilmGradesFiltered.find(g => g.Metric === metric);
        processedData[metric] = grade ? parseFloat(grade.Grade) : 0;
    });

    console.log('Position:', position);
    console.log('Processed Data:', processedData);

    // Film spider data with point colors
    const filmSpiderData = {
        labels: metrics,
        datasets: [{
            label: 'Film Grades',
            data: metrics.map(metric => processedData[metric]),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: true,
            pointBackgroundColor: metrics.map(metric => getFilmColor(processedData[metric])),
            pointBorderColor: metrics.map(metric => getFilmColor(processedData[metric])),
            pointHoverBackgroundColor: metrics.map(metric => getFilmColor(processedData[metric])),
            pointHoverBorderColor: metrics.map(metric => getFilmColor(processedData[metric])),
            pointLabels: metrics.map(metric => processedData[metric].toFixed(1)),
            pointRadius: 7,
            pointHoverRadius: 7,
        }]
    };

    console.log('Spider Chart Data:', filmSpiderData);

    // Options for prospect grades (0-100 scale)
    const prospectSpiderOptions = {
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                min: 0,
                ticks: {
                    display: false  // Hide the numeric labels
                },
                grid: {
                    color: '#000000'
                },
                angleLines: {
                    color: '#000000'
                },
                pointLabels: {
                    font: {
                        size: 12
                    },
                    color: '#FFFFFF',
                    padding: 15
                }
            }
        },
        plugins: {
            legend: {
                display: true
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`
                }
            },
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold'
                },
                formatter: (value) => value?.toFixed(1) ?? '0.0',
                anchor: 'center',
                align: (context) => {
                    // The first label (index 0) is typically at the top of the radar chart
                    return context.dataIndex === 0 ? 'bottom' : 'top'
                },
                offset: 5
            }
        }
    };

    // Film grades options
    const filmSpiderOptions = {
        scales: {
            r: {
                beginAtZero: true,
                max: 5,
                min: 0,
                ticks: {
                    display: false  // Hide the numeric labels
                },
                grid: {
                    color: '#000000'
                },
                angleLines: {
                    color: '#000000'
                },
                pointLabels: {
                    font: {
                        size: 12
                    },
                    color: '#FFFFFF',
                    padding: 15
                }
            }
        },
        plugins: {
            legend: {
                display: true
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const metric = metrics[context.dataIndex];
                        const grade = uniqueFilmGradesFiltered.find(g => g.Metric === metric);
                        return grade ? 
                            `${metric}: ${grade.Grade} - ${grade.Analysis}` :
                            `${metric}: ${context.raw}`;
                    }
                }
            },
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold'
                },
                formatter: (value) => value?.toFixed(1) ?? '0.0',
                anchor: 'center',
                align: (context) => {
                    // The first label (index 0) is typically at the top of the radar chart
                    return context.dataIndex === 0 ? 'bottom' : 'top'
                },
                offset: 5
            }
        }
    };

    // Grade labels for film grades
    const filmGradeLabels = {
        0: 'No Grade',
        1: 'Poor',
        2: 'Below Average',
        3: 'Average',
        4: 'Above Average',
        5: 'Excellent'
    };

    return (
        <div >
            {isSelectedPlayer && (
                
            
            <div className={styles.chartsWrapper}>
            <div style={{ width: '500px', height: '250px', display: 'flex'} }> {/* Container for the rookie grades chart */}
                <Bar data={data} options={options} plugins={[ChartDataLabels]} className={styles.prospectGradesChart} />
            </div>
            <div style={{ width: '500px', height: '250px', display: 'flex'} }>  
                {uniqueFilmGradesFiltered.length > 0 && ( // Only render the film grades chart if there are unique grades
                <Bar data={filmGradesData} options={filmGradesOptions} plugins={[ChartDataLabels] } /> )}
            
             </div>
             </div>
             )}

            {/* Spider charts with updated headings */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                marginTop: '2rem',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, maxWidth: '400px', height: '300px' }}>
                    <h3 style={{ textAlign: 'left' }}>{name}'s Prospect Grades</h3>
                    <Radar data={prospectSpiderData} options={prospectSpiderOptions} plugins={[ChartDataLabels]} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',flex: 1, maxWidth: '400px', height: '300px' }}>
                    <h3 style={{ textAlign: 'left' }}>{name}'s Film Grades</h3>
                    <Radar data={filmSpiderData} options={filmSpiderOptions} plugins={[ChartDataLabels]} />
                </div>
            </div>
        </div>
    );
};

export default PlayerGradesChart;