import styled from "styled-components";
import { Star, ChevronRight } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import { useEffect, useState } from "react";

const CongratulationsContent = styled.div`
  animation: fadeIn 0.3s ease-out;
  text-align: center;
  padding: 40px 0;
  position: relative;
`;

const ConfettiWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  pointer-events: none;
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
  position: relative;
  z-index: 1;
  
  &:after {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    border: 2px solid #EEF2FF;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 1;
    }
    70% {
      transform: scale(1.1);
      opacity: 0.3;
    }
    100% {
      transform: scale(0.95);
      opacity: 1;
    }
  }
`;

const Title = styled.h2`
  font-size: 32px;
  color: #1E40AF;
  margin-bottom: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #1E40AF 0%, #4B89DC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LoanAmount = styled.div`
  font-size: 48px;
  color: #1E293B;
  font-weight: 700;
  margin: 32px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  span {
    font-family: monospace;
    font-size: 36px;
    position: relative;
    top: -4px;
  }
`;

const SubText = styled.p`
  font-size: 20px;
  color: #64748B;
  margin-bottom: 40px;
  line-height: 1.5;
`;

const NextStepsList = styled.div`
  text-align: left;
  margin-bottom: 48px;
  background: #F8FAFC;
  padding: 24px;
  border-radius: 16px;
`;

const NextStepsTitle = styled.h3`
  font-size: 20px;
  color: #1E293B;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;

  &:before {
    content: '';
    width: 4px;
    height: 24px;
    background: #4B89DC;
    border-radius: 2px;
    display: inline-block;
  }
`;

const StepItem = styled.div`
  color: #64748B;
  font-size: 16px;
  margin-bottom: 16px;
  padding-left: 24px;
  position: relative;
  line-height: 1.5;

  &:before {
    content: "•";
    position: absolute;
    left: 8px;
    color: #4B89DC;
  }

  &:last-child {
    margin-bottom: 0;
  }
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

interface CongratulationsProps {
  onGetMoney: () => void;
}

const Congratulations: React.FC<CongratulationsProps> = ({ onGetMoney }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Call once initially to set correct size
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {showConfetti && (
        <ConfettiWrapper>
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={200}
            recycle={false}
            colors={['#4B89DC', '#2E5C9E', '#1E40AF', '#60A5FA', '#93C5FD']}
            gravity={0.3}
            tweenDuration={100}
          />
        </ConfettiWrapper>
      )}
      <CongratulationsContent>
        <IconContainer>
          <Star size={48} color="#4B89DC" />
        </IconContainer>
        <Title>Congratulations!</Title>
        <SubText>You are eligible for an Unsecured Personal Loan of</SubText>
        <LoanAmount>
          <span>₹</span>1,00,000
        </LoanAmount>

        <NextStepsList>
          <NextStepsTitle>Next steps:</NextStepsTitle>
          <StepItem>Review your loan offer details</StepItem>
          <StepItem>Choose your preferred repayment term</StepItem>
          <StepItem>Complete the final verification process</StepItem>
        </NextStepsList>

        <CTAButton onClick={onGetMoney}>
          Get the money credited
          <ChevronRight size={20} />
        </CTAButton>
      </CongratulationsContent>
    </>
  );
};

export default Congratulations; 