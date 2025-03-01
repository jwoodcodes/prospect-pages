import React, { useEffect, useRef } from 'react';
import styles from './dataTable.module.css'
import PlayerGradesChart from './PlayerGradesChart'; // Adjust the import path as necessary

export default function PlayerDialog({ player, onClose }) {
    const dialogRef = useRef(null); // Create a ref for the dialog

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                onClose(); // Close the dialog if clicked outside
            }
        };

        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup the event listener on unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!player) return null; // Return null if no player is selected

    // Check if PlayerBio exists before accessing its properties
    const playerBio = player.PlayerBio || {};
    const isQuarterback = playerBio.Position === "QB";
    const isRunningBack = playerBio.Position === "RB";
    const isReceiverOrTE = playerBio.Position === "WR" || playerBio.Position === "TE";

    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogContent} ref={dialogRef}>
                <div className={styles.topBar} ></div>
                <div className={styles.nameAndCloseWrapper}>
                <h2 className={styles.playerName}>{player.Player_Name}</h2> {/* Display the player's name */}
               
                <button onClick={onClose} className={styles.closeBtn}>X</button>
                </div>
                <div className={styles.infoBox}>
                    {playerBio.Height && (
                        <p><strong>Height:</strong> {playerBio.Height}</p>
                    )}
                    {playerBio.Weight && (
                        <p><strong>Weight:</strong> {playerBio.Weight}</p>
                    )}
                     {playerBio.Draft_Year && (
                        <p><strong>Draft Year:</strong> {playerBio.Draft_Year}</p>
                    )}
                     {playerBio.
                     School && (
                        <p><strong>
                            School:</strong> {playerBio.
                        School}</p>
                    )}
                </div>

                {/* Add the PlayerGradesChart component */}
                <PlayerGradesChart rookieGuideData={player.rookieGuideData} />

                {/* Container for tables */}
                <div className={styles.tablesContainer}>
                    {isQuarterback && (
                        <>
                            <div className={styles.tableWrapper}>
                                <h3 className={styles.heading}>Passing Statistics</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableCell}>Year</th>
                                            <th className={styles.tableCell}>Games</th>
                                            <th className={styles.tableCell}>Cmp</th>
                                            <th className={styles.tableCell}>Att</th>
                                            <th className={styles.tableCell}>cmp%</th>
                                            <th className={styles.tableCell}>Yards</th>
                                            <th className={styles.tableCell}>Y/G</th>
                                            <th className={styles.tableCell}>Y/A</th>
                                            <th className={styles.tableCell}>TDs</th>
                                            <th className={styles.tableCell}>INTs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(player).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                            const yearData = player[yearKey].passing; // Access the passing data for each year
                                            const season = player[yearKey].season;
                                            return (
                                                <tr key={index}>
                                                    <td className={styles.tableCell}>{season}</td>
                                                    <td className={styles.tableCell}>{yearData.G}</td>
                                                    <td className={styles.tableCell}>{yearData.Cmp}</td>
                                                    <td className={styles.tableCell}>{yearData.Att}</td>
                                                    <td className={styles.tableCell}>{yearData['Cmp%']}</td>
                                                    <td className={styles.tableCell}>{yearData.Yds}</td>
                                                    <td className={styles.tableCell}>{yearData['Y/G']}</td>
                                                    <td className={styles.tableCell}>{yearData['Y/A']}</td>
                                                    <td className={styles.tableCell}>{yearData.TD}</td>
                                                    <td className={styles.tableCell}>{yearData.Int}</td>
                                                </tr>
                                            );
                                        })}
                                        {/* Add career statistics row */}
                                        <tr>
                                            <td className={styles.tableCell}>Career</td>
                                            <td className={styles.tableCell}>{player.careerPassing.totalGames}</td>
                                            <td className={styles.tableCell}>{player.careerPassing.totalCmp}</td>
                                            <td className={styles.tableCell}>{player.careerPassing.totalAtt}</td>
                                            <td className={styles.tableCell}>{player.careerPassing.totalCmpPercentage}</td>
                                            <td className={styles.tableCell}>{player.careerPassing.totalYards}</td>
                                            <td className={styles.tableCell}>{player.careerPassing.totalYG}</td>
                                            <td className={styles.tableCell}>{player.careerPassing.totalYA}</td>
                                            <td className={styles.tableCell}>{player.careerPassing.totalTDs}</td>
                                            <td className={styles.tableCell}>{player.careerPassing.totalInt}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.tableWrapper}>
                                <h3 className={styles.heading}>Rushing Statistics</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableCell}>Year</th>
                                            <th className={styles.tableCell}>Games</th>
                                            <th className={styles.tableCell}>Att</th>
                                            <th className={styles.tableCell}>Yards</th>
                                            <th className={styles.tableCell}>Y/G</th>
                                            <th className={styles.tableCell}>Y/A</th>
                                            <th className={styles.tableCell}>TDs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(player).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                            const yearData = player[yearKey].rushing; // Access the rushing data for each year
                                            const season = player[yearKey].season;
                                            return (
                                                <tr key={index}>
                                                    <td className={styles.tableCell}>{season}</td>
                                                    <td className={styles.tableCell}>{yearData.G}</td>
                                                    <td className={styles.tableCell}>{yearData.RushAtt}</td>
                                                    <td className={styles.tableCell}>{yearData.RushYds}</td>
                                                    <td className={styles.tableCell}>{yearData['RushY/G']}</td>
                                                    <td className={styles.tableCell}>{yearData['RushY/A']}</td>
                                                    <td className={styles.tableCell}>{yearData.RushTD}</td>
                                                </tr>
                                            );
                                        })}
                                        {/* Add career statistics row */}
                                        <tr>
                                            <td className={styles.tableCell}>Career</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalGames}</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalRushAtt}</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalRushYds}</td>
                                            <td className={styles.tableCell}>{player.careerRushing['totalRushY_G']}</td>
                                            <td className={styles.tableCell}>{player.careerRushing['totalRushY_A']}</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalRushTD}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {isRunningBack && (
                        <>
                            <div className={styles.tableWrapper}>
                                <h3 className={styles.heading}>Rushing Statistics</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableCell}>Year</th>
                                            <th className={styles.tableCell}>Games</th>
                                            <th className={styles.tableCell}>Attempts</th>
                                            <th className={styles.tableCell}>Yards</th>
                                            <th className={styles.tableCell}>Y/G</th>
                                            <th className={styles.tableCell}>Y/A</th>
                                            <th className={styles.tableCell}>TDs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(player).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                            const yearData = player[yearKey].rushing; // Access the rushing data for each year
                                            const season = player[yearKey].season;
                                            return (
                                                <tr key={index}>
                                                    <td className={styles.tableCell}>{season}</td>
                                                    <td className={styles.tableCell}>{yearData.G}</td>
                                                    <td className={styles.tableCell}>{yearData.RushAtt}</td>
                                                    <td className={styles.tableCell}>{yearData.RushYds}</td>
                                                    <td className={styles.tableCell}>{yearData['RushY/G']}</td>
                                                    <td className={styles.tableCell}>{yearData['RushY/A']}</td>
                                                    <td className={styles.tableCell}>{yearData.RushTD}</td>
                                                </tr>
                                            );
                                        })}
                                        {/* Add career statistics row */}
                                        <tr>
                                            <td className={styles.tableCell}>Career</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalGames}</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalRushAtt}</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalRushYds}</td>
                                            <td className={styles.tableCell}>{player.careerRushing['totalRushY_G']}</td>
                                            <td className={styles.tableCell}>{player.careerRushing['totalRushY_A']}</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalRushTD}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.tableWrapper}>
                                <h3 className={styles.heading}>Receiving Statistics</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableCell}>Year</th>
                                            <th className={styles.tableCell}>Games</th>
                                            <th className={styles.tableCell}>Receptions</th>
                                            <th className={styles.tableCell}>Yards</th>
                                            <th className={styles.tableCell}>Y/G</th>
                                            <th className={styles.tableCell}>TDs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(player).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                            const yearData = player[yearKey].receiving; // Access the receiving data for each year
                                            const season = player[yearKey].season;
                                            return (
                                                <tr key={index}>
                                                    <td className={styles.tableCell}>{season}</td>
                                                    <td className={styles.tableCell}>{yearData.G}</td>
                                                    <td className={styles.tableCell}>{yearData.Rec}</td>
                                                    <td className={styles.tableCell}>{yearData.RecYds}</td>
                                                    <td className={styles.tableCell}>{yearData['RecY/G']}</td>
                                                    <td className={styles.tableCell}>{yearData.RecTD}</td>
                                                </tr>
                                            );
                                        })}
                                        {/* Add career statistics row */}
                                        <tr>
                                        <td className={styles.tableCell}>Career</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalGames}</td>
                                            <td className={styles.tableCell}>{player.careerReceiving.totalRec}</td>
                                            <td className={styles.tableCell}>{player.careerReceiving.totalRecYds}</td>
                                            <td className={styles.tableCell}>{player.careerReceiving['totalRecY_G']}</td>
                                            <td className={styles.tableCell}>{player.careerReceiving.totalRecTD || 0}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {isReceiverOrTE && (
                        <>
                            <div className={styles.tableWrapper}>
                                <h3 className={styles.heading}>Receiving Statistics</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableCell}>Year</th>
                                            <th className={styles.tableCell}>Games</th>
                                            <th className={styles.tableCell}>Receptions</th>
                                            <th className={styles.tableCell}>Yards</th>
                                            <th className={styles.tableCell}>Y/G</th>
                                            <th className={styles.tableCell}>TDs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(player).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                            const yearData = player[yearKey].receiving; // Access the receiving data for each year
                                            const season = player[yearKey].season;
                                            return (
                                                <tr key={index}>
                                                    <td className={styles.tableCell}>{season}</td>
                                                    <td className={styles.tableCell}>{yearData.G}</td>
                                                    <td className={styles.tableCell}>{yearData.Rec}</td>
                                                    <td className={styles.tableCell}>{yearData.RecYds}</td>
                                                    <td className={styles.tableCell}>{yearData['RecY/G']}</td>
                                                    <td className={styles.tableCell}>{yearData.RecTD}</td>
                                                </tr>
                                            );
                                        })}
                                        {/* Add career statistics row */}
                                        <tr>
                                        <td className={styles.tableCell}>Career</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalGames}</td>
                                            <td className={styles.tableCell}>{player.careerReceiving.totalRec}</td>
                                            <td className={styles.tableCell}>{player.careerReceiving.totalRecYds}</td>
                                            <td className={styles.tableCell}>{player.careerReceiving['totalRecY_G']}</td>
                                            <td className={styles.tableCell}>{player.careerReceiving.totalRecTD || 0}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.tableWrapper}>
                                <h3 className={styles.heading}>Rushing Statistics</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableCell}>Year</th>
                                            <th className={styles.tableCell}>Games</th>
                                            <th className={styles.tableCell}>Attempts</th>
                                            <th className={styles.tableCell}>Yards</th>
                                            <th className={styles.tableCell}>Y/G</th>
                                            <th className={styles.tableCell}>Y/A</th>
                                            <th className={styles.tableCell}>TDs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(player).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                            const yearData = player[yearKey].rushing; // Access the rushing data for each year
                                            const season = player[yearKey].season;
                                            let temp = yearData.G
                                            if(!yearData.RushAtt ||yearData.RushAtt === '0') {
                                                temp = 0
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td className={styles.tableCell}>{season}</td>
                                                    <td className={styles.tableCell}>{yearData.G || temp}</td>
                                                    <td className={styles.tableCell}>{yearData.RushAtt || 0}</td>
                                                    <td className={styles.tableCell}>{yearData.RushYds || 0}</td>
                                                    <td className={styles.tableCell}>{yearData['RushY/G'] || 0}</td>
                                                    <td className={styles.tableCell}>{yearData['RushY/A'] || 0}</td>
                                                    <td className={styles.tableCell}>{yearData.RushTD || 0}</td>
                                                </tr>
                                            );
                                        })}
                                        {/* Add career statistics row */}
                                        <tr>
                                            <td className={styles.tableCell}>Career</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalGames}</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalRushAtt}</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalRushYds}</td>
                                            <td className={styles.tableCell}>{player.careerRushing['totalRushY_G']}</td>
                                            <td className={styles.tableCell}>{player.careerRushing['totalRushY_A']}</td>
                                            <td className={styles.tableCell}>{player.careerRushing.totalRushTD}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                <p className={styles.breakdown} dangerouslySetInnerHTML={{
                    __html: player.PlayerBio && player.PlayerBio.Breakdown
                        ? player.PlayerBio.Breakdown.replace(/<br\s*\/?>/gi, '<br />')
                        : ''
                }} />

            </div>
        </div>
    );
}