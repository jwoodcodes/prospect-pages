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

const PlayerGradesChart = ({ 
    rookieGuideData, 
    filmGrades = [], 
    isSelectedPlayer, 
    name = 'Player', 
    comparePlayerData,
    spiderComparePlayers = [],
    spiderSearchValue,
    onSpiderSearchChange,
    onSpiderPlayerSelect,
    onRemoveSpiderPlayer,
    allPlayers,
    mainPlayerName,
    spiderComparePlayersList
}) => {
    // Extract grades from rookieGuideData
    const { Film_Grade, Analytical_Grade, Landing_Spot, Overall_Grade } = rookieGuideData;

    // Get position from first film grade entry
    const position = filmGrades?.[0]?.Position;

    // Define metrics based on position first
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

    // console.log('this one', rookieGuideData)

    

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
            
        }  else if (value >= 4) {
            // return 'oklch(44.67% 0.071 203.29)'; // Medium green
            return 'oklch(60.68% 0.2122 141.53 / 94.25%)'; // Medium green
            
        }
         else if (value >= 3.5) {
            // return 'oklch(44.67% 0.071 203.29)'; // Medium green
            return 'oklch(63.58% 0.1849 130.85 / 94.25%)'; // Yellow green
            
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

    // Modify the data object for the prospect grades bar chart
    const data = {
        labels: ['Film Grade', 'Analytical Grade', 'Landing Spot', 'Overall Grade'],
        datasets: [
            {
                label: name,
                data: [Film_Grade, Analytical_Grade, Landing_Spot, Overall_Grade],
                backgroundColor: [
                    getColor(Film_Grade),
                    getColor(Analytical_Grade),
                    getColor(Landing_Spot),
                    getColor(Overall_Grade),
                ],
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            },
            comparePlayerData && {
                label: comparePlayerData.name,
                data: [
                    comparePlayerData.rookieGuideData.Film_Grade,
                    comparePlayerData.rookieGuideData.Analytical_Grade,
                    comparePlayerData.rookieGuideData.Landing_Spot,
                    comparePlayerData.rookieGuideData.Overall_Grade
                ],
                backgroundColor: [
                    getColor(comparePlayerData.rookieGuideData.Film_Grade),
                    getColor(comparePlayerData.rookieGuideData.Analytical_Grade),
                    getColor(comparePlayerData.rookieGuideData.Landing_Spot),
                    getColor(comparePlayerData.rookieGuideData.Overall_Grade),
                ],
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            }
        ].filter(Boolean)
    };

    // Modify the film grades data
    const filmGradesData = {
        labels: uniqueFilmGrades.map(grade => grade.Metric),
        datasets: [
            {
                label: name,
                data: uniqueFilmGrades.map(grade => grade.Grade),
                backgroundColor: uniqueFilmGrades.map(grade => getFilmColor(grade.Grade)),
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            },
            comparePlayerData && {
                label: comparePlayerData.name,
                data: getUniqueFilmGrades(comparePlayerData.filmGrades)
                    .map(grade => grade.Grade),
                backgroundColor: getUniqueFilmGrades(comparePlayerData.filmGrades)
                    .map(grade => getFilmColor(grade.Grade)),
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            }
        ].filter(Boolean)
    };

    // Helper function to get initials from name
    const getInitials = (playerName) => {
        return playerName
            .split(' ')
            .map(word => word[0])
            .join('');
    };

    // Add this helper function at the top of the component
    const safeNumber = (value) => {
        return typeof value === 'number' && !isNaN(value) ? value : 0;
    };

    // Update the options for prospect grades chart
    const options = {
        responsive: true,
        maintainAspectRatio: false, // This allows us to control height independently
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: 'center',
                align: 'end',
                formatter: (value, context) => {
                    const playerName = context.dataset.label;
                    const initials = getInitials(playerName || '');
                    const safeValue = safeNumber(value);
                    return `${initials}\n${safeValue.toFixed(1)}`;
                },
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 10,
                },
                padding: 6, // Add some padding to prevent label cutoff
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    padding: 2, // Add padding to y-axis ticks
                },
            },
            x: {
                grid: {
                    offset: true
                }
            }
        },
        layout: {
            padding: {
                top: 20, // Add padding to the top of the chart
                right: 5,
                left: 5,
                bottom: 10
            }
        },
        barPercentage: 0.8,
        categoryPercentage: 0.9,
    };

    // Update the options for film grades chart
    const filmGradesOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: 'center',
                align: 'end',
                formatter: (value, context) => {
                    const playerName = context.dataset.label;
                    const initials = getInitials(playerName);
                    return `${initials}\n${value?.toFixed(1)}`;
                },
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 10,
                },
                padding: 6,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                ticks: {
                    padding: 2,
                },
            },
            x: {
                grid: {
                    offset: true
                }
            }
        },
        layout: {
            padding: {
                top: 20,
                right: 5,
                left: 5,
                bottom: 10
            }
        },
        barPercentage: 0.8,
        categoryPercentage: 0.9,
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

    // Now define the compare spider data after metrics is defined
    const compareProspectSpiderData = comparePlayerData ? {
        labels: Object.keys(selectedRookieGuideFields),
        datasets: [{
            label: 'Prospect Grades',
            data: [
                safeNumber(comparePlayerData.rookieGuideData?.Film_Grade),
                safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade),
                safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot),
                safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade)
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: true,
            pointBackgroundColor: [
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Film_Grade)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade))
            ],
            pointBorderColor: [
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Film_Grade)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade))
            ],
            pointHoverBackgroundColor: [
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Film_Grade)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade))
            ],
            pointHoverBorderColor: [
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Film_Grade)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot)),
                getColor(safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade))
            ],
            pointLabels: [
                safeNumber(comparePlayerData.rookieGuideData?.Film_Grade).toFixed(1),
                safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade).toFixed(1),
                safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot).toFixed(1),
                safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade).toFixed(1)
            ],
            pointRadius: 7,
            pointHoverRadius: 7,
        }]
    } : null;

    const compareFilmSpiderData = comparePlayerData ? {
        labels: metrics,
        datasets: [{
            label: 'Film Grades',
            data: metrics.map(metric => {
                const grade = getUniqueFilmGrades(comparePlayerData.filmGrades).find(g => g.Metric === metric);
                return grade ? grade.Grade : 0;
            }),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: true,
            pointBackgroundColor: metrics.map(metric => {
                const grade = getUniqueFilmGrades(comparePlayerData.filmGrades).find(g => g.Metric === metric);
                return getFilmColor(grade ? grade.Grade : 0);
            }),
            pointBorderColor: metrics.map(metric => {
                const grade = getUniqueFilmGrades(comparePlayerData.filmGrades).find(g => g.Metric === metric);
                return getFilmColor(grade ? grade.Grade : 0);
            }),
            pointHoverBackgroundColor: metrics.map(metric => {
                const grade = getUniqueFilmGrades(comparePlayerData.filmGrades).find(g => g.Metric === metric);
                return getFilmColor(grade ? grade.Grade : 0);
            }),
            pointHoverBorderColor: metrics.map(metric => {
                const grade = getUniqueFilmGrades(comparePlayerData.filmGrades).find(g => g.Metric === metric);
                return getFilmColor(grade ? grade.Grade : 0);
            }),
            pointLabels: metrics.map(metric => {
                const grade = getUniqueFilmGrades(comparePlayerData.filmGrades).find(g => g.Metric === metric);
                return grade ? grade.Grade.toFixed(1) : '0.0';
            }),
            pointRadius: 7,
            pointHoverRadius: 7,
        }]
    } : null;

    // Remove duplicate entries (appears data is duplicated in array)
    const uniqueFilmGradesFiltered = filmGrades ? 
        filmGrades.filter((grade, index, self) =>
            index === self.findIndex((t) => t.Metric === grade.Metric)
        ) : [];

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
                offset:5
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
        <div>
            {/* Add comparison text */}
            {comparePlayerData && (
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: '1rem',
                    fontSize: '1.2rem',
                    color: 'var(--color-orange-primary)'
                }}>
                    Comparing {name} to {comparePlayerData.name}
                </div>
            )}

            {/* Bar Charts Section */}
            {isSelectedPlayer && (
            <div className={styles.chartsWrapper}>
                    <div style={{ width: '500px', height: '300px', display: 'flex' }}>
                <Bar data={data} options={options} plugins={[ChartDataLabels]} className={styles.prospectGradesChart} />
            </div>
                    <div style={{ width: '500px', height: '300px', display: 'flex' }}>
                        {uniqueFilmGradesFiltered.length > 0 && (
                            <Bar data={filmGradesData} options={filmGradesOptions} plugins={[ChartDataLabels]} className={styles.filmGradesChart}/>
                        )}
             </div>
             </div>
             )}

            {/* Spider Chart Selection Form */}
            <form onSubmit={(e) => e.preventDefault()} className={styles.searchForm}>
                <div className={styles.searchInputAndButtonWrapper}>
                    <input
                        type="text"
                        value={spiderSearchValue}
                        onChange={onSpiderSearchChange}
                        placeholder='Add players to compare'
                        className={styles.teamOneSearchInput}
                        disabled={spiderComparePlayersList.length >= 4}
                        
                    />
                </div>
                
                {spiderSearchValue && allPlayers.filter(p => {
                    const searchTerm = spiderSearchValue.toLowerCase();
                    const name = p.Player_Name.toLowerCase();
                    let tempLast = name.split(/\s/);
                    let lastName = tempLast[1];
                    
                    const isAlreadySelected = spiderComparePlayersList.some(selected => 
                        selected.Player_Name === p.Player_Name) || 
                        p.Player_Name === mainPlayerName;

                    return !isAlreadySelected && 
                           (name.startsWith(searchTerm) || lastName.startsWith(searchTerm));
                })
                .slice(0, 15)
                .map(p => (
                    <div
                        onClick={() => onSpiderPlayerSelect(p.Player_Name, p)}
                        key={p.Player_Name}
                        className={styles.selectMenuItem}
                    >
                        {p.Player_Name}
                    </div>
                ))}
            </form>

            {/* Spider Charts Section */}
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '2rem',
                marginTop: '2rem'
            }} className={styles.outerSpiderChartWrapper}>

{spiderComparePlayersList.length > 0 && (
                    <div className={styles.selectedPlayersWrapper}>
                        {spiderComparePlayersList.map(p => (
                            <div key={p.Player_Name} className={styles.selectedPlayerTag}>
                                {p.Player_Name}
                                <button 
                                    onClick={() => onRemoveSpiderPlayer(p.Player_Name)}
                                    className={styles.removePlayerBtn}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {/* Prospect Grades Row */}
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }} className={styles.outerPropsectGradesSpiderWrapper}>
                    {/* Main player's prospect grades */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, maxWidth: '400px', height: '300px' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--color-orange-primary)' }}>{name}</h3>
                    <Radar data={prospectSpiderData} options={prospectSpiderOptions} plugins={[ChartDataLabels]} />
                    </div>

                 
                    
                    {/* Compare players' prospect grades */}
                    {spiderComparePlayers.map((comparePlayer) => {
                        // Add safety check for required data
                        if (!comparePlayer?.rookieGuideData || !comparePlayer?.filmGrades) {
                            return null;
                        }

                        return (
                            <div key={comparePlayer.Player_Name} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, maxWidth: '400px', height: '300px' }}>
                                <h3 style={{ textAlign: 'left', color: 'var(--color-orange-primary)' }}>{comparePlayer.Player_Name}</h3>
                                <Radar 
                                    data={{
                                        labels: Object.keys(selectedRookieGuideFields),
                                        datasets: [{
                                            label: 'Prospect Grades',
                                            data: [
                                                safeNumber(comparePlayer.rookieGuideData?.Film_Grade),
                                                safeNumber(comparePlayer.rookieGuideData?.Analytical_Grade),
                                                safeNumber(comparePlayer.rookieGuideData?.Landing_Spot),
                                                safeNumber(comparePlayer.rookieGuideData?.Overall_Grade)
                                            ],
                                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                            borderColor: 'rgba(255, 99, 132, 1)',
                                            borderWidth: 1,
                                            fill: true,
                                            pointBackgroundColor: [
                                                getColor(safeNumber(comparePlayer.rookieGuideData?.Film_Grade)),
                                                getColor(safeNumber(comparePlayer.rookieGuideData?.Analytical_Grade)),
                                                getColor(safeNumber(comparePlayer.rookieGuideData?.Landing_Spot)),
                                                getColor(safeNumber(comparePlayer.rookieGuideData?.Overall_Grade))
                                            ],
                                            pointBorderColor: [
                                                getColor(safeNumber(comparePlayer.rookieGuideData?.Film_Grade)),
                                                getColor(safeNumber(comparePlayer.rookieGuideData?.Analytical_Grade)),
                                                getColor(safeNumber(comparePlayer.rookieGuideData?.Landing_Spot)),
                                                getColor(safeNumber(comparePlayer.rookieGuideData?.Overall_Grade))
                                            ],
                                            pointRadius: 7,
                                            pointHoverRadius: 7,
                                        }]
                                    }}
                                    options={prospectSpiderOptions} 
                                    plugins={[ChartDataLabels]} 
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Film Grades Row */}
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }} className={styles.outerFilmGradesSpiderWrapper}>
                    {/* Main player's film grades */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, maxWidth: '400px', height: '300px' }}>
                        <h3 style={{ textAlign: 'left', color: 'var(--color-orange-primary)' }}>{name}</h3>
                    <Radar data={filmSpiderData} options={filmSpiderOptions} plugins={[ChartDataLabels]} />
                    </div>

                    {/* Compare players' film grades */}
                    {spiderComparePlayers.map((comparePlayer) => {
                        // Add safety check for required data
                        if (!comparePlayer?.rookieGuideData || !comparePlayer?.filmGrades) {
                            return null;
                        }

                        return (
                            <div key={comparePlayer.Player_Name} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, maxWidth: '400px', height: '300px' }}>
                                <h3 style={{ textAlign: 'left', color: 'var(--color-orange-primary)' }}>{comparePlayer.Player_Name}</h3>
                                <Radar 
                                    data={{
                                        labels: metrics,
                                        datasets: [{
                                            label: 'Film Grades',
                                            data: metrics.map(metric => {
                                                const grade = getUniqueFilmGrades(comparePlayer.filmGrades).find(g => g.Metric === metric);
                                                return grade ? grade.Grade : 0;
                                            }),
                                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                            borderColor: 'rgba(255, 99, 132, 1)',
                                            borderWidth: 1,
                                            fill: true,
                                            pointBackgroundColor: metrics.map(metric => {
                                                const grade = getUniqueFilmGrades(comparePlayer.filmGrades).find(g => g.Metric === metric);
                                                return getFilmColor(grade ? grade.Grade : 0);
                                            }),
                                            pointBorderColor: metrics.map(metric => {
                                                const grade = getUniqueFilmGrades(comparePlayer.filmGrades).find(g => g.Metric === metric);
                                                return getFilmColor(grade ? grade.Grade : 0);
                                            }),
                                            pointRadius: 7,
                                            pointHoverRadius: 7,
                                        }]
                                    }}
                                    options={filmSpiderOptions} 
                                    plugins={[ChartDataLabels]} 
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PlayerGradesChart;