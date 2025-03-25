import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useRouter } from 'next/router';


const SplashContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #60A5FA, #93C5FD);

`;

const Logo = styled(motion.div)`
  color: white;
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const Tagline = styled(motion.h1)`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  max-width: 80%;
  margin: 0 auto;
`;

 const SplashScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SplashContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Logo
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Briefcase size={64} />
      </Logo>
      <Tagline
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Empowering Loan Agents for a Better Future!
      </Tagline>
    </SplashContainer>
  );
};

export default SplashScreen;