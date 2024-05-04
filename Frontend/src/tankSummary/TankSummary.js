import React, { useCallback, useMemo, useRef, useState, StrictMode, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Modal } from 'react-bootstrap';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./TankSummary.css";
import EditTank from "../editTank/editTank";

export default function TankSummary({ baNo }) {
    const [rowData, setRowData] = useState();
    const [rowDataForUnique, setRowDataForUnique] = useState();
    const [selectedBANo, setSelectedBANo] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fieldMap = {
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
        siDetails: 'SI Details',
        fumeExtractor: 'Fume Extractor',
        getterActivationDoneDate: 'Getter Activation Done Date (Check Every 3 Months)',
        bde: "BDE",
        div: "DIV/(I) BDE",
        corps: "CORPS",
        yoi: "Year of Induction",
        eqptStatus: "EQPT STATUS",
        mrDueDt: 'MR Due Dt',
        mrCarriedOut: 'MR Carried Out',
        mrRemarks: 'MR Remarks',
        typeOfMR: "Type Of MR",
        ohDueDt: 'OH Due Dt',
        ohCarriedOut: 'OH Carried Out',
        ohRemarks: 'OH Remarks',
        typeOfOH: "Type Of OH",
        engRegNo: "ENG REG NO",
        engDateOfChange: "Engine Date Of Change",
        btyDtOfIssue: "BTY DT OF ISSUE",
        btyExpOn: "BTY EXP On",
        muaNomenclature: "MUA Nomenclature",
        muaDtOfFittment: "MUA Date Of Fittment",
        muaRemarks: "MUA Remarks",
        tsNomenclature: "THERMAL SIGHT Nomenclature",
        tsRegdNo: "THERMAL SIGHT Regd No",
        tsDtOfIssue: "THERMAL Date of Issue",
        tsEqptStatus: "THERMAL EQPT STATUS",
        n2PurgingDueDate: 'N2 Purging Due Date',
        n2PurgingCarriedOut: 'N2 Purging Carried Out',
        n2PurgingRemarks: 'N2 Purging Remarks',
        gaDueDate: 'GA Due Date',
        gaPurgingCarriedOut: 'GA Carried Out',
        gaPurgingRemarks: 'GA Remarks',
        tcmIDetails: 'TCM I RS CNR 900 M DETAILS(5W,20W,50W)',
        tcmIRegdNo: 'TCM I REGD No',
        tcmIDtOfIssue: 'TCM I Dt Of Issue',
        tcmIWarrantyPeriod: 'TCM I Warranty Period',
        tcmIEqptStatus: 'TCM I Eqpt Status',
        tcmIFISTestingDueOn: 'TCM I FIS Testing Due On',
        tcmIDtOfIssue: 'TCM I Dt Of Issue',
        tcmIIDetails: 'TCM II GPS 9312 A',
        tcmIIRegdNo: 'TCM II REGD No',
        tcmIIDtOfIssue: 'TCM II Dt Of Issue',
        tcmIIWarrantyPeriod: 'TCM II Warranty Period',
        tcmIIEqptStatus: 'TCM II Eqpt Status',
        tcmIIFISTestingDueOn: 'TCM II FIS Testing Due On',
        tcmIIDtOfIssue: 'TCM II Dt Of Issue',
        tcmIIIDetails: 'TCM III DCH',
        tcmIIIRegdNo: 'TCM III REGD No',
        tcmIIIDtOfIssue: 'TCM III Dt Of Issue',
        tcmIIIWarrantyPeriod: 'TCM III Warranty Period',
        tcmIIIEqptStatus: 'TCM III Eqpt Status',
        tcmIIIFISTestingDueOn: 'TCM III FIS Testing Due On',
        tcmIIIDtOfIssue: 'TCM III Dt Of Issue',
        armtBrlRegdNo: 'ARMT BRL REGD NO',
        armtRecoilBufferRegdNo: 'ARMT RECOIL BUFFER REGD NO',
        armtRecuperatorRegdNo: 'ARMT RECUPERATOR REGD NO',
        armtBreechBlockRegdNo: 'ARMT BREECH BLOCK REGD NO',
        armtBreechRingRegdNo: 'ARMT BREECH RING REGD NO',
        armtBrlStatus: 'ARMT BRL STATUS',
        armtTotalEfcsFired: 'ARMT TOTAL EFCS FIRED',
        armtTotalRoundFire: 'ARMT TOTAL ROUND FIRE',
        armtDtOfSeriesExam: 'ARMT DT OF SERIES EXAM',
        armtQuarterOfLife: 'ARMT QUARTER OF LIFE',
        armtWearVerticle: 'ARMT WEAR VERTICLE',
        armtBoreCondition: 'ARMT BORE CONDITION',
        armtChamberCondition: 'ARMT CHAMBER CONDITION',
        armtFumeExtractorCondition: 'ARMT FUME EXTRACTOR CONDITION',
        armtDateOfLastInsp: 'ARMT DATE OF LAST INSP',
        recoilSysSIDOne: 'SI DONE', recoilSysSIDue: 'SI DUE', recoilSysRemarks: 'REMARKS',
        armtFiredTypeOfAmnFired: 'TYPE OF AMN FIRED - Type of AMN',
        armtFiredRoundFired: 'TYPE OF AMN FIRED - ROUND FIRED',
        armtFiredRemarks: 'TYPE OF AMN FIRED - REMARKS',
        gunPullBackDoneDate: 'Gun Pull Back Done Date',
        gunPullBackDueDate: 'Gun Pull Back Due Date',
        gunPullBackRemarks: 'Gun Pull Back Remarks',
      };

    const [columnDefs, setColumnDefs] = useState([
        { field: "baNo", headerName:"BA/REGD No" },
        { field: "Unit" },
        { field: "BDE" },
        { field: "DIV/(I) BDE" },
        { field: "CORPS" },
        { field: "Year of Induction" },
        { field: "Type of Eqpt" },
        { field: "Issue Type"},
        { field: "Type of Eqpt" },

        { field: "Eng Kms" },
        { field: "Eng Hrs" },
        { field: "Chassis No" },
        { field: "Year of Induction" },


        { field: "Engine Org/OH" },
        { field: "Date Of Fitment" },
        { field: "Eng Hrs" },
        { field: "Eng Km" },
    ]);

    const [columnDefs1, setColumnDefs1] = useState([
        { field: "SNO", minWidth: 170 },
        { field: "BTY Details" },
        { field: "Life Of Battery" },
        { field: "Date Of Issue" },
    ]);

    const [columnDefs2, setColumnDefs2] = useState([
        { field: "SNO", minWidth: 170 },
        { field: "Nomenclature" },
        { field: "Date Of Fitment" },
        { field: "Remark" },
    ]);
    const [columnDefs3, setColumnDefs3] = useState([
        { field: "SNO", minWidth: 170 },
        { field: "Eqpt Id" },
        { field: "Tank Reg No" },
        { field: "TM I Due" },
        { field: "TM I Carried Out" },
        { field: "Remark" },
    ]);
    const [columnDefs4, setColumnDefs4] = useState([
        { field: "SNO", minWidth: 170 },
        { field: "Eqpt Id" },
        { field: "Tank Reg No" },
        { field: "TM II Due" },
        { field: "TM II Carried Out" },
        { field: "Remark" },
    ]);
    const [columnDefs5, setColumnDefs5] = useState([
        { field: "SNO", minWidth: 170 },
        { field: "Eqpt Id" },
        { field: "Tank Reg No" },
        { field: "MR I Due" },
        { field: "MR I Carried Out" },
        { field: "Remark" },
    ]);
    const [columnDefs6, setColumnDefs6] = useState([
        { field: "SNO", minWidth: 170 },
        { field: "Eqpt Id" },
        { field: "Tank Reg No" },
        { field: "MR II Due" },
        { field: "MR II Carried Out" },
        { field: "Remark" },
    ]);
    const [columnDefs7, setColumnDefs7] = useState([
        { field: "SNO", minWidth: 170 },
        { field: "Eqpt Id" },
        { field: "Tank Reg No" },
        { field: "MR III Due" },
        { field: "MR III Carried Out" },
        { field: "Remark" },
    ]);
    const [columnDefs8, setColumnDefs8] = useState([
        { field: "SNO", minWidth: 170 },
        { field: "Eqpt Id" },
        { field: "Tank Reg No" },
        { field: "BOH Due" },
        { field: "BOH Carried Out" },
        { field: "Remark" },
    ]);
    const [columnDefs9, setColumnDefs9] = useState([
        { field: "Nomenclature", minWidth: 170 },
        { field: "Regd No" },
        { field: "Date Of Issue" },
        { field: "Eqpt Status" },
    ]);

    const [columnDefs10, setColumnDefs10] = useState([
        { field: "field", cellStyle: {fontWeight: 'bold'} },
        { field: "value" },
    ]);

    const gridOptions = {
        headerHeight: 0 // Set header height to 0 to hide headers
      };
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            filter: true,
        };
    }, []);

    // Function to handle opening the modal
    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    // Function to handle closing the modal
    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const onGridReady = useCallback((params) => {
        try {
            fetch('/allData')
                .then((resp) => resp.json())
                .then((data) => {
                    setRowData(data);
                      
                    setSelectedBANo(baNo);
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
        console.log(selectedBANo)

        if (!selectedBANo) return rowData;
        // return rowData.filter(row => row["BA No"] === selectedBANo);
        return rowData.filter(row => {
            // Trim whitespace from each "BA No" value before comparing
            const baNoTrimmed = row["BA No"].trim();
            const selectedBANoTrimmed = selectedBANo.trim();
            if(baNoTrimmed === selectedBANoTrimmed) {
                const tempData = row;
                const uniqueData = [
                    { field: "BA/REG NO.", value: tempData["BA No"]},
                    { field: "KM/HRS", value: tempData["KM/HRS"]},
                    { field: "Chassis No", value: tempData["Chassis No"]},
                    { field: "DATE OF INDUCTION", value: tempData["DATE OF INDUCTION"] },
                    { field: "MAKE/TYPE", value: tempData["MAKE/TYPE"]},
                    { field: "ISSUE TYPE", value: tempData["ISSUE TYPE"]},
                    { field: "USER UNIT", value: tempData["USER UNIT"]},
                    { field: "EQPT STATUS", value: tempData["EQPT STATUS"]},
                    { field: "BOH/ORG", value: tempData["BOH/ORG"]},
                    { field: "BOH DATE", value: tempData["BOH DATE"]},
                    { field: "BOH KM/HRS", value: tempData["BOH KM/HRS"]},
                  ];

                  setRowDataForUnique(uniqueData);
            }
            return baNoTrimmed === selectedBANoTrimmed;
        });
    }, [selectedBANo, rowData]);

    return (
        <div>

            {/* Modal for EditTank component */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Update Tank</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Render the EditTank component here */}
                    {filteredRowData && filteredRowData.length > 0 && <EditTank inputData={filteredRowData[filteredRowData.length - 1]} />}
                </Modal.Body>
            </Modal>
            <div className="controls" style={{ margin: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <label htmlFor="bano-select">Select BA No:</label>
                    <select id="bano-select" value={selectedBANo || ""} onChange={handleSelectBANo}>
                        {/* Populate options with unique BA No values */}
                        {rowData &&
                            Array.from(new Set(rowData.map(row => row["BA No"]))).map(bano => (
                                <option key={bano} value={bano}>{bano}</option>
                            ))}
                    </select>
                </div>

                {/* Button to open the modal */}
                <Button style={{
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
                }} onClick={handleOpenEditModal}>Update Tank</Button>
            </div>


            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSingleRow center-grid">
                    <AgGridReact
                        rowData={rowDataForUnique}
                        columnDefs={columnDefs10}
                        defaultColDef={defaultColDef}
                        className="gridClassSingleRow"
                        onGridReady={onGridReady}
                        gridOptions={gridOptions}
                    />
                </div>
            </div>

            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
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

            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs1}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs1}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs2}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs3}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs4}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>

            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs5}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>

            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs6}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs7}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs8}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>

            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs9}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClassSummary center-grid">
                    <AgGridReact
                        rowData={filteredRowData}
                        columnDefs={columnDefs10}
                        defaultColDef={defaultColDef}
                        className="gridClass"
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
        </div>
    );
};
