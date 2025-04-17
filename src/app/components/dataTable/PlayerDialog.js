import React, { useEffect, useRef, useState } from "react";
import styles from "./dataTable.module.css";
import PlayerGradesChart from "./PlayerGradesChart"; // Adjust the import path as necessary
import Image from "next/image";
import PlayerBarChart from "./PlayerBarChart";

export default function PlayerDialog({
  player,
  onClose,
  data,
  comparePlayer,
  setComparePlayer,
}) {
  const dialogRef = useRef(null); // Create a ref for the dialog
  const [isAvailable, setIsAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isPlayerOnNFLTeam, setIsPlayerOnNFLTeam] = useState(true);

  const [comparePlayerName, setComparePlayerName] = useState(null);
  const [comparePlayerData, setComparePlayerData] = useState(null);

  const [teamOnePlayers, setTeamOnePlayers] = React.useState([]);
  const [teamOneSearchValue, setTeamOneSearchValue] = React.useState("");

  const [spiderComparePlayersList, setSpiderComparePlayersList] = useState([]);
  const [spiderSearchValue, setSpiderSearchValue] = useState("");

  function teamOneSearchOnChange(event) {
    setTeamOneSearchValue(event.target.value);
  }
  //
  function onPlayerSelectFromList(searchTerm, player) {
    // console.log(searchTerm, player)
    event.preventDefault();
    setTeamOneSearchValue(searchTerm);
    setTeamOnePlayers([player, ...teamOnePlayers]);
    setTeamOneSearchValue("");
    setComparePlayer(player);
  }
  // function onSearch(searchTerm, player) {
  //     event.preventDefault();
  //     // console.log(player)
  //     data.map(player => {
  //         if (player.Player_Name.toLowerCase() === teamOneSearchValue) {
  //             setTeamOneSearchValue(searchTerm);
  //             setTeamOnePlayers([player, ...teamOnePlayers]);
  //             setTeamOneSearchValue('');
  //         }
  //     });
  // }

  function removePlayer(name) {
    const newPlayerArray = teamOnePlayers.filter((player) => {
      return player.name !== name;
    });
    setComparePlayer(null);
    setTeamOnePlayers(newPlayerArray);
  }

  function spiderSearchOnChange(event) {
    setSpiderSearchValue(event.target.value);
  }

  function onSpiderPlayerSelectFromList(searchTerm, selectedPlayer) {
    event.preventDefault();
    if (spiderComparePlayersList.length < 4) {
      // Limit to 4 additional players (5 total including main player)
      setSpiderComparePlayersList([
        ...spiderComparePlayersList,
        selectedPlayer,
      ]);
    }
    setSpiderSearchValue("");
  }

  function removeSpiderComparePlayer(playerName) {
    setSpiderComparePlayersList(
      spiderComparePlayersList.filter((p) => p.Player_Name !== playerName)
    );
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose(); // Close the dialog if clicked outside
        setComparePlayer(null);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Log the comparePlayer whenever it changes
  useEffect(() => {
    // console.log(comparePlayer);
  }, [comparePlayer]);

  if (!player) return null; // Return null if no player is selected

  // Check if PlayerBio exists before accessing its properties
  const playerBio = player.PlayerBio || {};
  const isQuarterback = playerBio.Position === "QB";
  const isRunningBack = playerBio.Position === "RB";
  const isReceiverOrTE =
    playerBio.Position === "WR" || playerBio.Position === "TE";

  if (player.name === "Cam Skattebo") {
    player.PlayerBio.Draft_Year === 2025;
  }
  if (!player.PlayerBio.Draft_Year) {
    player.PlayerBio.Draft_Year = 2025;
  }
  const yearsSincePlayersDraft = player.PlayerBio.Draft_Year
    ? new Date().getFullYear() - player.PlayerBio.Draft_Year
    : null;
  // console.log(yearsSincePlayersDraft)
  const playerAge = player.PlayerBio.Draft_Age + yearsSincePlayersDraft;
  let playerIsOnTeam = true;
  let playersTeam = player.PlayerBio.NFL_Team.replace(" ", "");
  if (!player.PlayerBio.NFL_Team || player.PlayerBio.NFL_Team === "") {
    playerIsOnTeam = false;
  }
  playersTeam = playersTeam.replace(" ", "");

  if (player.name === "Justin Fields") {
    playersTeam = "NewYorkJets";
  }

  console.log(player);

  // let sortedPlayersByAlltimeOverallGrade = data.sort(
  //   (a, b) => b.rookieGuideData.Overall_Grade - a.rookieGuideData.Overall_Grade

  // )

  let sortedPlayersByAlltimeOverallGrade = data.sort((a, b) => {
    if (a.rookieGuideData.Overall_Grade > b.rookieGuideData.Overall_Grade) {
      return -1;
    }
    if (a.rookieGuideData.Overall_Grade < b.rookieGuideData.Overall_Grade) {
      return 1;
    }
    return 0;
  });

  let classArray2021 = data.filter(
    (player) => player.rookieGuideData.Class === "2021"
  );
  classArray2021.sort(
    (a, b) => b.rookieGuideData.Overall_Grade - a.rookieGuideData.Overall_Grade
  );

  let classArray2022 = data.filter(
    (player) => player.rookieGuideData.Class === "2022"
  );
  classArray2022.sort(
    (a, b) => b.rookieGuideData.Overall_Grade - a.rookieGuideData.Overall_Grade
  );

  let classArray2023 = data.filter(
    (player) => player.rookieGuideData.Class === "2023"
  );
  classArray2023.sort(
    (a, b) => b.rookieGuideData.Overall_Grade - a.rookieGuideData.Overall_Grade
  );

  let classArray2024 = data.filter(
    (player) => player.rookieGuideData.Class === "2024"
  );
  classArray2024.sort(
    (a, b) => b.rookieGuideData.Overall_Grade - a.rookieGuideData.Overall_Grade
  );

  let classArray2025 = data.filter(
    (player) => player.rookieGuideData.Class === "2025"
  );
  classArray2025.sort(
    (a, b) => b.rookieGuideData.Overall_Grade - a.rookieGuideData.Overall_Grade
  );

  // console.log(sortedPlayersByAlltimeOverallGrade)
  sortedPlayersByAlltimeOverallGrade.forEach((player, index) => {
    player.AlltimeRank = index + 1;
  });

  classArray2021.forEach((player, index) => {
    player.ClassRank = index + 1;
  });

  classArray2022.forEach((player, index) => {
    player.ClassRank = index + 1;
  });
  classArray2023.forEach((player, index) => {
    player.ClassRank = index + 1;
  });
  classArray2024.forEach((player, index) => {
    player.ClassRank = index + 1;
  });
  classArray2025.forEach((player, index) => {
    player.ClassRank = index + 1;
  });

  player.firstName = player.Player_Name.split(" ").slice(0, -1).join(" ");
  player.lastName = player.Player_Name.split(" ").slice(-1).join(" ");
  // console.log(`/${playersTeam}.png`)

  let productionGradeForGraphic =
    +player.playerDataProductionGrades[0]["Production Grade"];

  productionGradeForGraphic = productionGradeForGraphic.toFixed(1);

  if (player.playerDataProductionGrades[0]["Production Grade"] > 99.9) {
    productionGradeForGraphic = "99.9";
  }

  // console.log(productionGradeForGraphic);
  // console.log(typeof player.playerDataProductionGrades[0]["Production Grade"], typeof player.productionGradeForGraphic)

  // console.log(player.rookieGuideData.Talent_Grade);
  if (player.rookieGuideData.Talent_Grade === 81) {
    // player.rookieGuideData.Talent_Grade = 81.1;
  }

  if (playerBio.Height > 65) {
    let temp = +playerBio.Height;
    playerBio.Height = (temp / 12).toFixed(1);
  }

  // console.log(player.rookieGuideData.Talent_Grade.toFixed(1));

  console.log(typeof playerBio.Height, playerBio.Height);

  //
  ///
  ////
  /////
  ////
  //
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent} ref={dialogRef}>
        <button onClick={onClose} className={styles.closeBtn}>
          X
        </button>
        <div className={styles.teamLogoPlayerNameAndInfoboxWrapper}>
          <div className={styles.teamLogoPlayerNameanInfoboxWrapper}>
            {playerIsOnTeam && (
              <Image
                src={`/${playersTeam}.png`}
                height={100}
                width={150}
                alt="team logo"
                className={styles.teamLogo}
              />
            )}

            <div className={styles.playerName}>
              <div className={styles.firstName}>{player.firstName}</div>
              <br />
              <div className={styles.lastName}>{player.lastName}</div>
            </div>

            <div className={styles.infoBox}>
              {/* {playerBio.Position && (
                <p>
                  <strong>{playerBio.Position}: </strong> {playerBio.NFL_Team}
                </p>
              )} */}
              {playerBio.Height && (
                <p>
                  <strong>
                    {playerBio.Height} - {playerBio.Weight}
                  </strong>{" "}
                </p>
              )}
              {playerAge && (
                <p>
                  <strong>Age:</strong> {playerAge}
                </p>
              )}
              {playerBio.Draft_Year && (
                <p>
                  <strong>Draft Class:</strong> {playerBio.Draft_Year}
                </p>
              )}
              {playerAge && (
                <p>
                  <strong>Experience:</strong> {yearsSincePlayersDraft} years
                </p>
              )}
              {/* {playerBio.Draft_Pick && (
                <p>
                  <strong>Draft Pick:</strong> {playerBio.Draft_Pick}
                </p>
              )} */}

              {playerBio.School && (
                <p>
                  <strong>College:</strong> {playerBio.School}
                </p>
              )}
            </div>

            <div className={styles.ranksSection}>
              <p>Overall Rank: {player.rookieGuideData.Rank}</p>
              <p>Position Rank: {player.rookieGuideData.Position_Rank}</p>
              <p>Historic Rank: {player.AlltimeRank}</p>
            </div>
          </div>
        </div>
        <div className={styles.playerGradesGraphicsSectionWrapper}>
          <div>
            <Image
              src={`/${player.rookieGuideData.Overall_Grade.toFixed(
                1
              )} Rookie Grade Trap.png`}
              height={100}
              width={150}
              alt="team logo"
              className={styles.teamLogo}
            />
            <div className={styles.gradeGraphicLabel}>Overall</div>
          </div>
          <div>
            <Image
              src={`/${player.rookieGuideData.Talent_Grade.toFixed(
                1
              )} Rookie Grade Trap.png`}
              height={100}
              width={150}
              alt="team logo"
              className={styles.teamLogo}
            />
            <div className={styles.gradeGraphicLabel}>Talent</div>
          </div>
          <div>
            <Image
              src={`/${productionGradeForGraphic} Rookie Grade Trap.png`}
              height={100}
              width={150}
              alt="team logo"
              className={styles.teamLogo}
            />
            <div className={styles.gradeGraphicLabel}>Production</div>
          </div>
        </div>
        {/* <PlayerBarChart
              overallGrade={player.rookieGuideData.Overall_Grade}
              talentGrade={player.rookieGuideData.Talent_Grade}
              analyticalGrade={player.rookieGuideData.Analytical_Grade}
              className={styles.playerBarChart}
            /> */}

        {/* <form
          onSubmit={() => onPlayerSelectFromList(player.Player_Name, player)}
          className={styles.searchForm}
        >
          <div className={styles.searchInputAndButtonWrapper}>
            <input
              type="text"
              value={teamOneSearchValue}
              onChange={teamOneSearchOnChange}
              placeholder="Search player to compare"
              className={styles.teamOneSearchInput}
            /> */}
        {/* <button
                        onClick={() => onPlayerSelectFromList(player.Player_Name, player)}
                        className={styles.addPlayerButton}
                        >
                         Compare
                        </button> */}
        {/* </div>

          {data
            .filter((player) => {
              const searchTerm = teamOneSearchValue.toLowerCase();
              const name = player.Player_Name.toLowerCase();
              let tempLast = name.split(/\s/);
              let lastName = tempLast[1];
              const searchLength = searchTerm.length > 0;

              if (searchLength && name !== searchTerm) {
                return (
                  name.startsWith(searchTerm) || lastName.startsWith(searchTerm)
                );
              }
              return false;
            })
            .slice(0, 15)
            .map(function (player) {
              return (
                <div
                  onClick={() =>
                    onPlayerSelectFromList(player.Player_Name, player)
                  }
                  key={player.Player_Name}
                  className={styles.selectMenuItem}
                >
                  {player.Player_Name}
                </div>
              );
            })}
        </form> */}

        <PlayerGradesChart
          rookieGuideData={player.rookieGuideData}
          playerBio={player.PlayerBio}
          talentGrades={player.talentGrades}
          productionGrades={player.productionGrades}
          isSelectedPlayer={true}
          name={player.Player_Name}
          comparePlayerData={
            comparePlayer
              ? {
                  rookieGuideData: comparePlayer.rookieGuideData,
                  talentGrades: comparePlayer.talentGrades,
                  name: comparePlayer.Player_Name,
                }
              : null
          }
          spiderComparePlayers={spiderComparePlayersList}
          spiderSearchValue={spiderSearchValue}
          onSpiderSearchChange={spiderSearchOnChange}
          onSpiderPlayerSelect={onSpiderPlayerSelectFromList}
          onRemoveSpiderPlayer={removeSpiderComparePlayer}
          allPlayers={data}
          mainPlayerName={player.Player_Name}
          spiderComparePlayersList={spiderComparePlayersList}
        />

        {/* <div className={styles.breakdownAndDataTablesWrapper}>
          <div>
            <h3 className={styles.BreakdownHeading}>Scouting Report</h3>
            <p
              className={styles.breakdown}
              dangerouslySetInnerHTML={{
                __html:
                  player.PlayerBio && player.PlayerBio.Breakdown
                    ? player.PlayerBio.Breakdown.replace(
                        /<br\s*\/?>/gi,
                        "<br />"
                      )
                    : "",
              }}
            />
          </div> */}

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
                    {Object.keys(player)
                      .filter((key) => key.startsWith("year"))
                      .map((yearKey, index) => {
                        const yearData = player[yearKey].passing; // Access the passing data for each year
                        const season = player[yearKey].season;
                        return (
                          <tr key={index}>
                            <td className={styles.tableCell}>{season}</td>
                            <td className={styles.tableCell}>{yearData.G}</td>
                            <td className={styles.tableCell}>{yearData.Cmp}</td>
                            <td className={styles.tableCell}>{yearData.Att}</td>
                            <td className={styles.tableCell}>
                              {yearData["Cmp%"]}
                            </td>
                            <td className={styles.tableCell}>{yearData.Yds}</td>
                            <td className={styles.tableCell}>
                              {yearData["Y/G"]}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData["Y/A"]}
                            </td>
                            <td className={styles.tableCell}>{yearData.TD}</td>
                            <td className={styles.tableCell}>{yearData.Int}</td>
                          </tr>
                        );
                      })}
                    {/* Add career statistics row */}
                    <tr>
                      <td className={styles.tableCell}>Career</td>
                      <td className={styles.tableCell}>
                        {player.careerPassing.totalGames}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerPassing.totalCmp}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerPassing.totalAtt}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerPassing.totalCmpPercentage}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerPassing.totalYards}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerPassing.totalYG}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerPassing.totalYA}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerPassing.totalTDs}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerPassing.totalInt}
                      </td>
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
                    {Object.keys(player)
                      .filter((key) => key.startsWith("year"))
                      .map((yearKey, index) => {
                        const yearData = player[yearKey].rushing; // Access the rushing data for each year
                        const season = player[yearKey].season;
                        return (
                          <tr key={index}>
                            <td className={styles.tableCell}>{season}</td>
                            <td className={styles.tableCell}>{yearData.G}</td>
                            <td className={styles.tableCell}>
                              {yearData.RushAtt}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData.RushYds}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData["RushY/G"]}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData["RushY/A"]}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData.RushTD}
                            </td>
                          </tr>
                        );
                      })}
                    {/* Add career statistics row */}
                    <tr>
                      <td className={styles.tableCell}>Career</td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalGames}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalRushAtt}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalRushYds}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing["totalRushY_G"]}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing["totalRushY_A"]}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalRushTD}
                      </td>
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
                    {Object.keys(player)
                      .filter((key) => key.startsWith("year"))
                      .map((yearKey, index) => {
                        const yearData = player[yearKey].rushing; // Access the rushing data for each year
                        const season = player[yearKey].season;
                        return (
                          <tr key={index}>
                            <td className={styles.tableCell}>{season}</td>
                            <td className={styles.tableCell}>{yearData.G}</td>
                            <td className={styles.tableCell}>
                              {yearData.RushAtt}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData.RushYds}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData["RushY/G"]}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData["RushY/A"]}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData.RushTD}
                            </td>
                          </tr>
                        );
                      })}
                    {/* Add career statistics row */}
                    <tr>
                      <td className={styles.tableCell}>Career</td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalGames}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalRushAtt}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalRushYds}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing["totalRushY_G"]}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing["totalRushY_A"]}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalRushTD}
                      </td>
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
                    {Object.keys(player)
                      .filter((key) => key.startsWith("year"))
                      .map((yearKey, index) => {
                        const yearData = player[yearKey].receiving; // Access the receiving data for each year
                        const season = player[yearKey].season;
                        return (
                          <tr key={index}>
                            <td className={styles.tableCell}>{season}</td>
                            <td className={styles.tableCell}>{yearData.G}</td>
                            <td className={styles.tableCell}>{yearData.Rec}</td>
                            <td className={styles.tableCell}>
                              {yearData.RecYds}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData["RecY/G"]}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData.RecTD}
                            </td>
                          </tr>
                        );
                      })}
                    {/* Add career statistics row */}
                    <tr>
                      <td className={styles.tableCell}>Career</td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalGames}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerReceiving.totalRec}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerReceiving.totalRecYds}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerReceiving["totalRecY_G"]}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerReceiving.totalRecTD || 0}
                      </td>
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
                    {Object.keys(player)
                      .filter((key) => key.startsWith("year"))
                      .map((yearKey, index) => {
                        const yearData = player[yearKey].receiving; // Access the receiving data for each year
                        const season = player[yearKey].season;
                        return (
                          <tr key={index}>
                            <td className={styles.tableCell}>{season}</td>
                            <td className={styles.tableCell}>{yearData.G}</td>
                            <td className={styles.tableCell}>{yearData.Rec}</td>
                            <td className={styles.tableCell}>
                              {yearData.RecYds}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData["RecY/G"]}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData.RecTD}
                            </td>
                          </tr>
                        );
                      })}
                    {/* Add career statistics row */}
                    <tr>
                      <td className={styles.tableCell}>Career</td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalGames}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerReceiving.totalRec}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerReceiving.totalRecYds}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerReceiving["totalRecY_G"]}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerReceiving.totalRecTD || 0}
                      </td>
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
                    {Object.keys(player)
                      .filter((key) => key.startsWith("year"))
                      .map((yearKey, index) => {
                        const yearData = player[yearKey].rushing; // Access the rushing data for each year
                        const season = player[yearKey].season;
                        let temp = yearData.G;
                        if (!yearData.RushAtt || yearData.RushAtt === "0") {
                          temp = 0;
                        }
                        return (
                          <tr key={index}>
                            <td className={styles.tableCell}>{season}</td>
                            <td className={styles.tableCell}>
                              {yearData.G || temp}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData.RushAtt || 0}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData.RushYds || 0}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData["RushY/G"] || 0}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData["RushY/A"] || 0}
                            </td>
                            <td className={styles.tableCell}>
                              {yearData.RushTD || 0}
                            </td>
                          </tr>
                        );
                      })}
                    {/* Add career statistics row */}
                    <tr>
                      <td className={styles.tableCell}>Career</td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalGames}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalRushAtt}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalRushYds}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing["totalRushY_G"]}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing["totalRushY_A"]}
                      </td>
                      <td className={styles.tableCell}>
                        {player.careerRushing.totalRushTD}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
