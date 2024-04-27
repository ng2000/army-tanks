import React, { useState } from 'react';
import './ApplyForAccess.css';
import { Spinner } from 'react-bootstrap';

export default function ApplyForAccess() {
  const [formData, setFormData] = useState({
    name: '',
    companyEmail: '',
    linkedinUrl: '',
    contactNumber: '',
    yourHRIS: '',
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
        setFormData({
          name: '',
          companyEmail: '',
          linkedinUrl: '',
          contactNumber: '',
          yourHRIS: '',
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
        setSuccessMessage('Thank you! We\'ll be in touch soon!');
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
        <h3 className='plain-h3'>Add new tank</h3>
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
                          placeholder={fieldName}
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
                          placeholder={fieldName}
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
