import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

export default function EditTank({ inputData }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(inputData);
    console.log(inputData)
  }, [inputData]);

  const fieldMap = {
    // Define your field map here
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
        setFormData({}); // Clear form data after successful submission
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
    <div className='contact-div'>
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
              {Object.entries(formData).map(([fieldName, value]) => (
                <div className='col-6' key={fieldName}>
                  <div className='form-row'>
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
                </div>
              ))}
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
