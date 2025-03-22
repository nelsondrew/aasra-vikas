import styled from "styled-components";
import { ClipboardCheck, Clock, Check } from 'lucide-react';

const VerificationContent = styled.div`
  animation: fadeIn 0.3s ease-out;
  text-align: center;
  padding: 40px 0;
`;

const IconContainer = styled.div`
  width: 100px;
  height: 100px;
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
`;

const Description = styled.p`
  font-size: 18px;
  color: #64748B;
  margin-bottom: 48px;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const TimelineSection = styled.div`
  text-align: left;
  margin-bottom: 48px;
`;

const TimelineTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  color: #1E293B;
  font-size: 20px;
  font-weight: 600;
`;

const TimelineDescription = styled.p`
  color: #64748B;
  font-size: 16px;
  line-height: 1.6;
  padding-left: 32px;
`;

const PaymentConfirmation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  color: #10B981;
  font-size: 16px;
  margin-bottom: 48px;
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

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(75, 137, 220, 0.35);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(75, 137, 220, 0.25);
  }
`;

interface DocumentsVerificationProps {
  onCheckStatus: () => void;
}

const DocumentsVerification: React.FC<DocumentsVerificationProps> = ({ onCheckStatus }) => {
  return (
    <VerificationContent>
      <IconContainer>
        <ClipboardCheck size={48} color="#4B89DC" />
      </IconContainer>
      <Title>Documents Under Verification</Title>
      <Description>
        We've received your documents and they are currently under review. 
        This process typically takes 2-3 business days.
      </Description>

      <TimelineSection>
        <TimelineTitle>
          <Clock size={24} color="#4B89DC" />
          Estimated Timeline:
        </TimelineTitle>
        <TimelineDescription>
          Your documents will be verified within 2-3 business days. We'll notify you as soon as the verification is complete.
        </TimelineDescription>
      </TimelineSection>

      <PaymentConfirmation>
        <Check size={20} color="#10B981" />
        Payment Received: ₹99
      </PaymentConfirmation>

      <CTAButton onClick={onCheckStatus}>
        Check Status
      </CTAButton>
    </VerificationContent>
  );
};

export default DocumentsVerification; 