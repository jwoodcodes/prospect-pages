{comparePlayer && (
    <div className={styles.dialogContent} ref={dialogRef}>
    <button onClick={() => setComparePlayer(null)} className={styles.closeBtn}>X</button>
    <h2 className={styles.playerName}>{comparePlayer.Player_Name}</h2>
    
   

    <div className={styles.infoBox}>
        {comparePlayer.PlayerBio && (
            <>
                {comparePlayer.PlayerBio.Height && (
                    <p><strong>Height:</strong> {comparePlayer.PlayerBio.Height}</p>
                )}
                {comparePlayer.PlayerBio.Weight && (
                    <p><strong>Weight:</strong> {comparePlayer.PlayerBio.Weight}</p>
                )}
                {comparePlayer.PlayerBio.Draft_Year && (
                    <p><strong>Draft Year:</strong> {comparePlayer.PlayerBio.Draft_Year}</p>
                )}
                {comparePlayer.PlayerBio.School && (
                    <p><strong>School:</strong> {comparePlayer.PlayerBio.School}</p>
                )}
            </>
        )}
    </div>
    <form onSubmit={() => onPlayerSelectFromList(player.Player_Name, player)} className={styles.searchForm}>
    <div className={styles.searchInputAndButtonWrapper}>
        <input
        type="text"
        value={teamOneSearchValue}
        onChange={teamOneSearchOnChange}
        placeholder='Search player to compare'
        className={styles.teamOneSearchInput}
        />
        {/* <button
        onClick={() => onPlayerSelectFromList(player.Player_Name, player)}
        className={styles.addPlayerButton}
        >
         Compare
        </button> */}
    </div>
    
    {data.filter(player => {
    const searchTerm = teamOneSearchValue.toLowerCase();
    const name = player.Player_Name.toLowerCase();
    let tempLast = name.split(/\s/);
    let lastName = tempLast[1];
    const searchLength = searchTerm.length > 0;

    if (searchLength && name !== searchTerm) {
    return name.startsWith(searchTerm) || lastName.startsWith(searchTerm);
    }
    return false;
    })
    .slice(0, 15)
    .map(function (player) {
    return (
     <div
        onClick={() => onPlayerSelectFromList(player.Player_Name, player)}
        key={player.Player_Name}
        className={styles.selectMenuItem}
        >
        {player.Player_Name}
     </div>
    );
    })}
</form>
    

  
    
    
    {/* <div className={styles.chartWrapper}> */}
        {/* Add the PlayerGradesChart component */}
        <PlayerGradesChart rookieGuideData={comparePlayer.rookieGuideData} filmGrades={comparePlayer.filmGrades} isSelectedPlayer={false} name={comparePlayer.Player_Name} />
    {/* </div> */}
    

    <div className={styles.breakdownAndDataTablesWrapper}>

    <div>
    <h3 className={styles.BreakdownHeading}>Player Breakdown</h3>
    <p className={styles.breakdown} 
    dangerouslySetInnerHTML={{
        __html: comparePlayer.PlayerBio && comparePlayer.PlayerBio.Breakdown
            ? comparePlayer.PlayerBio.Breakdown.replace(/<br\s*\/?>/gi, '<br />')
            : ''
    }} />
    </div>

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
                            {Object.keys(comparePlayer).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                const yearData = comparePlayer[yearKey].passing; // Access the passing data for each year
                                const season = comparePlayer[yearKey].season;
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
                                <td className={styles.tableCell}>{comparePlayer.careerPassing.totalGames}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerPassing.totalCmp}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerPassing.totalAtt}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerPassing.totalCmpPercentage}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerPassing.totalYards}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerPassing.totalYG}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerPassing.totalYA}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerPassing.totalTDs}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerPassing.totalInt}</td>
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
                            {Object.keys(comparePlayer).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                const yearData = comparePlayer[yearKey].rushing; // Access the rushing data for each year
                                const season = comparePlayer[yearKey].season;
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
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalGames}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalRushAtt}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalRushYds}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing['totalRushY_G']}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing['totalRushY_A']}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalRushTD}</td>
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
                            {Object.keys(comparePlayer).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                const yearData = comparePlayer[yearKey].rushing; // Access the rushing data for each year
                                const season = comparePlayer[yearKey].season;
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
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalGames}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalRushAtt}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalRushYds}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing['totalRushY_G']}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing['totalRushY_A']}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalRushTD}</td>
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
                            {Object.keys(comparePlayer).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                const yearData = comparePlayer[yearKey].receiving; // Access the receiving data for each year
                                const season =comparePlayer[yearKey].season;
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
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalGames}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerReceiving.totalRec}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerReceiving.totalRecYds}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerReceiving['totalRecY_G']}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerReceiving.totalRecTD || 0}</td>
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
                            {Object.keys(comparePlayer).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                const yearData = comparePlayer[yearKey].receiving; // Access the receiving data for each year
                                const season = comparePlayer[yearKey].season;
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
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalGames}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerReceiving.totalRec}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerReceiving.totalRecYds}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerReceiving['totalRecY_G']}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerReceiving.totalRecTD || 0}</td>
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
                            {Object.keys(comparePlayer).filter(key => key.startsWith('year')).map((yearKey, index) => {
                                const yearData = comparePlayer[yearKey].rushing; // Access the rushing data for each year
                                const season = comparePlayer[yearKey].season;
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
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalGames}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalRushAtt}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalRushYds}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing['totalRushY_G']}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing['totalRushY_A']}</td>
                                <td className={styles.tableCell}>{comparePlayer.careerRushing.totalRushTD}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )}
    </div>
    </div>
   

  
    
    
</div>
)}