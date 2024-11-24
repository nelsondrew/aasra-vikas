import React from "react";
import Image from "next/image";
import Link from "next/link";
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
`;

const PhoneNumberVerified = () => {
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
                  Thank you for verifying your phone number. You can now proceed
                  to explore our platform.
                </p>
                <div className="btn-area mt-4">
                  <Link href="/dashboard" className="cmn-btn">
                    Go to Dashboard
                  </Link>
                </div>
                <div className="btn-back mt-60 d-flex align-items-center justify-content-center">
                  <Link href="/" className="back-arrow">
                    <Image src={arrow_left} alt="Back" />
                    Back to Home
                  </Link>
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
