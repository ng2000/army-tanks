import React from 'react';
import { useState } from "react";
import { Spinner } from 'react-bootstrap';
import './Demo.css'

export default function Demo() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [fromWhereDidYouHear, setFromWhereDidYouHear] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let handleSubmit = async (e) => {
    setSuccessMessage("");
    setErrorMessage("");
    e.preventDefault();

    try {
      setLoading(true);
      let res = await fetch("/requestDemo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          companyName: companyName,
          companyEmail: companyEmail,
          contactNumber: contactNumber,
          fromWhereDidYouHear: fromWhereDidYouHear
        }),
      });
      console.log("reposnse is " + res.status);
      if (res.status === 200) {
        setName("");
        setCompanyName("");
        setContactNumber("");
        setCompanyEmail("");
        setFromWhereDidYouHear("");
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
            <h3 className="plain-h3">Request a demo</h3>
            <div
              className="hero-details">We can't wait to show you Demo.</div>
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
                <div className="form-wrap"><input type="text" className="text-field w-input" autofocus="true" maxlength="256"
                  name="companyName" value={companyName} placeholder="Company name" onChange={(e) => setCompanyName(e.target.value)} id="Full-Name-2" required /></div>

                <div className="form-wrap"><input type="text" className="text-field w-input" autofocus="true" maxlength="256"
                  name="contactNumber" value={contactNumber} placeholder="Contact Number" onChange={(e) => setContactNumber(e.target.value)} id="Full-Name-2" required /></div>

                <div className="form-wrap"><input type="text" className="text-field w-input" autofocus="true" maxlength="256"
                  name="fromWhereDidYouHear" value={fromWhereDidYouHear} placeholder="From Where did You hear about us" onChange={(e) => setFromWhereDidYouHear(e.target.value)} id="Full-Name-2" required /></div>

                <div className="form-wrap"></div>
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
