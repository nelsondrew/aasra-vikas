import React from 'react';
import styled from 'styled-components';
import { CheckCircle, Coins, Calendar, Ban } from 'lucide-react';
import { useRouter } from "next/navigation";

const Container = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
`;

const BackgroundCurve = styled.div`
  position: absolute;
  top: 25%;
  left: -5%;
  right: -5%;
  bottom: -5%;
  background: linear-gradient(180deg, #E6F0FF 0%, #D6E6FF 100%);
  border-radius: 50% 50% 0 0 / 15% 15% 0 0;
  z-index: 0;
`;

const Content = styled.div`
  min-height: 100dvh;
  /* height: 100dvh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 16px;
    padding: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
  padding: 20px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding: 16px;
  }
`;

const BankLogo = styled.img`
  height: 40px;

  @media (max-width: 768px) {
    height: 24px;
  }
`;

const PhoneContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  max-width: 180px;
  animation: float 3s infinite ease-in-out;
  
  @media (max-width: 768px) {
    max-width: 140px;
    margin-bottom: 10px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const Phone = styled.div`
  width: 100%;
  height: 400px;
  background: #fff;
  border-radius: 40px;
  position: relative;
  transform: rotate(-5deg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid #e1e1e1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 24px;
    background: #000;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 4px;
    background: #000;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    height: 280px;
    border-radius: 32px;

    &::before {
      height: 20px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    &::after {
      bottom: 8px;
      height: 3px;
    }
  }
`;

const PhoneScreen = styled.div`
  position: absolute;
  top: 24px;
  left: 2px;
  right: 2px;
  bottom: 24px;
  background: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 768px) {
    top: 20px;
  }
`;

const CheckMark = styled.div`
  background: #4B89DC;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 4px 8px rgba(75, 137, 220, 0.3);

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Coin = styled.div`
  width: 32px;
  height: 32px;
  background: #FFD700;
  border-radius: 50%;
  position: absolute;
  animation: float 3s infinite ease-in-out;
  box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);

  &:nth-child(1) {
    top: 20%;
    right: -20px;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    top: 40%;
    left: -20px;
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    bottom: 30%;
    right: -30px;
    animation-delay: 1s;
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

const Logo = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const InstaLoanTitle = styled.h1`
  font-size: 36px;
  margin: 0;
  color: #2C3E50;
  font-weight: bold;
  letter-spacing: -0.5px;
  
  span {
    color: #000;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 375px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.h2`
  font-size: 20px;
  color: #333;
  margin: 8px 0 20px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 18px;
    margin: 4px 0 16px;
  }

  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 340px;
  padding: 0 20px;

  @media (max-width: 768px) {
    gap: 14px;
    padding: 0 16px;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #333;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
    gap: 10px;
  }
`;

const FeatureIcon = styled.div`
  width: 36px;
  height: 36px;
  background: rgba(75, 137, 220, 0.08);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4B89DC;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const Button = styled.button`
  background: #4B89DC;
  color: white;
  border: none;
  padding: 14px 0;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 24px;
  transition: background 0.3s;
  width: calc(100% - 32px);
  max-width: 340px;

  &:hover {
    background: #357ABD;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 0;
    margin-top: 20px;
  }
`;

function Home() {
  const router = useRouter();

  return (
    <Container>
      <BackgroundCurve />
      {/* <Header>
        <BankLogo src="https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/icons/logo-icon.svg" alt="IDFC First Bank" />
      </Header> */}
      
      <Content>
        <PhoneContainer>
          <Phone>
            <PhoneScreen>
              <CheckMark>
                <CheckCircle size={20} />
              </CheckMark>
            </PhoneScreen>
          </Phone>
          <Coin />
          <Coin />
          <Coin />
        </PhoneContainer>

        <Logo>
          <InstaLoanTitle>INSTA<span style={{ 
            fontSize : "32px"
          }}>loan</span></InstaLoanTitle>
          <Subtitle>Smart Personal Loan</Subtitle>
        </Logo>

        <FeatureList>
          <Feature>
            <FeatureIcon>
              <Coins size={18} />
            </FeatureIcon>
            Approved Loan offer up to ₹10 lakhs
          </Feature>
          
          <Feature>
            <FeatureIcon>
              <Calendar size={18} />
            </FeatureIcon>
            Withdraw funds with flexible EMI dates
          </Feature>
          
          <Feature>
            <FeatureIcon>
              <Ban size={18} />
            </FeatureIcon>
            Repay anytime with ZERO foreclosure charges
          </Feature>
        </FeatureList>

        <Button onClick={() => router.push('/verify-details-v2')}>Get Money</Button>
      </Content>
    </Container>
  );
}


const ApplyLoanV2 = () => {
  return (
    <div>
      <Home/>
    </div>
  );
};

export default ApplyLoanV2; 