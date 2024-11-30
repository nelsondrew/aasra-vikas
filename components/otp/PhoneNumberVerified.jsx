import React from "react";
import Image from "next/image";
import styled from "styled-components";
import checkmark from "/public/images/sucess_checkmark.png"; // Replace with your actual checkmark icon path
import arrow_left from "/public/images/icon/arrow-left.png";

const PhoneNumberVerifiedContainer = styled.section`
  .checkmark {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #28a745;
    border-radius: 50%;
    background: #fff;
  }

  .checkmark img {
    width: 50%;
    height: 50%;
  }

  .success-message {
    text-align: center;
    color: #28a745;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .cmnn-btn {
    cursor: pointer;
    &:hover {
      cursor: pointer;
    }
  }
`;

const PhoneNumberVerified = ({ handleProceedtoPayment }) => {
  return (
    <PhoneNumberVerifiedContainer className="sign-in-up verified-number">
      <div className="overlay pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="form-content text-center">
                <div className="checkmark">
                  <Image src={checkmark} alt="Verified" />
                </div>
                <p className="success-message">
                  Your phone number has been successfully verified!
                </p>
                <p>
                  One last step remains: payment of the pre-processing fee for your loan application.
                </p>
                <div style={{
                  display : 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }} className="btn-area mt-4">
                  <div style={{
                    width : '40%'
                  }} onClick={handleProceedtoPayment} className="cmn-btn">
                    Proceed to Payment Page
                  </div>
                </div>
                <div className="btn-back mt-60 d-flex align-items-center justify-content-center">
                  <div href="/" className="back-arrow">
                    <Image src={arrow_left} alt="Back" />
                    Back to Home
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneNumberVerifiedContainer>
  );
};

export default PhoneNumberVerified;
