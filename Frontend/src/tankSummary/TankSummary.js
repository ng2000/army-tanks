import React, { useCallback, useMemo, useRef, useState, StrictMode, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Modal } from 'react-bootstrap';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./TankSummary.css";
import EditTank from "../editTank/editTank";

export default function TankSummary({ baNo }) {
    const [rowData, setRowData] = useState();
    const [selectedBANo, setSelectedBANo] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

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

    const [columnDefs, setColumnDefs] = useState([
        { field: "SNO", minWidth: 170 },
        { field: "EngineRegNo" },
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
        { field: "BA No", headerName: "BA/REG NO.", minWidth: 170 },
        { field: "KM/HRS" },
        { field: "KM/HRS" },
        { field: "CHASIS NO" },
        { field: "KM/HRS" },
        { field: "KM/HRS" },
        { field: "DATE OF INDUCTION" },
        { field: "MAKE/TYPE" },
        { field: "ISSUE TYPE" },
        { field: "USER UNIT" },
        { field: "EQPT STATUS" },
        { field: "BOH/ORG" },
        { field: "BOH DATE" },
        { field: "BOH KM/HRS" },
    ]);
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
                <Button variant="primary" onClick={handleOpenEditModal}>Update Tank</Button>
            </div>


            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClass center-grid">
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

            <div className="center-grid">
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

            <div className="center-grid">
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
                <div className="ag-theme-quartz-dark gridClass center-grid">
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
