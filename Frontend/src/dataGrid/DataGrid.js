import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./DataGrid.css";

export default function DataGrid() {
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    { field: "SNO", minWidth: 170 },
    { field: "Unit" },
    { field: "Type of Eqpt" },
    { field: "Issue Type" },
    { field: "BA No" },
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
          setRowData(data);
          // Add a slight delay before autosizing columns
          setTimeout(() => {
            params.api.sizeColumnsToFit();
          }, 100);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);
  return (
    <div className="center-grid">
      <div
        className=
        "ag-theme-quartz-dark gridClass center-grid"
      >
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