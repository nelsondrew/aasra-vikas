import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, Lock, ArrowLeft, DollarSign, Loader2, Check, X } from 'lucide-react';
import { Button } from '../common/Button';
import { useRouter } from 'next/router';

const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #60A5FA, #93C5FD);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  background: transparent;
`;

const AuthCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 0.25rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #64748B;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem !important;
  padding-top: 0.8rem !important;
  padding-left: 2.75rem !important;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  color: #1E293B;
  font-size: 1rem;
  height: 3.25rem;
  
  &:focus {
    border-color: #60A5FA;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.15);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #60A5FA;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const ErrorMessage = styled.span`
  color: #DC2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem !important;
  padding-top: 0.8rem !important; 
  padding-left: 2.75rem !important;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  color: #1E293B;
  background-color: white;
  font-size: 1rem;
  height: 3.25rem;
  
  &:focus {
    border-color: #60A5FA;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.15);
  }
`;

const ToggleText = styled.button`
  color: #60A5FA;
  text-align: center;
  margin-top: 1.5rem;
  font-weight: 500;
  width: 100%;
  background: transparent;

  &:hover {
    text-decoration: underline;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: #F8FAFC;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #60A5FA;
    margin-bottom: 0.25rem;
  }

  p {
    color: #64748B;
    font-size: 0.875rem;
  }
`;

const LoadingSpinner = styled(Loader2)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SuccessModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 400px;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  background: #059669;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 1rem;
`;

const ModalText = styled.p`
  color: #64748B;
  margin-bottom: 2rem;
`;

const ErrorIcon = styled.div`
  width: 64px;
  height: 64px;
  background: #DC2626;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const ErrorModal = styled(SuccessModal)`
  // Inherits all styles from SuccessModal
`;

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  panNumber: string;
  profession: string;
  state: string;
  city: string;
  password: string;
}

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  
  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>();

  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/dsa/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Invalid credentials');
      }

      // Redirect to dashboard on successful login
      router.push('/dsa-dashboard');

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    setIsRegistering(true);
    try {
      const response = await fetch('/api/dsa/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      registerForm.reset();
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed. Please try again.');
      setShowErrorModal(true);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setIsLogin(true);
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <AuthContainer>
      <BackButton onClick={() => goBack()}>
        <ArrowLeft size={20} />
        Back
      </BackButton>

      <AuthCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Title>
          {isLogin ? 'Welcome Back!' : "India's Leading Personal Loan DSA Partner"}
        </Title>
        <Subtitle>
          {isLogin
            ? 'Sign in to continue to your dashboard'
            : 'Join Aasra Vikas as a DSA Partner and unlock unlimited earning potential'}
        </Subtitle>

        {!isLogin && (
          <StatsGrid>
            <StatCard>
              <h3>4000+</h3>
              <p>Cities Covered</p>
            </StatCard>
            <StatCard>
              <h3>25+</h3>
              <p>Partner Banks</p>
            </StatCard>
            <StatCard>
              <h3>₹1L+</h3>
              <p>Monthly Income</p>
            </StatCard>
            <StatCard>
              <h3>25+</h3>
              <p>Years Experience</p>
            </StatCard>
          </StatsGrid>
        )}

        {isLogin ? (
          <Form onSubmit={loginForm.handleSubmit(handleLoginSubmit)}>
            <InputGroup>
              <IconWrapper>
                <Mail size={20} />
              </IconWrapper>
              <Input
                type="email"
                placeholder="Email"
                {...loginForm.register('email', { required: 'Email is required' })}
              />
              {loginForm.formState.errors.email && (
                <ErrorMessage>{loginForm.formState.errors.email.message}</ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <Lock size={20} />
              </IconWrapper>
              <Input
                type="password"
                placeholder="Password"
                {...loginForm.register('password', { required: 'Password is required' })}
              />
              {loginForm.formState.errors.password && (
                <ErrorMessage>{loginForm.formState.errors.password.message}</ErrorMessage>
              )}
            </InputGroup>

            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </Form>
        ) : (
          <Form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}>
            <InputGroup>
              <IconWrapper>
                <User size={20} />
              </IconWrapper>
              <Input
                placeholder="First Name"
                {...registerForm.register('firstName', { required: 'First name is required' })}
              />
              {registerForm.formState.errors.firstName && (
                <ErrorMessage>{registerForm.formState.errors.firstName.message}</ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <User size={20} />
              </IconWrapper>
              <Input
                placeholder="Middle Name (Optional)"
                {...registerForm.register('middleName')}
              />
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <User size={20} />
              </IconWrapper>
              <Input
                placeholder="Last Name"
                {...registerForm.register('lastName', { required: 'Last name is required' })}
              />
              {registerForm.formState.errors.lastName && (
                <ErrorMessage>{registerForm.formState.errors.lastName.message}</ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <Mail size={20} />
              </IconWrapper>
              <Input
                type="email"
                placeholder="Email"
                {...registerForm.register('email', { required: 'Email is required' })}
              />
              {registerForm.formState.errors.email && (
                <ErrorMessage>{registerForm.formState.errors.email.message}</ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <Phone size={20} />
              </IconWrapper>
              <Input
                placeholder="Phone Number"
                {...registerForm.register('phone', { required: 'Phone number is required' })}
              />
              {registerForm.formState.errors.phone && (
                <ErrorMessage>{registerForm.formState.errors.phone.message}</ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <Mail size={20} />
              </IconWrapper>
              <Input
                placeholder="PAN Number"
                {...registerForm.register('panNumber', { required: 'PAN number is required' })}
              />
              {registerForm.formState.errors.panNumber && (
                <ErrorMessage>{registerForm.formState.errors.panNumber.message}</ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <User size={20} />
              </IconWrapper>
              <Select {...registerForm.register('profession', { required: 'Profession is required' })}>
                <option value="">Select Profession</option>
                <option value="loan-agent">Loan Agent</option>
                <option value="ex-banker">Ex-Banker</option>
                <option value="financial-analyst">Financial Analyst</option>
                <option value="ca">Chartered Accountant</option>
                <option value="builder">Builder</option>
              </Select>
              {registerForm.formState.errors.profession && (
                <ErrorMessage>{registerForm.formState.errors.profession.message}</ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <User size={20} />
              </IconWrapper>
              <Select {...registerForm.register('state', { required: 'State is required' })}>
                <option value="">Select State</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="delhi">Delhi</option>
                <option value="karnataka">Karnataka</option>
              </Select>
              {registerForm.formState.errors.state && (
                <ErrorMessage>{registerForm.formState.errors.state.message}</ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <User size={20} />
              </IconWrapper>
              <Select {...registerForm.register('city', { required: 'City is required' })}>
                <option value="">Select City</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
              </Select>
              {registerForm.formState.errors.city && (
                <ErrorMessage>{registerForm.formState.errors.city.message}</ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <Lock size={20} />
              </IconWrapper>
              <Input
                type="password"
                placeholder="Password"
                {...registerForm.register('password', { required: 'Password is required' })}
              />
              {registerForm.formState.errors.password && (
                <ErrorMessage>{registerForm.formState.errors.password.message}</ErrorMessage>
              )}
            </InputGroup>

            <Button type="submit" fullWidth disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <LoadingSpinner size={20} />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </Form>
        )}

        <ToggleText onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Sign In'}
        </ToggleText>
      </AuthCard>

      {showSuccessModal && (
        <>
          <Overlay onClick={handleModalClose} />
          <SuccessModal>
            <SuccessIcon>
              <Check size={32} />
            </SuccessIcon>
            <ModalTitle>Registration Successful!</ModalTitle>
            <ModalText>
              Your account has been created successfully. You can now login with your credentials.
            </ModalText>
            <Button fullWidth onClick={handleModalClose}>
              Proceed to Login
            </Button>
          </SuccessModal>
        </>
      )}

      {showErrorModal && (
        <>
          <Overlay onClick={handleErrorModalClose} />
          <ErrorModal>
            <ErrorIcon>
              <X size={32} />
            </ErrorIcon>
            <ModalTitle>Registration Failed</ModalTitle>
            <ModalText>
              {errorMessage}
            </ModalText>
            <Button fullWidth onClick={handleErrorModalClose}>
              Try Again
            </Button>
          </ErrorModal>
        </>
      )}
    </AuthContainer>
  );
};

export default AuthScreen;