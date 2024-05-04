import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./DataGrid.css";
import TankSummary from "../tankSummary/TankSummary";

// Define ButtonRenderer component before referencing it
const ButtonRenderer = ({ onClick, data }) => {
  const handleClick = () => {
    onClick(data); // Pass rowData to handleClick function
  };
  const buttonStyle = {
    backgroundColor: "#007bff", // Blue background color
    color: "white", // White text color
    border: "none", // No border
    borderRadius: "4px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
    fontWeight: "bold", // Bold font weight
  };

  return <button style={buttonStyle} onClick={handleClick}>View</button>;
};

export default function DataGrid() {
  const [rowData, setRowData] = useState();
  const [selectedBANo, setSelectedBANo] = useState(null); // State to track selected BA number
  const [showSummary, setShowSummary] = useState(false); // State to track whether to show summary

  const handleClick = useCallback((rowData) => {
    console.log("Row data:", rowData);
    console.log("Row data:", rowData["BA No"]);

    setSelectedBANo(rowData["BA No"]); // Set selected BA number
    setShowSummary(true); // Show summary component
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "SNO", minWidth: 170 },
    { field: "Unit" },
    { field: "Type of Eqpt" },
    { field: "Issue Type" },
    { field: "BA No" },
    {
      field: "actions",
      headerName: "Summary",
      cellRenderer: ButtonRenderer, // Corrected component name
      cellRendererParams: {
        onClick: handleClick,
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    try {
      fetch('/allData')
        .then((resp) => resp.json())
        .then((data) => {
          // Filter rows to keep only unique BA No
          const uniqueBANoSet = new Set();
          const filteredData = data.filter((row) => {
            const isUnique = !uniqueBANoSet.has(row["BA No"]);
            if (isUnique) {
              uniqueBANoSet.add(row["BA No"]);
            }
            return isUnique;
          });

          setRowData(filteredData);

          // Add a slight delay before autosizing columns
          setTimeout(() => {
            params.api.sizeColumnsToFit();
          }, 100);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // Register the custom cell renderer as a framework component
  const frameworkComponents = useMemo(() => ({
    ButtonRenderer: ButtonRenderer, // Corrected component name
  }), []);

  return (
    <div>
      <div style={{ backgroundColor: "#333", padding: "10px", marginBottom: "20px" }}>
        <h1 style={{ color: "#fff", textAlign: "center", margin: 0 }}>EQPT Dashboard</h1>
      </div>
      {showSummary ? (
        <div>
          <button
            onClick={() => setShowSummary(false)}
            style={{
              backgroundColor: "rgb(139 92 246)", // Red background color
              color: "white", // White text color
              border: "none", // No border
              borderRadius: "4px", // Rounded corners
              cursor: "pointer", // Pointer cursor on hover
              fontSize: "14px", // Font size
              fontWeight: "bold", // Bold font weight
              marginRight: "10px", // Add some margin to the right
              marginTop: "10px", // Add some margin to the right
              marginLeft: "10px", // Add some margin to the right
            }}
          >
            Back to Grid
          </button>          <TankSummary baNo={selectedBANo} />
        </div>
      ) : (
        <div className="center-grid">

          <div className="ag-theme-quartz-dark gridClass center-grid">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              frameworkComponents={{ ButtonRenderer }}
              className="gridClass"
              pagination={true}
              onGridReady={onGridReady}
            />
          </div>
        </div>
      )}
    </div>
  );
}
