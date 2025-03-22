import styled from "styled-components";
import { Info, CreditCard, ChevronRight, AlertCircle } from 'lucide-react';
import { createOrder } from '../../api/payment';
import { InitialState } from "../../types";
import { useEffect, useState } from 'react';
import { load } from "@cashfreepayments/cashfree-js";

const PaymentDetailsContent = styled.div`
  animation: fadeIn 0.3s ease-out;
  text-align: center;
  padding: 40px 0;
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background: #EEF2FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
`;

const Title = styled.h2`
  font-size: 32px;
  color: #1E40AF;
  margin-bottom: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const SubTitle = styled.p`
  font-size: 20px;
  color: #64748B;
  margin-bottom: 48px;
  line-height: 1.5;
`;

const PaymentDetailsTable = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
`;

const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #E2E8F0;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
`;

const PaymentLabel = styled.span`
  color: #64748B;
  font-size: 16px;
`;

const PaymentAmount = styled.span<{ $bold?: boolean }>`
  color: #1E293B;
  font-size: 16px;
  font-weight: ${props => props.$bold ? '600' : '400'};
`;

const InfoBox = styled.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 48px;
`;

const InfoText = styled.p`
  color: #64748B;
  font-size: 14px;
  line-height: 1.5;
  flex: 1;
`;

const CTAButton = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  background: linear-gradient(135deg, #4B89DC 0%, #2E5C9E 100%);
  box-shadow: 0 4px 14px rgba(75, 137, 220, 0.25);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(75, 137, 220, 0.35);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(75, 137, 220, 0.25);
  }
`;

const ErrorMessage = styled.div`
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #DC2626;
  font-size: 14px;
`;

const RetryButton = styled.button`
  background: none;
  border: none;
  color: #2563EB;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin: 0;
  text-decoration: underline;

  &:hover {
    color: #1D4ED8;
  }
`;

interface PaymentDetailsProps {
  onProceed: () => void;
  userDetails: InitialState;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ onProceed, userDetails }) => {
  const [cashfree, setCashfree] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the CashFree SDK
  const initializeSDK = async () => {
    try {
      const cashfreeObj = await load({
        mode: "production",
      });
      setCashfree(cashfreeObj);
    } catch (err) {
      console.error("Error initializing Cashfree SDK", err);
    }
  };

  useEffect(() => {
    initializeSDK();
  }, []);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      let cashfreeObj = cashfree;
      if (!cashfree) {
        cashfreeObj = await load({
          mode: "production",
        });
      }

      const orderResponse = await createOrder({
        amount: 99,
        customerEmail: userDetails?.email,
        customerPhone: userDetails?.mobileNumber,
        customerId: `cust_order`,
        returnUrl: `https://aasravikas.com/verify-details-v2`,
      });

      if (orderResponse.error) {
        setError('Failed to create payment order. Please try again.');
        return;
      }

      const { paymentSessionId } = orderResponse;

      const checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_self",
      };

      cashfreeObj.checkout(checkoutOptions)
        .then((result: any) => {
          if (result.error) {
            setError('Payment failed. Please try again or use a different payment method.');
            console.error("Payment failed:", result.error);
          } else if (result.redirect) {
            console.log("Payment will be redirected.");
          } else if (result.paymentDetails) {
            if (result.paymentDetails.paymentMessage === "Payment finished. Check status.") {
              onProceed();
            } else {
              setError('Payment was not completed. Please try again.');
            }
          }
        })
        .catch((error: any) => {
          setError('Payment processing failed. Please try again.');
          console.error("Payment error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });

    } catch (error) {
      setError('Something went wrong. Please try again later.');
      console.error('Payment error:', error);
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handlePayment();
  };

  return (
    <PaymentDetailsContent>
      <IconContainer>
        <CreditCard size={40} color="#4B89DC" />
      </IconContainer>
      <Title>You're One Step Away!</Title>
      <SubTitle>
        Complete the verification process to get your loan of ₹1,00,000 sanctioned.
      </SubTitle>

      {error && (
        <ErrorMessage>
          <AlertCircle size={20} />
          <div style={{ flex: 1 }}>
            {error}
            <div style={{ marginTop: 8 }}>
              <RetryButton onClick={handleRetry}>
                Try Again
              </RetryButton>
            </div>
          </div>
        </ErrorMessage>
      )}

      <PaymentDetailsTable>
        <PaymentRow>
          <PaymentLabel>Loan Amount</PaymentLabel>
          <PaymentAmount>₹1,00,000</PaymentAmount>
        </PaymentRow>
        <PaymentRow>
          <PaymentLabel>Processing Fee</PaymentLabel>
          <PaymentAmount>₹99</PaymentAmount>
        </PaymentRow>
        <PaymentRow>
          <PaymentLabel>Total Payable Now</PaymentLabel>
          <PaymentAmount $bold>₹99</PaymentAmount>
        </PaymentRow>
      </PaymentDetailsTable>

      <InfoBox>
        <Info size={20} color="#4B89DC" />
        <InfoText>
          The processing fee of ₹99 is required for the verification of documents and is an important part of the loan sanctioning process.
        </InfoText>
      </InfoBox>

      <CTAButton 
        onClick={handlePayment} 
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.7 : 1 }}
      >
        {isLoading ? 'Processing...' : 'Pay ₹99 & Continue'}
        {!isLoading && <ChevronRight size={20} />}
      </CTAButton>
    </PaymentDetailsContent>
  );
};

export default PaymentDetails; 