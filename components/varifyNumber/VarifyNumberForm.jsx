import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the default styles
import arrow_left from "/public/images/icon/arrow-left.png";
import styled from "styled-components";

const VerifyNumberFormContainer = styled.section`
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const VerifyNumberForm = ({ onPhoneNumberSubmit, loading }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (value) => {
    setPhoneNumber(value); // Value includes the country code and number
  };

  const handleSubmit = async () => {
    await onPhoneNumberSubmit(`+${phoneNumber}`);
  };

  return (
    <VerifyNumberFormContainer className="sign-in-up mobile-number">
      <div className="overlay pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="form-content">
                <div className="section-header">
                  <h2 className="title">
                    Verify your number to proceed with the Application
                  </h2>
                  <p>
                    The otp will be verified in order to verify the phone number
                  </p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row">
                    <div className="col-12">
                      <div className="single-input">
                        <label htmlFor="mobileNum">Mobile Number</label>
                        <PhoneInput
                          country={"in"} // Default country
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          inputProps={{
                            name: "phone",
                            id: "mobileNum",
                            readOnly: false, // Only the country code is "read-only" due to library behavior
                          }}
                          containerClass="phone-number-container"
                          inputClass="phone-number-input"
                          disableDropdown={false} // Allow users to change the country
                          countryCodeEditable={false} // Makes the country code part read-only
                        />
                      </div>
                    </div>
                  </div>
                  <div className="btn-area">
                    <button
                      onClick={handleSubmit}
                      style={{
                        marginTop: "2rem",
                      }}
                      type="submit"
                      className="cmn-btn"
                    >
                      {loading ? (
                        <div className="loader" /> // Your custom loader here
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VerifyNumberFormContainer>
  );
};

export default VerifyNumberForm;
