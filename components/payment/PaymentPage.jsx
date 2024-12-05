/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import checkmark from "/public/images/sucess_checkmark.png"; // Replace with your actual checkmark icon path
import CashfreeButton from "../cashFreeButton/cashFreeButton";



const StyledSection = styled.section`
  margin-top: 13rem;
  .payment-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
    text-align: center;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  .description {
    font-size: 16px;
    margin-bottom: 30px;
    color: #666;
  }

  .payment-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 18px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
  }

  .payment-button:hover {
    background-color: #0056b3;
  }

  .payment-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .disclaimer {
    font-size: 14px;
    color: #666;
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  .refund-info {
    font-size: 12px;
    color: #888;
    margin-top: 20px;
  }

  .support-info {
    font-size: 12px;
    color: #888;
    margin-top: 10px;
  }

  .support-email {
    color: #007bff;
    text-decoration: none;
  }

  .support-email:hover {
    text-decoration: underline;
  }

  .success-message {
    font-size: 18px;
    color: #28a745;
    margin-top: 20px;
  }


  .checkmark img {
    width: 10%;
    height: 50%;
    margin-bottom: 2rem;
  }

`;

const PaymentPage = ({ mobileNumber , pan}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const handleSuccess = () => {
    // Set the state to show the success message
    setPaymentSuccess(true);
  };

  let checkoutOptions = {
    paymentSessionId: "session_zmChxTuIbjbVoCWPOAkiYPqSN5RJezsD7RotTbyz5Pbp8mGWW6inX4XQFBNd7JveYyyM9v-fpEwxH7AUInYH1bXIadoIEjItOxzrr1gIwPgEW4JGMTWHAJcpayment",
    redirectTarget: "_self" //optional ( _self, _blank, or _top)
}



  return (
    <StyledSection>
      <div className="payment-container">
        {paymentSuccess ? (
          <div className="success-message">
               <div className="checkmark">
                  <Image src={checkmark} alt="Verified" />
                </div>
            <h3 style={{
                color: 'green'
            }}>Your payment was successful!</h3>
            <p style={{
                color: 'green'
            }}>We have received your application and it is under review.</p>
          </div>
        ) : (
          <>
            <h2 className="title">Processing Fee Payment</h2>
            <p className="description">
              Please pay the processing fee of 199 INR to complete your loan
              application.
            </p>
            <div className="disclaimer">
              <strong>Disclaimer:</strong> This processing fee is required to
              proceed with your loan application. It covers the administrative costs
              associated with reviewing and processing your application.
            </div>
            <CashfreeButton mobileNumber={mobileNumber} customerId={pan} isLoading={isLoading} onSuccess={handleSuccess}/>
            <p className="refund-info">
              In the event that the payment doesn't go through and money is deducted
              from your account, it will be refunded within 2-3 business days.
            </p>
            <p className="support-info">
              For more support or inquiries, please contact{" "}
              <a href="mailto:support@aasravikas.com" className="support-email">
                support@aasravikas.com
              </a>
            </p>
          </>
        )}
      </div>
    </StyledSection>
  );
};

export default PaymentPage;
