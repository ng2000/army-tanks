import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

export default function EditTank({ inputData }) {
  const [formData, setFormData] = useState({
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
    mrIDueDt: '',
    mrIDoneDt: '',
    ohIDueDt: '',
    ohIDoneDt: '',
    mrIIDue: '',
    mrIIDone: '',
    ohIIDue: '',
    ohIIDone: '',
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
    gunPullBackDoneDate: '',
    siDetails: '',
    fumeExtractor: '',
    n2PurgingDueDate: '',
    n2PurgingCarriedOut: '',
    getterActivationDoneDate: ''
  });

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

  useEffect(() => {
    if (inputData) {
        const initialFormData = {};
        Object.keys(fieldMap).forEach((fieldName) => {
          initialFormData[fieldName] = inputData[fieldMap[fieldName]];
        });
        setFormData(initialFormData);
    }
  }, [inputData]);

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
        setFormData({
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
          mrIDueDt: '',
          mrIDoneDt: '',
          ohIDueDt: '',
          ohIDoneDt: '',
          mrIIDue: '',
          mrIIDone: '',
          ohIIDue: '',
          ohIIDone: '',
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
          gunPullBackDoneDate: '',
          siDetails: '',
          fumeExtractor: '',
          n2PurgingDueDate: '',
          n2PurgingCarriedOut: '',
          getterActivationDoneDate: ''
        });
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
