import React, { useCallback, useMemo, useRef, useState, StrictMode } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./TankSummary.css";

export default function TankSummary() {
  const [rowData, setRowData] = useState();
  const [selectedBANo, setSelectedBANo] = useState(null);

  const [columnDefs, setColumnDefs] = useState([
    { field: "SNO", minWidth: 170 },
    { field: "Unit" },
    { field: "Type of Eqpt" },
    { field: "Issue Type" },
    { field: "BA No" },
  ]);

  const [columnDefs1, setColumnDefs1] = useState([
    { field: "SNO", minWidth: 170 },
    { field: "Unit" },
    { field: "Type of Eqpt" },
    { field: "BA No" },
  ]);

  const [columnDefs2, setColumnDefs2] = useState([
    { field: "SNO", minWidth: 170 },
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

  const handleSelectBANo = useCallback((event) => {
    setSelectedBANo(event.target.value);
  }, []);

  const filteredRowData = useMemo(() => {
    if (!selectedBANo) return rowData;
    return rowData.filter(row => row["BA No"] === selectedBANo);
  }, [selectedBANo, rowData]);

  return (
    <div className="center-grid">
      <div className="controls">
        <label htmlFor="bano-select">Select BA No:</label>
        <select id="bano-select" value={selectedBANo || ""} onChange={handleSelectBANo}>
          <option value="">All</option>
          {/* Populate options with unique BA No values */}
          {rowData &&
            Array.from(new Set(rowData.map(row => row["BA No"]))).map(bano => (
              <option key={bano} value={bano}>{bano}</option>
            ))}
        </select>
      </div>
      <div className="ag-theme-quartz-dark gridClass center-grid">
        <AgGridReact
          rowData={filteredRowData}
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
