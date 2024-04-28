import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./DueDataGrid.css";

export default function DueDataGrid() {
  const [rowData, setRowData] = useState([]);

 const columnDefs = useMemo(() => [
   { field: "BA No", minWidth: 170 },
   {
     field: "TM I Due",
     filter: "agDateColumnFilter",
     filterParams: {
       filterOptions: [
         "equals",
         "notEqual",
         "lessThan",
         "lessThanOrEqual",
         "greaterThan",
         "greaterThanOrEqual",
         "inRange",
       ],
     },
   },
   // Include other columns here with similar configurations
 ], []);


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
          // Parse date strings into Date objects
          const uniqueBANoMap = new Map();

          const filteredData = data.reduce((acc, row) => {
            // Check if the BA No is already in the map
            if (uniqueBANoMap.has(row["BA No"])) {
              // If it exists, update the value with the latest record
              uniqueBANoMap.set(row["BA No"], row);
            } else {
              // If it doesn't exist, add it to the map
              uniqueBANoMap.set(row["BA No"], row);
            }
            // Return the accumulated values
            return Array.from(uniqueBANoMap.values());
          }, []);


          const parsedData = filteredData.map(row => ({
            ...row,
            // Assuming "TM I Due" is a date string in the format "dd-mm-yyyy"
            "TM I Due": parseDateString(row["TM I Due"]),
            // Include similar parsing for other date fields
          }));
          setRowData(parsedData);
          // Add a slight delay before autosizing columns
          setTimeout(() => {
            params.api.sizeColumnsToFit();
          }, 100);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // Custom comparator for date filtering
  const dateComparator = (filterLocalDateAtMidnight, cellValue) => {
  console.log("filterLocalDateAtMidnight ",filterLocalDateAtMidnight);
  console.log("cellValue ",cellValue);
    // Convert cell value (date string) to a JavaScript Date object
    const cellDate = parseDateString(cellValue);
    // Check if cellDate is valid
    if (cellDate) {
      // Compare cellDate with filterLocalDateAtMidnight
      if (cellDate.getTime() === filterLocalDateAtMidnight.getTime()) {
        return 0; // Dates are equal
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1; // cellDate is before filter date
      }
      return 1; // cellDate is after filter date
    }
    // If cellDate is invalid, return 0 (equal)
    return 0;
  };

  // Helper function to parse date strings into Date objects
  const parseDateString = (dateString) => {
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Month is 0-based
      const year = parseInt(dateParts[2], 10);
      return new Date(year, month, day);
    }
    return null; // Return null for invalid date strings
  };

  return (
    <div className="center-grid">
      <div className="ag-theme-quartz-dark gridClass center-grid">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          className="gridClass"
          pagination={true}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};
