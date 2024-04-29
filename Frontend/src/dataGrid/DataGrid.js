import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./DataGrid.css";

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

  // Define the handleClick function before using it
  const handleClick = (rowData) => {
    console.log("Row data:", rowData);
  };

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
    <div className="center-grid">
      <div className="ag-theme-quartz-dark gridClass center-grid">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          frameworkComponents={frameworkComponents}
          className="gridClass"
          pagination={true}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}
