import React, { useState } from 'react';
import './AddTank.css';
import { Spinner } from 'react-bootstrap';

export default function AddTank() {
  const initForm = {
    unit: '',
    typeOfEquipment: '',
    issueType: '',
    baNo: '',
    chassisNo: '',
    engineOrgOH: '',
    engKm: '',
    engHrs: '',
    chassisKm: '',
    chassisHrs: '',
    tmIDone: '',
    tmIDue: '',
    tmIIDone: '',
    tmIIDue: '',
    serR2EOAVOR: '',
    assy: '',
    section: '',
    natureOfDefect: '',
    demandPlacedTo: '',
    demandNoDt: '',
    contNoDt: '',
    workOrderNoDate: '',
    fwdTo: '',
    since: '',
    presentStatus: '',
    underRepairTime: '',
    efcRDSFired: '',
    chamberElongation: '',
    bore: '',
    siDetails: '',
    fumeExtractor: '',
    getterActivationDoneDate: '',
    bde: '',
    div: '',
    corps: '',
    yoi: '',
    eqptStatus: '',
    mrDueDt: '',
    mrCarriedOut: '',
    mrRemarks: '',
    typeOfMR: '',
    ohDueDt: '',
    ohCarriedOut: '',
    ohRemarks: '',
    typeOfOH: '',
    engRegNo: "",
    engDateOfChange: "",
    btyDtOfIssue: "",
    btyExpOn: "",
    muaNomenclature: "",
    muaDtOfFittment: "",
    muaRemarks: "",
    tsNomenclature: "",
    tsRegdNo: "",
    tsDtOfIssue: "",
    tsEqptStatus: "",
    n2PurgingDueDate: '',
    n2PurgingCarriedOut: '',
    n2PurgingRemarks: '',
    gaDueDate: '',
    gaPurgingCarriedOut: '',
    gaPurgingRemarks: '',
    tcmIDetails: '',
    tcmIRegdNo: '',
    tcmIDtOfIssue: '',
    tcmIWarrantyPeriod: '',
    tcmIEqptStatus: '',
    tcmIFISTestingDueOn: '',
    tcmIIDetails: '',
    tcmIIRegdNo: '',
    tcmIIDtOfIssue: '',
    tcmIIWarrantyPeriod: '',
    tcmIIEqptStatus: '',
    tcmIIFISTestingDueOn: '',
    tcmIIIDetails: '',
    tcmIIIRegdNo: '',
    tcmIIIDtOfIssue: '',
    tcmIIIWarrantyPeriod: '',
    tcmIIIEqptStatus: '',
    tcmIIIFISTestingDueOn: '',
    armtBrlRegdNo: '',
    armtRecoilBufferRegdNo: '',
    armtRecuperatorRegdNo: '',
    armtBreechBlockRegdNo: '',
    armtBreechRingRegdNo: '',
    armtBrlStatus: '',
    armtTotalEfcsFired: '',
    armtTotalRoundFire: '',
    armtDtOfSeriesExam: '',
    armtQuarterOfLife: '',
    armtWearVerticle: '',
    armtBoreCondition: '',
    armtChamberCondition: '',
    armtFumeExtractorCondition: '',
    armtDateOfLastInsp: '',
    recoilSysSIDOne: '',
    recoilSysSIDue: '',
    recoilSysRemarks: '',
    armtFiredTypeOfAmnFired: '',
    armtFiredRoundFired: '',
    armtFiredRemarks: '',
    gunPullBackDoneDate: '',
    gunPullBackDueDate: '',
    gunPullBackRemarks: '',
  };

  const [formData, setFormData] = useState(
    initForm
  );

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
    // mrIDueDt: 'MR-I Due Dt',
    // mrIDoneDt: 'MR-I Done Dt',
    // ohIDueDt: 'OH-I Due Dt',
    // ohIDoneDt: 'OH-I Done Dt',
    // mrIIDue: 'MR II Due',
    // mrIIDone: 'MR II Done',
    // ohIIDue: 'OH II Due',
    // ohIIDone: 'OH II Done',
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
    // gunPullBackDoneDate: 'Gun Pull Back Done Date',
    siDetails: 'SI Details',
    fumeExtractor: 'Fume Extractor',
    // n2PurgingDueDate: 'N2 Purging Due Date',
    // n2PurgingCarriedOut: 'N2 Purging Carried Out',
    getterActivationDoneDate: 'Getter Activation Done Date (Check Every 3 Months)',
    //NEW
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
    // New fields added below with 'armt' prefix
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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      setLoading(true);
      const res = await fetch('/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        setFormData(
          initForm
        );
        setSuccessMessage('Tank Details Added Successfully!');
      } else {
        setErrorMessage('Oops! Something went wrong while submitting the form.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Oops! Something went wrong while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' contact-div'>
      <div className='form-base'>
        <h3 className='plain-h3'>Add New Tank</h3>
        <div className='w-form'>
          <form
            id='wf-form-Register-Form'
            name='wf-form-Register-Form'
            data-name='Register Form'
            aria-label='Register Form'
            onSubmit={handleSubmit}
          >
            <div className='row'>
              <div className='col-6'>
                {Object.entries(formData).map(([fieldName, value], index) => (
                  index % 2 === 0 ? (
                    <div className='form-row' key={fieldName}>
                      <div className='form-wrap'>
                        <input
                          type='text'
                          className='text-field w-input'
                          maxLength={256}
                          name={fieldName}
                          value={value}
                          placeholder={fieldMap[fieldName]}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
              <div className='col-6'>
                {Object.entries(formData).map(([fieldName, value], index) => (
                  index % 2 === 1 ? (
                    <div className='form-row' key={fieldName}>
                      <div className='form-wrap'>
                        <input
                          type='text'
                          className='text-field w-input'
                          maxLength={256}
                          name={fieldName}
                          value={value}
                          placeholder={fieldMap[fieldName]}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            </div>

            <button
              type='submit'
              className='button-submit w-button'
              disabled={loading}
            >
              {loading ? (
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              ) : (
                'Submit'
              )}
            </button>
          </form>
          <div className='success-message w-form-done' tabIndex='-1' role='region' aria-label='Register Form success'>
            {successMessage ? <p>{successMessage}</p> : null}
          </div>
          <div className='error-message w-form-done' tabIndex='-1' role='region' aria-label='Register Form success'>
            {errorMessage ? <p>{errorMessage}</p> : null}
          </div>
        </div>
        <div className='line-break'></div>
      </div>
    </div>
  );
}
