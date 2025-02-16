"use client"

import React from "react";
import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import {
    AllCommunityModule,
    ModuleRegistry,
    createGrid,
    themeQuartz,
  } from "ag-grid-community";
  ModuleRegistry.registerModules([AllCommunityModule]);
  
  
import styles from './dataTable.module.css'

export default function DataTable({ data }) {

    // console.log(data)
    const myTheme = themeQuartz.withParams({
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
  
    

    const [rowData, setRowData] = React.useState([]);

    
    React.useEffect(() => {
    const newPlayerArray = [];

    data.map((player) => {
        let p = {};

        // console.log(player)


        p.name = player.Player_Name;
        p.Pos = player.rookieGuideData.Position



        newPlayerArray.push(p)
    })

    setRowData(newPlayerArray)

}, [data])

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
      
      maxWidth: 90,
    },
])

    const defaultColDef = {
        flex: 1,
      };

    return (
        <div style={containerStyle}>
        <div className="ag-theme-quartz-dark" style={gridStyle}>
            <AgGridReact
                columnDefs={colDefs}
                rowData={rowData}
                pagination={true}
                paginationPageSize={50}
                theme={theme}
                // modules={[ClientSideRowModelModule]} // Register the module here
            />
        </div>
        </div>
    );
}