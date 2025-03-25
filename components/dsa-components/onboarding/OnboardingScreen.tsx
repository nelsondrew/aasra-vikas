import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, UserPlus, LineChart } from 'lucide-react';
import { Button } from '../common/Button';
import { useRouter } from 'next/router';

const OnboardingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
`;

const SkipButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #64748B;
  font-weight: 500;
  background: transparent;
`;

const SlideContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 9999px;
  background: #60A5FA;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1E293B;
`;

const Description = styled.p`
  color: #64748B;
  margin-bottom: 2rem;
  max-width: 320px;
`;

const NavigationButtons = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  background-color: #FFFFFF;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const slides = [
  {
    icon: DollarSign,
    title: 'Earn Great Commissions',
    description: 'Start earning attractive commissions by referring customers for loans. The more you refer, the more you earn!',
  },
  {
    icon: UserPlus,
    title: 'Easy Onboarding Process',
    description: 'Simple steps to get started. Register, complete your KYC, and begin referring customers right away.',
  },
  {
    icon: LineChart,
    title: 'Track Your Success',
    description: 'Monitor your referrals, loan disbursements, and commissions in real-time through an intuitive dashboard.',
  },
];

const OnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/dsa-auth');
    }
  };

  const handleSkip = () => {
    router.push('/dsa-auth');
  };

  return (
    <OnboardingContainer>
      <SkipButton onClick={handleSkip}>Skip</SkipButton>
      <AnimatePresence mode="wait">
        <SlideContainer
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <IconWrapper>
            {React.createElement(slides[currentSlide].icon, { size: 40 })}
          </IconWrapper>
          <Title>{slides[currentSlide].title}</Title>
          <Description>{slides[currentSlide].description}</Description>
        </SlideContainer>
      </AnimatePresence>
      <NavigationButtons>
        {currentSlide < slides.length - 1 ? (
          <Button fullWidth onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button fullWidth onClick={handleNext}>
            Get Started
          </Button>
        )}
      </NavigationButtons>
    </OnboardingContainer>
  );
};

export default OnboardingScreen;