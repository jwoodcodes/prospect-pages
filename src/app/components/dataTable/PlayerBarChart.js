// import styles from "./playerBarChart.module.css";

// export default function PlayerBarChart({
//   overallGrade,
//   filmGrade,
//   analyticalGrade,
// }) {
//   return (
//     <div className={styles.outerWrapper}>
//       <div className={styles.metricRow}>
//         <div className={styles.bar}>OVERALL</div>
//         <div>TALENT</div>
//         <div>PRODUCTION</div>
//       </div>
//       <div>
//         <div>overall</div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import styles from "./playerBarChart.module.css"; // Adjust the import path as necessary

const PlayerBarDisplay = ({ overallGrade, filmGrade, analyticalGrade }) => {
  // Function to determine the color based on the value
  const getColor = (value) => {
    if (value <= 35) {
      return "red"; // Red
    } else if (value <= 40) {
      return "orange"; // Orange
    } else if (value <= 80) {
      return "yellow"; // Yellow
    } else if (value <= 85) {
      return "yellowgreen"; // Yellow-green
    } else {
      return "green"; // Green
    }
  };

  const determineGradient = (value) => {
    if (value <= 50) {
      return `linear-gradient(to right, #b40000,  #b40000, #f70000`;
    }
    if (value >= 50 && value <= 60) {
      return `linear-gradient(to right, #b40000,  #b40000, #f70000, #fda544, #efbe3b`;
    }
    if (value >= 60 && value <= 80) {
      return `linear-gradient(to right, #b40000, #b40000, #f70000, #fda544, #efbe3b, #efbe3b`;
    }
    if (value >= 80 && value <= 90) {
      return `linear-gradient(to right, #b40000,  #b40000, #f70000, #fda544, #efbe3b, #efbe3b, #60c800`;
    }
    if (value >= 90 && value <= 95) {
      return `linear-gradient(to right, #b40000,  #f70000, #fda544, #efbe3b, #efbe3b, #60c800, #127122, #127122`;
    }
    if (value >= 95) {
      return `linear-gradient(to right, #b40000,  #f70000, #fda544, #efbe3b, #efbe3b, #60c800, #60c800, #127122, #127122, #127122`;
    }
  };

  // Function to create a bar style based on the value
  const createBarStyle = (value) => ({
    width: `${value}%`, // Set the width based on the value

    // backgroundImage: `linear-gradient(to right, #b40000,  #b40000, #f70000, #fda544, #efbe3b, #efbe3b, #d5c943, #60c800, #60c800, #06b327)`,
    backgroundImage: determineGradient(value),
    height: "28px", // Set the height of the bar
    borderRadius: "5px", // Optional: rounded corners
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "1.75rem",
    lineHeight: "25px",
    fontFamily: "HemiHead",
  });

  const createContainerStyle = (value) => ({
    // width: `${value}%`,
    width: "100%",
    // backgroundImage: `linear-gradient(to right, #b40000,  #b40000, #f70000, #fda544, #efbe3b, #efbe3b, #d5c943, #60c800, #60c800, #06b327)`,
    height: "28px", // Set the height of the bar
    borderRadius: "5px", // Optional: rounded corners
    margin: ".75rem 0",
  });

  return (
    <div className={styles.TESTouterWrapper}>
      <div className={styles.metricColumn}>
        <div> OVERALL</div>
        <div> TALENT</div>
        <div> PRODUCTION</div>
      </div>

      <div className={styles.barColumn}>
        <div style={createContainerStyle(overallGrade)}>
          <div style={createBarStyle(overallGrade)}>{overallGrade}</div>
        </div>
        <div style={createContainerStyle(filmGrade)}>
          <div style={createBarStyle(filmGrade)}>{filmGrade}</div>
        </div>
        <div style={createContainerStyle(analyticalGrade)}>
          <div style={createBarStyle(analyticalGrade)}>{analyticalGrade}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBarDisplay;
