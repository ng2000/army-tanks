import React from 'react';
import { useState } from "react";
import './ApplyForAccess.css'
import { Spinner } from 'react-bootstrap';

export default function ApplyForAccess() {

  const [name, setName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [yourHRIS, setyourHRIS] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let handleSubmit = async (e) => {
    setSuccessMessage("");
    setErrorMessage("");
    e.preventDefault();

    try {
      setLoading(true);
      let res = await fetch("/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          companyEmail: companyEmail,
          linkedinUrl: linkedinUrl,
          contactNumber: contactNumber,
          yourHRIS: yourHRIS
        }),
      });
      console.log("reposnse is " + res.status);
      if (res.status === 200) {
        setName("");
        setContactNumber("");
        setlinkedinUrl("");
        setyourHRIS("");
        setCompanyEmail("");
        setErrorMessage("");
        setSuccessMessage("Thank you! We'll be in touch soon!");
      } else {
        setErrorMessage("Oops! Something went wrong while submitting the form.");
        setSuccessMessage("");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Oops! Something went wrong while submitting the form.");
      setSuccessMessage("");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className='row contact-div'>
        <div className='col-md-4'>
          <div className="form-base">
            <h3 className="plain-h3">Apply Here</h3>
            <div className="w-form">
              <form id="wf-form-Register-Form" name="wf-form-Register-Form" data-name="Register Form"
                aria-label="Register Form" onSubmit={handleSubmit}>
                <div className="form-wrap"><input type="text" className="text-field w-input" autofocus="true" maxlength="256"
                  name="name" value={name} placeholder="Enter your full name" onChange={(e) => setName(e.target.value)} id="Full-Name" required />
                </div>
                <div className="form-wrap"><input type="email" className="text-field w-input" maxlength="256" name="companyEmail"
                  value={companyEmail} placeholder="Enter your company email address" onChange={(e) => setCompanyEmail(e.target.value)}
                  id="Email" required />
                </div>
                <div className="form-wrap"><input type="url" className="text-field w-input" autofocus="true" maxlength="256"
                  name="linkedinUrl" value={linkedinUrl} placeholder="https://www.linkedin.com/in/user" onChange={(e) => setlinkedinUrl(e.target.value)} id="Full-Name-2" required /></div>

                <div className="form-wrap"><input type="text" className="text-field w-input" autofocus="true" maxlength="256"
                  name="contactNumber" value={contactNumber} placeholder="Contact Number" onChange={(e) => setContactNumber(e.target.value)} id="Full-Name-2" required /></div>

                <div className="form-wrap">
                  <input list="yourHRIS" name="yourHRIS" className="text-field w-input" autofocus="true" maxlength="256" value={yourHRIS} placeholder="your HRIS" onChange={(e) => setyourHRIS(e.target.value)} id="Full-Name-2" required/>
                  <datalist id="yourHRIS">
                    <option value="Workday" />
                    <option value="ADP" />
                    <option value="Oracle HRMS" />
                    <option value="UKG" />
                    <option value="Others" />
                  </datalist>
                </div>
                <button type="submit" value="Submit" data-wait="Please wait..."
                  className="button-submit w-button" disabled={loading}>
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    'Submit'
                  )}
                </button>

              </form>

              <div className="success-message w-form-done" tabindex="-1" role="region" aria-label="Register Form success">
                <div>{successMessage ? <p>{successMessage}</p> : null}</div>
              </div>

              <div className="error-message w-form-done" tabindex="-1" role="region" aria-label="Register Form success">
                <div>{errorMessage ? <p>{errorMessage}</p> : null}</div>
              </div>

            </div>
            <div className="line-break"></div>
          </div>
        </div>
        <div className='col-md-4 form-right'>
          <h3>Unmatched Employee experience</h3>
          <h4 >
          As a founder, it is important for me that every employee should received a customer grade experience. Also it is important that I free HR from mundane task, so that they can contribute towards bringing best out of employees.
          </h4>
        </div>
      </div>

    </>
  )
}
