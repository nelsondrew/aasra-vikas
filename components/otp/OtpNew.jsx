import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import arrow_left from "/public/images/icon/arrow-left.png";
import styled from "styled-components";

const OtpVerificationContainer = styled.section`
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

const OtpNew = ({ onOtpSubmit , loading }) => {
  // Store the OTP input values in state
  const [inputValues, setInputValues] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  // Handle input change
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newInputValues = [...inputValues];
    if (newInputValues[index] !== "") return;
    // Update the current input value
    newInputValues[index] = value;
    setInputValues(newInputValues);

    // If the value is entered and it's not the last input, move focus to next
    if (value.length === 1 && index < newInputValues.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle key down for backspace or delete
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newInputValues = [...inputValues];

      // If the input is empty and backspace is pressed, move focus to the previous input
      if (inputValues[index] === "") {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        newInputValues[index] = ""; // Clear the current input
        setInputValues(newInputValues);
      }
    }
  };

  // Disable logic: Update the 'disabled' status based on the previous input value
  const getDisabled = (index) => {
    return index > 0 && inputValues[index - 1] === "";
  };

  // Ensuring focus management after state change
  useEffect(() => {
    // Automatically focus the first input if not filled (i.e., focus on the first empty input)
    const firstEmptyInput = inputValues.findIndex((val) => val === "");
    if (firstEmptyInput !== -1 && inputsRef.current[firstEmptyInput]) {
      inputsRef.current[firstEmptyInput].focus();
    }
  }, [inputValues]); // Run this when inputValues change

  return (
    <OtpVerificationContainer className="sign-in-up verify-number">
      <div className="overlay pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="form-content">
                <div className="section-header">
                  <p>
                    A 6 digit One Time Password (OTP) has been sent to your
                    given phone number which will expire in 15 minutes
                  </p>
                </div>
                <form action="#">
                  <div className="row">
                    <div className="col-xl-5 col-lg-6 col-md-6">
                      <div className="single-input">
                        <label>Enter OTP Here</label>
                        <div className="mobile-otp d-flex align-items-center">
                          <div className="inputs d-flex flex-row justify-content-center">
                            {inputValues.map((value, index) => (
                              <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)} // Store each input in the ref
                                className="text-center form-control"
                                type="number"
                                maxLength="1"
                                value={value}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                required
                                disabled={getDisabled(index)} // Disable based on the previous input value
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-area">
                    {/* <Link href="/">Resend Code</Link> */}
                    <button
                      onClick={async () => {
                        const inputResult = inputValues.join("");
                        await onOtpSubmit(inputResult);
                      }}
                      className="cmn-btn"
                      type="button"
                      disabled={inputValues.includes("")}
                    >
                      {loading ? (
                        <div className="loader" /> // Your custom loader here
                      ) : (
                        "Submit OTP"
                      )}
                    </button>
                  </div>
                </form>
                <div className="btn-back mt-60 d-flex align-items-center">
                  <Link href="/" className="back-arrow">
                    <Image src={arrow_left} alt="icon" />
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OtpVerificationContainer>
  );
};

export default OtpNew;
