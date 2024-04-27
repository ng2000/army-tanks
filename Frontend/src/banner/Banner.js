import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function Banner() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/allData'); // Assuming your API endpoint is '/allData'
      setRowData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fieldMap = {
    sno: 'SNO',
    unit: 'Unit',
    typeOfEquipment: 'Type of Eqpt',
    issueType: 'Issue Type',
    baNo: 'BA No',
    chassisNo: 'Chassis No',
    engineOrgOH: 'Engine Org/OH',
    engKm: 'Eng Km',
    engHrs: 'Eng Hrs',
    chassisKm: 'Chassis Km',
    chassisHrs: 'Chassis Hrs',
    tmIDone: 'TM I Done',
    tmIDue: 'TM I Due',
    tmIIDone: 'TM II Done',
    tmIIDue: 'TM II Due',
    mrIDueDt: 'MR-I Due Dt',
    mrIDoneDt: 'MR-I Done Dt',
    ohIDueDt: 'OH-I Due Dt',
    ohIDoneDt: 'OH-I Done Dt',
    mrIIDue: 'MR II Due',
    mrIIDone: 'MR II Done',
    ohIIDue: 'OH II Due',
    ohIIDone: 'OH II Done',
    serR2EOAVOR: 'SER/R2/EOA/VOR',
    assy: 'Assy',
    section: 'Section',
    natureOfDefect: 'Nature of Defect',
    demandPlacedTo: 'Demand Placed To',
    demandNoDt: 'Demand No & Dt',
    contNoDt: 'Cont No & Dt',
    workOrderNoDate: 'Work Order No & Dt',
    fwdTo: 'Fwd To',
    since: 'Since',
    presentStatus: 'Present Status',
    underRepairTime: 'Under Repair Time',
    efcRDSFired: 'EFC/RDS Fired',
    chamberElongation: 'Chamber Elongation',
    bore: 'Bore',
    gunPullBackDoneDate: 'Gun Pull Back Done Date',
    siDetails: 'SI Details',
    fumeExtractor: 'Fume Extractor',
    n2PurgingDueDate: 'N2 Purging Due Date',
    n2PurgingCarriedOut: 'N2 Purging Carried Out',
    getterActivationDoneDate: 'Getter Activation Done Date (Check Every 3 Months)'
  };

  const columnDefs = Object.values(fieldMap).slice(0, 5).map(key => ({
    field: key,
    headerName: key,
    sortable: true,
    filter: true
  }));

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
      />
    </div>
  );
}
