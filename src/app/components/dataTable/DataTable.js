"use client"

import React from "react";
import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import {
    AllCommunityModule,
    ModuleRegistry,
    createGrid,
    themeAlpine,
  } from "ag-grid-community";
  ModuleRegistry.registerModules([AllCommunityModule]);
  
  
import styles from './dataTable.module.css'

export default function DataTable({ data }) {

    // console.log(data)
    const myTheme = themeAlpine.withParams({
        backgroundColor: "hsl(210deg, 15%, 25%)",
        foregroundColor: "hsl(210deg, 20%, 77%)",
        headerTextColor: "hsl(210deg, 20%, 77%)",
        headerBackgroundColor: "hsl(210deg, 15%, 20%)",
        oddRowBackgroundColor: "hsl(210deg, 10%, 40%)",
        headerColumnResizeHandleColor: "hsl(210deg, 19%, 10%)",
      });

      const containerStyle = useMemo(() => ({ width: "100%", height: "100dvh" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const theme = useMemo(() => {
    return myTheme;
  }, []);
  
    
    const [classYear, setClassYear] = React.useState(2021)

    const [rowData, setRowData] = React.useState([]);


    let dataToUse = data

    function year2021(event) {
      setClassYear(2021);
      console.log(classYear)
    }
    function year2022(event) {
      setClassYear(2022);
      console.log(classYear)
    }
    function year2023(event) {
      setClassYear(2023);
      console.log(classYear)
    }
    function year2024(event) {
      setClassYear(2024);
      console.log(classYear)
    }
    function year2025(event) {
      setClassYear(2025);
      console.log(classYear)
    }
    function yearAll(event) {
      setClassYear("all");
      console.log(classYear)
    }

  //  React.useEffect(() => {
    
    

    

  //  }, [classYear])

    
  //  console.log(dataToUse)

    React.useEffect(() => {
    const newPlayerArray = [];

    let dataToUse = data.filter((player) => {
      
      return +player.rookieGuideData.Class === classYear
    })

    if(classYear === "all") {
      dataToUse = data
    }

    dataToUse.map((player) => {
        let p = {};

        // console.log(player)


        p.name = player.Player_Name;
        p.Pos = player.rookieGuideData.Position
        p.class = player.rookieGuideData.Class
      
        if(player.rookieGuideData.Overall_Grade) {
       let tempOverall = +player.rookieGuideData.Overall_Grade
        
        p.Grade = (tempOverall).toFixed(1)
        }
        else{
          p.Grade = player.rookieGuideData.Overall_Grade
        }

        p.film = player.rookieGuideData.Film_Grade

        if(player.rookieGuideData.Analytical_Grade) {
          let tempAnalytical = +player.rookieGuideData.Analytical_Grade
           
           p.analytical = (tempAnalytical).toFixed(1)
           }
           else{
             p.analytical = player.rookieGuideData.Analytical_Grade
           }

           if(player.rookieGuideData.Landing_Spot) {
            let tempLanding = +player.rookieGuideData.Landing_Spot
             
             p.Landing = (tempLanding).toFixed(1)
             }
             else{
               p.Landing = player.rookieGuideData.Landing_Spot
             }
       
             p.G = +player.careerRushing.totalGames
        p.ruAtt = +player.careerRushing.totalRushAtt
        p.ruYds = +player.careerRushing.totalRushYds
        p.ruTD = +player.careerRushing.totalRushTD
        p['Ru Y/A'] = +player.careerRushing.totalRushY_A
        let tempRYG = +player.careerRushing.totalRushY_G
        p['Ru Y/G'] = +Math.round(tempRYG)

        p.rec = +player.careerReceiving.totalRec
        p.reYds = +player.careerReceiving.totalRecYds
        p.reTD = +player.careerReceiving.totalRecTD
        p['Re Y/R'] = +player.careerReceiving.totalRecY_R
        let tempYperG = +player.careerReceiving.totalRecY_G
        p['Re Y/G'] = Math.round(tempYperG)

        p.pAtt = +player.careerPassing.totalAtt
        p.Cmp = +player.careerPassing.totalCmp
        let tempcmpPercent = +player.careerPassing.totalCmpPercentage
        p["cmp%"] = tempcmpPercent.toFixed(1)
        p.pYds = +player.careerPassing.totalYards
        
        p.pTD = +player.careerPassing.totalTDs
        p['TD%'] = +player.careerPassing.totalTDPercentage
        p.Int = +player.careerPassing.totalInt
        p['Int%'] = +player.careerPassing.totalIntPercentage
        p['Y/A'] = +player.careerPassing.totalYA
        let tempPYC = +player.careerPassing.totalYC
        p['Y/C'] = tempPYC.toFixed(1)
        let tempPYG = +player.careerPassing.totalYG
        p['Y/G'] = Math.round(tempPYG)



        newPlayerArray.push(p)
    })

    setRowData(newPlayerArray)

}, [data, classYear])

const [colDefs, setColDefs] = React.useState([
    {
      field: "name",
      filter: true,
      floatingFilter: true,
      flex: 1,
      pinned: "left",
      maxWidth: 140,
    },
    {
      field: "Pos",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 85,
    },
    {
      field: "class",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 80,
    },
    {
      field: "Grade",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 80,
    },
    // {
    //   field: "film",
    //   filter: true,
    //   floatingFilter: true,
    //   flex: 1,
      
    //   maxWidth: 70,
    // },
    // {
    //   field: "analytical",
    //   filter: true,
    //   floatingFilter: true,
    //   flex: 1,
      
    //   maxWidth: 95,
    // },
    // {
    //   field: "Landing",
    //   filter: true,
    //   floatingFilter: true,
    //   flex: 1,
      
    //   maxWidth: 90,
    // },
    // {
    //   field: "G",
    //   filter: true,
    //   floatingFilter: true,
    //   flex: 1,
      
    //   maxWidth: 50,
    // },
    {
      field: "ruAtt",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 75,
    },
    {
      field: "ruYds",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 75,
    },
    {
      field: "ruTD",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 70,
    },
    {
      field: "Ru Y/A",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 80,
    },
    {
      field: "Ru Y/G",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 80,
    },
    {
      field: "rec",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 60,
    },
    {
      field: "reYds",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 75,
    },
    {
      field: "reTD",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 75,
    },
    {
      field: "Re Y/R",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 75,
    },
    {
      field: "Re Y/G",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 75,
    },
    {
      field: "pAtt",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 70,
    },
    {
      field: "Cmp",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 70,
    },
    {
      field: "cmp%",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 80,
    },
    {
      field: "pYds",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 75,
    },
    {
      field: "pTD",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 70,
    },
    {
      field: "TD%",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 65,
    },
    {
      field: "Int",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 55,
    },
    {
      field: "Int%",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 65,
    },
    {
      field: "Y/A",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 60,
    },
    {
      field: "Y/C",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 60,
    },
    {
      field: "Y/G",
      filter: true,
      floatingFilter: true,
      flex: 1,
      
      maxWidth: 80,
    },
])





    const defaultColDef = {
        flex: 1,
      };


   
    

    return (
        <div style={containerStyle}>
          <div className={styles.clsSelectBtnsWrapper}>
          
          <button className={styles.clsSelectBtn} value={2021} onClick={year2021}>2021</button>
          <button className={styles.clsSelectBtn} onClick={year2022}>2022</button>
          <button className={styles.clsSelectBtn} onClick={year2023}>2023</button>
          <button className={styles.clsSelectBtn} onClick={year2024}>2024</button>
          <button className={styles.clsSelectBtn} onClick={year2025}>2025</button>
          <button className={styles.clsSelectBtn} onClick={yearAll}>21-25</button>

        </div>
        <div className="ag-theme-alpine-dark" style={gridStyle}>
            <AgGridReact
                columnDefs={colDefs}
                rowData={rowData}
                pagination={true}
                paginationPageSize={50}
                theme={theme}
                className={styles.dataGrid}
                // modules={[ClientSideRowModelModule]} // Register the module here
            />
        </div>
        </div>
    );
}