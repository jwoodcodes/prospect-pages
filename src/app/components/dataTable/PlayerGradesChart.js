import React from "react";
import { Bar, Radar, Scatter } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the data labels plugin
import styles from "./dataTable.module.css";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { useState } from "react"; // Import useState for managing dropdown states

// Register the required components for radar charts
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

const PlayerGradesChart = ({ 
    rookieGuideData, 
    filmGrades = [], 
    isSelectedPlayer, 
  name = "Player",
    comparePlayerData,
    spiderComparePlayers = [],
    spiderSearchValue,
    onSpiderSearchChange,
    onSpiderPlayerSelect,
    onRemoveSpiderPlayer,
    allPlayers,
    mainPlayerName,
  spiderComparePlayersList,
}) => {
    // Extract grades from rookieGuideData
  const { Film_Grade, Analytical_Grade, Landing_Spot, Overall_Grade } =
    rookieGuideData;

    // Get position from first film grade entry
    const position = filmGrades?.[0]?.Position;

    // Define metrics based on position first
    let metrics = [];
  if (position === "QB") {
    metrics = ["Processing", "Accuracy", "Arm Talent", "Pocket", "Run Threat"];
  } else if (position === "RB") {
    metrics = ["Vision", "Collisions", "Elusiveness", "Receiving", "Burst"];
  } else if (position === "WR") {
    metrics = ["Release", "Route", "Receiving", "YAC", "Explosiveness"];
  } else if (position === "TE") {
    metrics = ["Blocking", "Route", "Receiving", "YAC", "Explosiveness"];
    }

    // console.log('this one', rookieGuideData)

    // Function to determine color based on value
    const getColor = (value) => {
        if (value >= 90) {
      return "oklch(76.47% 0.2763 141.53 / 83.04%)"; // Bright neon green
        } else if (value >= 80) {
            // return 'oklch(44.67% 0.071 203.29)'; // Medium green
      return "oklch(60.68% 0.2122 141.53 / 94.25%)"; // Medium green
        } else if (value >= 70) {
            // return 'oklch(73.24% 0.1554 97.41)'; // Yellow
            // return 'oklch(73.24% 0.1554 97.41)'; // Yellow
      return "oklch(66.48% 0.1576 120.18 / 94.25%)"; // Yellow
    } else {
      return "oklch(49.33% 0.2092 29.65)"; // Dark red
        }
    };

    const getFilmColor = (value) => {
        if (value >= 4.5) {
      return "oklch(76.47% 0.2763 141.53 / 83.04%)"; // Bright neon green
    } else if (value >= 4) {
            // return 'oklch(44.67% 0.071 203.29)'; // Medium green
      return "oklch(60.68% 0.2122 141.53 / 94.25%)"; // Medium green
    } else if (value >= 3.5) {
            // return 'oklch(44.67% 0.071 203.29)'; // Medium green
      return "oklch(63.58% 0.1849 130.85 / 94.25%)"; // Yellow green
        } else if (value >= 3) {
            // return 'oklch(73.24% 0.1554 97.41)'; // Yellow
            // return 'oklch(73.24% 0.1554 97.41)'; // Yellow
      return "oklch(66.48% 0.1576 120.18 / 94.25%)"; // Yellow
    } else {
      return "oklch(49.33% 0.2092 29.65)"; // Dark red
        }
    };

    // Function to filter unique film grades by Metric
    const getUniqueFilmGrades = (grades) => {
        const seenMetrics = new Set();
    return grades.filter((grade) => {
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
    labels: ["Film Grade", "Analytical Grade", "Landing Spot", "Overall Grade"],
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
        borderColor: "rgba(0, 0, 0, 1)",
                borderWidth: 1,
            },
            comparePlayerData && {
                label: comparePlayerData.name,
                data: [
                    comparePlayerData.rookieGuideData.Film_Grade,
                    comparePlayerData.rookieGuideData.Analytical_Grade,
                    comparePlayerData.rookieGuideData.Landing_Spot,
          comparePlayerData.rookieGuideData.Overall_Grade,
                ],
                backgroundColor: [
                    getColor(comparePlayerData.rookieGuideData.Film_Grade),
                    getColor(comparePlayerData.rookieGuideData.Analytical_Grade),
                    getColor(comparePlayerData.rookieGuideData.Landing_Spot),
                    getColor(comparePlayerData.rookieGuideData.Overall_Grade),
                ],
        borderColor: "rgba(0, 0, 0, 1)",
                borderWidth: 1,
      },
    ].filter(Boolean),
    };

    // Modify the film grades data
    const filmGradesData = {
    labels: uniqueFilmGrades.map((grade) => grade.Metric),
        datasets: [
            {
                label: name,
        data: uniqueFilmGrades.map((grade) => grade.Grade),
        backgroundColor: uniqueFilmGrades.map((grade) =>
          getFilmColor(grade.Grade)
        ),
        borderColor: "rgba(0, 0, 0, 1)",
                borderWidth: 1,
            },
            comparePlayerData && {
                label: comparePlayerData.name,
        data: getUniqueFilmGrades(comparePlayerData.filmGrades).map(
          (grade) => grade.Grade
        ),
        backgroundColor: getUniqueFilmGrades(comparePlayerData.filmGrades).map(
          (grade) => getFilmColor(grade.Grade)
        ),
        borderColor: "rgba(0, 0, 0, 1)",
                borderWidth: 1,
      },
    ].filter(Boolean),
    };

    // Helper function to get initials from name
    const getInitials = (playerName) => {
        return playerName
      .split(" ")
      .map((word) => word[0])
      .join("");
    };

    // Add this helper function at the top of the component
    const safeNumber = (value) => {
    return typeof value === "number" && !isNaN(value) ? value : 0;
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
        anchor: "center",
        align: "end",
                formatter: (value, context) => {
                    const playerName = context.dataset.label;
          const initials = getInitials(playerName || "");
                    const safeValue = safeNumber(value);
                    return `${initials}\n${safeValue.toFixed(1)}`;
                },
        color: "white",
                font: {
          weight: "bold",
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
          offset: true,
        },
      },
        },
        layout: {
            padding: {
                top: 20, // Add padding to the top of the chart
                right: 5,
                left: 5,
        bottom: 10,
      },
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
        anchor: "center",
        align: "end",
                formatter: (value, context) => {
                    const playerName = context.dataset.label;
                    const initials = getInitials(playerName);
                    return `${initials}\n${value?.toFixed(1)}`;
                },
        color: "white",
                font: {
          weight: "bold",
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
          offset: true,
        },
      },
        },
        layout: {
            padding: {
                top: 20,
                right: 5,
                left: 5,
        bottom: 10,
      },
        },
        barPercentage: 0.8,
        categoryPercentage: 0.9,
    };

    // Debugging: Log filmGrades to check its structure
    // console.log('Film Grades:', uniqueFilmGrades);

    // Create filtered data for prospect grades spider chart
    const selectedRookieGuideFields = {
    Film: rookieGuideData?.Film_Grade || 0,
    Analytical: rookieGuideData?.Analytical_Grade || 0,
    "Landing Spot": rookieGuideData?.Landing_Spot || 0,
    Overall: rookieGuideData?.Overall_Grade || 0,
    };

    const prospectSpiderData = {
        labels: Object.keys(selectedRookieGuideFields),
    datasets: [
      {
        label: "Prospect Grades",
            data: Object.values(selectedRookieGuideFields),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: true,
        pointBackgroundColor: Object.values(selectedRookieGuideFields).map(
          (value) => getColor(value)
        ),
        pointBorderColor: Object.values(selectedRookieGuideFields).map(
          (value) => getColor(value)
        ),
        pointHoverBackgroundColor: Object.values(selectedRookieGuideFields).map(
          (value) => getColor(value)
        ),
        pointHoverBorderColor: Object.values(selectedRookieGuideFields).map(
          (value) => getColor(value)
        ),
        pointLabels: Object.values(selectedRookieGuideFields).map((value) =>
          value.toFixed(1)
        ),
            pointRadius: 7,
            pointHoverRadius: 7,
      },
    ],
    };

    // Now define the compare spider data after metrics is defined
  const compareProspectSpiderData = comparePlayerData
    ? {
        labels: Object.keys(selectedRookieGuideFields),
        datasets: [
          {
            label: "Prospect Grades",
            data: [
                safeNumber(comparePlayerData.rookieGuideData?.Film_Grade),
                safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade),
                safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot),
              safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade),
            ],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: true,
            pointBackgroundColor: [
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Film_Grade)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade)
              ),
            ],
            pointBorderColor: [
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Film_Grade)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade)
              ),
            ],
            pointHoverBackgroundColor: [
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Film_Grade)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade)
              ),
            ],
            pointHoverBorderColor: [
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Film_Grade)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Analytical_Grade)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Landing_Spot)
              ),
              getColor(
                safeNumber(comparePlayerData.rookieGuideData?.Overall_Grade)
              ),
            ],
            pointLabels: [
              safeNumber(comparePlayerData.rookieGuideData?.Film_Grade).toFixed(
                1
              ),
              safeNumber(
                comparePlayerData.rookieGuideData?.Analytical_Grade
              ).toFixed(1),
              safeNumber(
                comparePlayerData.rookieGuideData?.Landing_Spot
              ).toFixed(1),
              safeNumber(
                comparePlayerData.rookieGuideData?.Overall_Grade
              ).toFixed(1),
            ],
            pointRadius: 7,
            pointHoverRadius: 7,
          },
        ],
      }
    : null;

  const compareFilmSpiderData = comparePlayerData
    ? {
        labels: metrics,
        datasets: [
          {
            label: "Film Grades",
            data: metrics.map((metric) => {
              const grade = getUniqueFilmGrades(
                comparePlayerData.filmGrades
              ).find((g) => g.Metric === metric);
                return grade ? grade.Grade : 0;
            }),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: true,
            pointBackgroundColor: metrics.map((metric) => {
              const grade = getUniqueFilmGrades(
                comparePlayerData.filmGrades
              ).find((g) => g.Metric === metric);
                return getFilmColor(grade ? grade.Grade : 0);
            }),
            pointBorderColor: metrics.map((metric) => {
              const grade = getUniqueFilmGrades(
                comparePlayerData.filmGrades
              ).find((g) => g.Metric === metric);
                return getFilmColor(grade ? grade.Grade : 0);
            }),
            pointHoverBackgroundColor: metrics.map((metric) => {
              const grade = getUniqueFilmGrades(
                comparePlayerData.filmGrades
              ).find((g) => g.Metric === metric);
                return getFilmColor(grade ? grade.Grade : 0);
            }),
            pointHoverBorderColor: metrics.map((metric) => {
              const grade = getUniqueFilmGrades(
                comparePlayerData.filmGrades
              ).find((g) => g.Metric === metric);
                return getFilmColor(grade ? grade.Grade : 0);
            }),
            pointLabels: metrics.map((metric) => {
              const grade = getUniqueFilmGrades(
                comparePlayerData.filmGrades
              ).find((g) => g.Metric === metric);
              return grade ? grade.Grade.toFixed(1) : "0.0";
            }),
            pointRadius: 7,
            pointHoverRadius: 7,
          },
        ],
      }
    : null;

    // Remove duplicate entries (appears data is duplicated in array)
  const uniqueFilmGradesFiltered = filmGrades
    ? filmGrades.filter(
        (grade, index, self) =>
            index === self.findIndex((t) => t.Metric === grade.Metric)
      )
    : [];

    // Create data object with position-specific metrics
    const processedData = {};
  metrics.forEach((metric) => {
    const grade = uniqueFilmGradesFiltered.find((g) => g.Metric === metric);
        processedData[metric] = grade ? parseFloat(grade.Grade) : 0;
    });

    // console.log('Position:', position);
    // console.log('Processed Data:', processedData);

    // Film spider data with point colors
    const filmSpiderData = {
        labels: metrics,
    datasets: [
      {
        label: "Film Grades",
        data: metrics.map((metric) => processedData[metric]),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: true,
        pointBackgroundColor: metrics.map((metric) =>
          getFilmColor(processedData[metric])
        ),
        pointBorderColor: metrics.map((metric) =>
          getFilmColor(processedData[metric])
        ),
        pointHoverBackgroundColor: metrics.map((metric) =>
          getFilmColor(processedData[metric])
        ),
        pointHoverBorderColor: metrics.map((metric) =>
          getFilmColor(processedData[metric])
        ),
        pointLabels: metrics.map((metric) => processedData[metric].toFixed(1)),
            pointRadius: 7,
            pointHoverRadius: 7,
      },
    ],
    };

    // console.log('Spider Chart Data:', filmSpiderData);

    // Options for prospect grades (0-100 scale)
    const prospectSpiderOptions = {
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                min: 0,
                ticks: {
          display: false, // Hide the numeric labels
                },
                grid: {
          color: "#000000",
                },
                angleLines: {
          color: "#000000",
                },
                pointLabels: {
                    font: {
            size: 12,
          },
          color: "#FFFFFF",
          padding: 15,
        },
      },
        },
        plugins: {
            legend: {
        display: true,
            },
            tooltip: {
                callbacks: {
          label: (context) => {
            const player = filteredPlayers[context.dataIndex]; // Get the player object
            const playerName = player.Player_Name; // Get the player's name
            const xValue = player.rookieGuideData[xAxisVariable]; // Get the x-axis value
            const yValue = player.rookieGuideData[yAxisVariable]; // Get the y-axis value
            return `${playerName}: ${xAxisVariable.replace(
              /_/g,
              " "
            )} = ${xValue}, ${yAxisVariable.replace(/_/g, " ")} = ${yValue}`; // Return the player's name and values for x and y with axis labels
          },
        },
            },
            datalabels: {
        color: "white",
                font: {
          weight: "bold",
                },
        formatter: (value) => value?.toFixed(1) ?? "0.0",
        anchor: "center",
                align: (context) => {
                    // The first label (index 0) is typically at the top of the radar chart
          return context.dataIndex === 0 ? "bottom" : "top";
        },
        offset: 5,
      },
    },
    };

    // Film grades options
    const filmSpiderOptions = {
        scales: {
            r: {
                beginAtZero: true,
                max: 5,
                min: 0,
                ticks: {
          display: false, // Hide the numeric labels
                },
                grid: {
          color: "#000000",
                },
                angleLines: {
          color: "#000000",
                },
                pointLabels: {
                    font: {
            size: 12,
          },
          color: "#FFFFFF",
          padding: 15,
        },
      },
        },
        plugins: {
            legend: {
        display: true,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const metric = metrics[context.dataIndex];
            const grade = uniqueFilmGradesFiltered.find(
              (g) => g.Metric === metric
            );
            return grade
              ? `${metric}: ${grade.Grade} - ${grade.Analysis}`
              : `${metric}: ${context.raw}`;
          },
        },
            },
            datalabels: {
        color: "white",
                font: {
          weight: "bold",
                },
        formatter: (value) => value?.toFixed(1) ?? "0.0",
        anchor: "center",
                align: (context) => {
                    // The first label (index 0) is typically at the top of the radar chart
          return context.dataIndex === 0 ? "bottom" : "top";
        },
        offset: 5,
      },
    },
    };

    // Grade labels for film grades
    const filmGradeLabels = {
    0: "No Grade",
    1: "Poor",
    2: "Below Average",
    3: "Average",
    4: "Above Average",
    5: "Excellent",
  };

  // State for dropdown selections
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [xAxisVariable, setXAxisVariable] = useState("Analytical_Grade"); // Default x-axis variable
  const [yAxisVariable, setYAxisVariable] = useState("Film_Grade"); // Default y-axis variable

  // console.log("X Axis Variable:", xAxisVariable);
  // console.log("Y Axis Variable:", yAxisVariable);

  // Function to filter players based on selected class and position
  const filteredPlayers = allPlayers.filter((player) => {
    // console.log(player);

    // Check if PlayerBio is null or undefined
    if (!player.PlayerBio) {
      return false; // Return false if PlayerBio is not availabl
    }

    const matchesClass =
      selectedClass === "all" // Check if "all" is selected
        ? true // If "all" is selected, include all players
        : selectedClass
        ? player.PlayerBio.Draft_Year === +selectedClass
        : true;

    const matchesPosition =
      selectedPosition === "all" // Check if "all" is selected for position
        ? true // If "all" is selected, include all players
        : selectedPosition // If a specific position is selected
        ? player.PlayerBio.Position === selectedPosition
        : true;

    return matchesClass && matchesPosition;
  });

  // console.log("Filtered Players:", filteredPlayers);

  // Scatterplot options
  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        min: 50, // Set minimum value for x-axis
        max: 100, // Set maximum value for x-axis
        grid: {
          offset: true,
        },
        title: {
          display: true,
          text: xAxisVariable.replace(/_/g, " "), // Replace underscores with spaces for better readability
          color: "white", // Change color of the title to var(--color-orange-primary)

          font: {
            size: 16, // Font size of the title
            weight: "bold", // Font weight of the title
          },
        },
      },
      y: {
        min: 50, // Set minimum value for y-axis
        max: 100, // Set maximum value for y-axis
        beginAtZero: true,
        ticks: {
          padding: 2, // Add padding to y-axis ticks
        },
        title: {
          display: true,
          text: yAxisVariable.replace(/_/g, " "), // Replace underscores with spaces for better readability
          color: "white", // Change color of the title to var(--color-orange-primary)
          font: {
            size: 14, // Font size of the title
            weight: "bold", // Font weight of the title
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Always show tooltips
        callbacks: {
          label: (context) => {
            const player = filteredPlayers[context.dataIndex]; // Get the player object
            const playerName = player.Player_Name; // Get the player's name
            const xValue = player.rookieGuideData[xAxisVariable]; // Get the x-axis value
            const yValue = player.rookieGuideData[yAxisVariable]; // Get the y-axis value
            return `${playerName}: ${xAxisVariable.replace(
              /_/g,
              " "
            )} = ${xValue}, ${yAxisVariable.replace(/_/g, " ")} = ${yValue}`; // Return the player's name and values for x and y with axis labels
          },
        },
      },
    },
  };

  // Prepare data for the scatterplot
  const scatterData = {
    datasets: [
      {
        label: "Player Scatterplot",
        data: filteredPlayers.map((player) => {
          const xValue =
            player.rookieGuideData[xAxisVariable] !== undefined
              ? player.rookieGuideData[xAxisVariable]
              : 0; // Fallback to 0
          const yValue =
            player.rookieGuideData[yAxisVariable] !== undefined
              ? player.rookieGuideData[yAxisVariable]
              : 0; // Fallback to 0

          // Log the values after they have been defined
          // console.log(`Player: ${player.Player_Name}, X: ${xValue}, Y: ${yValue}`);

          return {
            x: xValue,
            y: yValue,
            // We will set the color in the dataset level
          };
        }),
        backgroundColor: filteredPlayers.map((player) => {
          return player.Player_Name === name
            ? "rgba(0, 255, 0, 0.6)"
            : "rgba(255, 99, 132, 0.6)"; // Green for selected player, default color for others
        }),
      },
    ],
  };

  if (filteredPlayers.length > 0) {
    const meanX =
      filteredPlayers.reduce((sum, player) => sum + player[xAxisVariable], 0) /
      filteredPlayers.length;
    const meanY =
      filteredPlayers.reduce((sum, player) => sum + player[yAxisVariable], 0) /
      filteredPlayers.length;

    // Add mean line to the scatterplot
    scatterData.datasets.push({
      label: "Mean Line",
      data: [{ x: meanX, y: meanY }],
      backgroundColor: "rgba(0, 255, 0, 0.5)",
      type: "line",
    });
  }

  console.log("Scatter Data:", scatterData);

  // State for selected variables for the new spider chart
  const [selectedVariables, setSelectedVariables] = useState(Array(5).fill(""));

  // Function to handle variable selection
  const handleVariableChange = (index, value) => {
    const newVariables = [...selectedVariables];
    newVariables[index] = value;
    setSelectedVariables(newVariables);
  };

  // Define an array of options with display labels and corresponding data keys
  const variableOptions = [
    { label: "Film Grade", value: "Film_Grade" },
    { label: "Analytical Grade", value: "Analytical_Grade" },
    { label: "Landing Spot", value: "Landing_Spot" },
    { label: "Overall Grade", value: "Overall_Grade" },
    { label: "Processing (QB)", value: "Processing" },
    { label: "Accuracy (QB)", value: "Accuracy" },
    { label: "Arm Talent (QB)", value: "Arm Talent" },
    { label: "Pocket (QB)", value: "Pocket" },
    { label: "Run Threat (QB)", value: "Run Threat" },
    { label: "Vision (RB)", value: "Vision" },
    { label: "Collisions (RB)", value: "Collisions" },
    { label: "Elusiveness (RB)", value: "Elusiveness" },
    { label: "Receiving (RB, WR, & TE)", value: "Receiving" },
    { label: "Burst (RB)", value: "Burst" },
    { label: "Release (WR)", value: "Release" },
    { label: "Route (WR & TE)", value: "Route" },
    { label: "YAC (WR & TE)", value: "YAC" },
    { label: "Explosiveness (WR & TE)", value: "Explosiveness" },
    { label: "Blocking (TE)", value: "Blocking" },
  ];

  // Function to render the new spider chart based on selected variables
  const renderNewSpiderChart = (player) => {
    const data = {
        labels: selectedVariables, // Keep the variable names as labels
        datasets: [
            {
                label: player.Player_Name, // Use the player's name as the label
                data: selectedVariables.map((variable) => {
                    // Define film grade and prospect grade variables
                    const filmGradeVariables = [
                        "Processing",
                        "Accuracy",
                        "Arm Talent",
                        "Pocket",
                        "Run Threat",
                        "Vision",
                        "Collisions",
                        "Elusiveness",
                        "Receiving",
                        "Burst",
                        "Release",
                        "Route",
                        "YAC",
                        "Explosiveness",
                        "Blocking",
                    ];

                    // Check if the variable is a film grade variable
                    if (filmGradeVariables.includes(variable)) {
                        // Find the corresponding film grade entry for the current player
                        const filmGradeEntry = getUniqueFilmGrades(player.filmGrades).find(
                            (grade) => grade.Metric === variable
                        );
                        // Scale the film grade to a 0-100 range
                        return filmGradeEntry
                            ? (parseFloat(filmGradeEntry.Grade) / 5) * 100
                            : 0; // Scale to 100
                    } else {
                        // For prospect grades, keep them as is (0-100)
                        return player.rookieGuideData[variable] !== undefined
                            ? player.rookieGuideData[variable]
                            : 0; // Fallback to 0 if undefined
                    }
                }),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    return (
        <div className={styles.adjustableSpiderChartWrapper}>
            <Radar
                data={data}
                options={{
                    ...prospectSpiderOptions,
                    plugins: {
                        ...prospectSpiderOptions.plugins,
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const variable = selectedVariables[context.dataIndex];
                                    const filmGradeEntry = getUniqueFilmGrades(player.filmGrades).find(
                                        (grade) => grade.Metric === variable
                                    );
                                    const originalValue = filmGradeEntry
                                        ? filmGradeEntry.Grade
                                        : 0;
                                    return `${variable}: ${originalValue}`; // Show original value in tooltip
                                },
                            },
                        },
                    },
                }} // Use existing options or define new ones
                plugins={[ChartDataLabels]}
            />
        </div>
    );
  };

  // Render the spider charts for the original player and all players in the spiderComparePlayersList
  const renderAllSpiderCharts = () => {
    return (
        <div>
            {spiderComparePlayersList.map((player) => (
                <div key={player.Player_Name}>
                    {renderNewSpiderChart(player)}
                </div>
            ))}
            {/* Render the original player as well */}
            {renderNewSpiderChart({ Player_Name: name, rookieGuideData, filmGrades })}
        </div>
    );
  };

  // Combined list of all variables from both spider charts
  const allVariables = [
    "Film_Grade",
    "Analytical_Grade",
    "Landing_Spot",
    "Overall_Grade",
    "Processing",
    "Accuracy",
    "Arm Talent",
    "Pocket",
    "Run Threat",
    "Vision",
    "Collisions",
    "Elusiveness",
    "Receiving",
    "Burst",
    "Release",
    "Route",
    "YAC",
    "Explosiveness",
    "Blocking",
  ];

    return (
        <div>
            {/* Add comparison text */}
            {comparePlayerData && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            fontSize: "1.2rem",
            color: "var(--color-orange-primary)",
          }}
        >
                    Comparing {name} to {comparePlayerData.name}
                </div>
            )}

            {/* Bar Charts Section */}
            {isSelectedPlayer && (
            <div className={styles.chartsWrapper}>
          <div style={{ width: "500px", height: "300px", display: "flex" }}>
            <Bar
              data={data}
              options={options}
              plugins={[ChartDataLabels]}
              className={styles.prospectGradesChart}
            />
            </div>
          <div style={{ width: "500px", height: "300px", display: "flex" }}>
                        {uniqueFilmGradesFiltered.length > 0 && (
              <Bar
                data={filmGradesData}
                options={filmGradesOptions}
                plugins={[ChartDataLabels]}
                className={styles.filmGradesChart}
              />
                        )}
             </div>
             </div>
             )}

      {/*scatter Plot and Spider chart sections */}

      <div className={styles.wholeScatterAndSpiderChartsSectionWrapper}>
        {/*scatter plot section */}

        <div className={styles.wholeScatterSectionWrapper}>
          <div className={styles.selectsForAndScatterWrapper}>
            <div className={styles.scatterSelectsWrapper}>
              <select
                onChange={(e) => setSelectedClass(e.target.value)}
                className={styles.scatterSelects}
              >
                <option value="">Select Class</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value="all">2021-2025</option>
              </select>
              <select
                onChange={(e) => setSelectedPosition(e.target.value)}
                className={styles.scatterSelects}
              >
                <option value="">Select Position</option>
                <option value={"QB"}>QB</option>
                <option value={"RB"}>RB</option>
                <option value={"WR"}>WR</option>
                <option value={"TE"}>TE</option>
                <option value={"all"}>All</option>
              </select>
              <select
                onChange={(e) => setXAxisVariable(e.target.value)}
                className={styles.scatterSelects}
                value={xAxisVariable}
              >
                <option value="Film_Grade">Film Grade</option>
                <option value="Analytical_Grade">Analytical Grade</option>
                <option value="Landing_Spot">Landing Spot</option>
                <option value="Overall_Grade">Overall Grade</option>
              </select>
              <select
                onChange={(e) => setYAxisVariable(e.target.value)}
                className={styles.scatterSelects}
                value={yAxisVariable}
              >
                <option value="Film_Grade">Film Grade</option>
                <option value="Analytical_Grade">Analytical Grade</option>
                <option value="Landing_Spot">Landing Spot</option>
                <option value="Overall_Grade">Overall Grade</option>
              </select>
            </div>

            {/* Scatterplot Section */}
            <div
              style={{ width: "50%", height: "500px", display: "flex" }}
              className={styles.outerScatterWrapper}
            >
              <Scatter data={scatterData} options={scatterOptions} />
            </div>
          </div>
        </div>

        {/* Spider Charts Section */}

        <div className={styles.outerSpiderChartWrapper}>
            {/* Spider Chart Selection Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className={styles.searchForm}
          >
                <div className={styles.searchInputAndButtonWrapper}>
                    <input
                        type="text"
                        value={spiderSearchValue}
                        onChange={onSpiderSearchChange}
                placeholder="Add players to compare"
                        className={styles.teamOneSearchInput}
                        disabled={spiderComparePlayersList.length >= 4}
                    />
                </div>
                
            {spiderSearchValue &&
              allPlayers
                .filter((p) => {
                    const searchTerm = spiderSearchValue.toLowerCase();
                    const name = p.Player_Name.toLowerCase();
                    let tempLast = name.split(/\s/);
                    let lastName = tempLast[1];
                    
                  const isAlreadySelected =
                    spiderComparePlayersList.some(
                      (selected) => selected.Player_Name === p.Player_Name
                    ) || p.Player_Name === mainPlayerName;

                  return (
                    !isAlreadySelected &&
                    (name.startsWith(searchTerm) ||
                      lastName.startsWith(searchTerm))
                  );
                })
                .slice(0, 15)
                .map((p) => (
                    <div
                        onClick={() => onSpiderPlayerSelect(p.Player_Name, p)}
                        key={p.Player_Name}
                        className={styles.selectMenuItem}
                    >
                        {p.Player_Name}
                    </div>
                ))}
            </form>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              marginTop: "2rem",
            }}
            className={styles.spiderChartWrapper}
          >
{spiderComparePlayersList.length > 0 && (
                    <div className={styles.selectedPlayersWrapper}>
                {spiderComparePlayersList.map((p) => (
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "2rem",
              }}
              className={styles.outerPropsectGradesSpiderWrapper}
            >
                    {/* Main player's prospect grades */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  flex: 1,
                  maxWidth: "400px",
                  height: "300px",
                }}
              >
                <h3
                  style={{
                    textAlign: "left",
                    color: "var(--color-orange-primary)",
                  }}
                >
                  {name}
                </h3>
                <Radar
                  data={prospectSpiderData}
                  options={prospectSpiderOptions}
                  plugins={[ChartDataLabels]}
                />
                    </div>
                    
                    {/* Compare players' prospect grades */}
                    {spiderComparePlayers.map((comparePlayer) => {
                        // Add safety check for required data
                if (
                  !comparePlayer?.rookieGuideData ||
                  !comparePlayer?.filmGrades
                ) {
                            return null;
                        }

                        return (
                  <div
                    key={comparePlayer.Player_Name}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      flex: 1,
                      maxWidth: "400px",
                      height: "300px",
                    }}
                  >
                    <h3
                      style={{
                        textAlign: "left",
                        color: "var(--color-orange-primary)",
                      }}
                    >
                      {comparePlayer.Player_Name}
                    </h3>
                                <Radar 
                                    data={{
                                        labels: Object.keys(selectedRookieGuideFields),
                        datasets: [
                          {
                            label: "Prospect Grades",
                                            data: [
                              safeNumber(
                                comparePlayer.rookieGuideData?.Film_Grade
                              ),
                              safeNumber(
                                comparePlayer.rookieGuideData?.Analytical_Grade
                              ),
                              safeNumber(
                                comparePlayer.rookieGuideData?.Landing_Spot
                              ),
                              safeNumber(
                                comparePlayer.rookieGuideData?.Overall_Grade
                              ),
                            ],
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                            borderColor: "rgba(255, 99, 132, 1)",
                                            borderWidth: 1,
                                            fill: true,
                                            pointBackgroundColor: [
                              getColor(
                                safeNumber(
                                  comparePlayer.rookieGuideData?.Film_Grade
                                )
                              ),
                              getColor(
                                safeNumber(
                                  comparePlayer.rookieGuideData
                                    ?.Analytical_Grade
                                )
                              ),
                              getColor(
                                safeNumber(
                                  comparePlayer.rookieGuideData?.Landing_Spot
                                )
                              ),
                              getColor(
                                safeNumber(
                                  comparePlayer.rookieGuideData?.Overall_Grade
                                )
                              ),
                                            ],
                                            pointBorderColor: [
                              getColor(
                                safeNumber(
                                  comparePlayer.rookieGuideData?.Film_Grade
                                )
                              ),
                              getColor(
                                safeNumber(
                                  comparePlayer.rookieGuideData
                                    ?.Analytical_Grade
                                )
                              ),
                              getColor(
                                safeNumber(
                                  comparePlayer.rookieGuideData?.Landing_Spot
                                )
                              ),
                              getColor(
                                safeNumber(
                                  comparePlayer.rookieGuideData?.Overall_Grade
                                )
                              ),
                                            ],
                                            pointRadius: 7,
                                            pointHoverRadius: 7,
                          },
                        ],
                                    }}
                                    options={prospectSpiderOptions} 
                                    plugins={[ChartDataLabels]} 
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Film Grades Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "2rem",
              }}
              className={styles.outerFilmGradesSpiderWrapper}
            >
                    {/* Main player's film grades */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  flex: 1,
                  maxWidth: "400px",
                  height: "300px",
                }}
              >
                <h3
                  style={{
                    textAlign: "left",
                    color: "var(--color-orange-primary)",
                  }}
                >
                  {name}
                </h3>
                <Radar
                  data={filmSpiderData}
                  options={filmSpiderOptions}
                  plugins={[ChartDataLabels]}
                />
                    </div>

                    {/* Compare players' film grades */}
                    {spiderComparePlayers.map((comparePlayer) => {
                        // Add safety check for required data
                if (
                  !comparePlayer?.rookieGuideData ||
                  !comparePlayer?.filmGrades
                ) {
                            return null;
                        }

                        return (
                  <div
                    key={comparePlayer.Player_Name}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      flex: 1,
                      maxWidth: "400px",
                      height: "300px",
                    }}
                  >
                    <h3
                      style={{
                        textAlign: "left",
                        color: "var(--color-orange-primary)",
                      }}
                    >
                      {comparePlayer.Player_Name}
                    </h3>
                                <Radar 
                                    data={{
                                        labels: metrics,
                        datasets: [
                          {
                            label: "Film Grades",
                            data: metrics.map((metric) => {
                              const grade = getUniqueFilmGrades(
                                comparePlayer.filmGrades
                              ).find((g) => g.Metric === metric);
                                                return grade ? grade.Grade : 0;
                                            }),
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                            borderColor: "rgba(255, 99, 132, 1)",
                                            borderWidth: 1,
                                            fill: true,
                            pointBackgroundColor: metrics.map((metric) => {
                              const grade = getUniqueFilmGrades(
                                comparePlayer.filmGrades
                              ).find((g) => g.Metric === metric);
                                                return getFilmColor(grade ? grade.Grade : 0);
                                            }),
                            pointBorderColor: metrics.map((metric) => {
                              const grade = getUniqueFilmGrades(
                                comparePlayer.filmGrades
                              ).find((g) => g.Metric === metric);
                                                return getFilmColor(grade ? grade.Grade : 0);
                                            }),
                                            pointRadius: 7,
                                            pointHoverRadius: 7,
                          },
                        ],
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
      </div>

      {/* New Section for Single Spider Chart with Select Inputs */}
      <div className={styles.wholeAdjustableSpiderChartWrapper}>
        <h2>Player Spider Chart</h2>
        <div className={styles.spiderChartInputSelectsWrapper}>
          {/* Select Inputs for Variables */}
          

          
          {Array.from({ length: 5 }, (_, index) => (
            <select
              key={index}
              onChange={(e) => handleVariableChange(index, e.target.value)}
              className={styles.adjustableSpiderChartSelects}
            >
              <option value="">Data Point {index + 1}</option>
              {variableOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
         
        </div>

        {/* Render the Spider Chart based on selected variables */}
        
            
            {renderAllSpiderCharts()}
            
        
        
            </div>
        </div>
    );
};

export default PlayerGradesChart;
