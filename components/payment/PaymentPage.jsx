/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styled from "styled-components";
import RazorpayButton from "../razorpayButton";

const StyledSection = styled.section`
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
`;

// Make sure to replace with your actual Stripe publishable key

const PaymentPage = ({ applicantId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);


  return (
    <StyledSection>
      <div className="payment-container">
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
        <RazorpayButton isLoading={false} />
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
      </div>
    </StyledSection>
  );
};

export default PaymentPage;
