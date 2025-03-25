import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, Lock, ArrowLeft, DollarSign } from 'lucide-react';
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
  // const { login } = useAuth();
  const router = useRouter();
  
  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>();

  const handleLoginSubmit = (data: LoginFormData) => {
    // login(data.email, data.password);
    router.push("/dsa-dashboard")
  };

  const handleRegisterSubmit = (data: RegisterFormData) => {
    // For now, just log them in after registration
    router.push("/dsa-dashboard")
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

            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </Form>
        )}

        <ToggleText onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Sign In'}
        </ToggleText>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthScreen;