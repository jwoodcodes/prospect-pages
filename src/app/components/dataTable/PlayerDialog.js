import React from 'react';
import styles from './dataTable.module.css'

export default function PlayerDialog({ player, onClose }) {
    if (!player) return null; // Return null if no player is selected


    // console.log(player)

    // Check if PlayerBio exists before accessing Position
    const isQuarterback = player.PlayerBio && player.PlayerBio.Position === "QB";

    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogContent}>
                <div className={styles.topBar} ></div>
                <div className={styles.nameAndCloseWrapper}>
                <h2 className={styles.playerName}>{player.Player_Name}</h2> {/* Display the player's name */}
               
                <button onClick={onClose} className={styles.closeBtn}>X</button>
                </div>
                <div className={styles.infoBox}>
                <p><strong>height:</strong> {player.PlayerBio.Height}</p>
                <p><strong>weight:</strong> {player.PlayerBio.Weight}</p>
                </div>

                {/* Display Passing Stats if Position is QB */}
                {isQuarterback && (
                    <>
                        <h3>Passing Statistics</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Games</th>
                                    <th>Cmp</th>
                                    <th>Att</th>
                                    <th>cmp%</th>
                                    <th>Yards</th>
                                    <th>TDs</th>
                                    <th>INTs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(player).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                    const yearData = player[yearKey].passing; // Access the passing data for each year
                                    const season = player[yearKey].season;
                                    return (
                                        <tr key={index}>
                                            <td>{season}</td>
                                            <td>{yearData.G}</td>
                                            <td>{yearData.Cmp}</td>
                                            <td>{yearData.Att}</td>
                                            <td>{yearData['Cmp%']}</td>
                                            <td>{yearData.Yds}</td>
                                            <td>{yearData.TD}</td>
                                            <td>{yearData.Int}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}

                {/* Display Rushing Stats */}
                <h3>Rushing Statistics</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Games Played</th>
                            <th>Rush Attempts</th>
                            <th>Rushing Yards</th>
                            <th>Rushing Touchdowns</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(player).filter(key => key.startsWith('year')).map((yearKey, index) => {
                            const yearData = player[yearKey].rushing; // Access the rushing data for each year
                            const season = player[yearKey].season;
                            return (
                                <tr key={index}>
                                    <td>{season}</td>
                                    <td>{yearData.G}</td>
                                    <td>{yearData.RushAtt}</td>
                                    <td>{yearData.RushYds}</td>
                                    <td>{yearData.RushTD}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Display Receiving Stats if Position is not QB */}
                {!isQuarterback && (
                    <>
                        <h3>Receiving Statistics</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Games Played</th>
                                    <th>Receptions</th>
                                    <th>Receiving Yards</th>
                                    <th>Receiving Touchdowns</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(player).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                    const yearData = player[yearKey].receiving; // Access the receiving data for each year
                                    const season = player[yearKey].season;
                                    return (
                                        <tr key={index}>
                                            <td>{season}</td>
                                            <td>{yearData.G}</td>
                                            <td>{yearData.Rec}</td>
                                            <td>{yearData.RecYds}</td>
                                            <td>{yearData.RecTD}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}

                <p className={styles.breakdown}>
                    {player.PlayerBio.Breakdown}
                </p>

            </div>
        </div>
    );
}