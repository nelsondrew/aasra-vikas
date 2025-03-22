import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { X, Check, Loader2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import LGS from './screens/LGS';
import AdditionalDetails from './screens/AdditionalDetails';
import WorkDetails from './screens/WorkDetails';
import Congratulations from './screens/Congratulations';
import PaymentDetails from './screens/PaymentDetails';
import DocumentsVerification from './screens/DocumentsVerification';
import debounce from 'lodash/debounce'
import { sendOTP, verifyOTP, updateUserDetails, updateUserWithFiles } from './api/auth';

const Container = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BackgroundGradient = styled.div<{ $topOffset: number }>`
  position: absolute;
  z-index: -1 !important;
  top: ${props => 0}px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #e6f0ff 0%, #ffffff 100%);
  z-index: 0;
  transition: top 0.3s ease;
`;

const Header = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Logo = styled.h1`
  font-size: 28px;
  color: #2C3E50;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #4B89DC;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressContainer = styled.div`
  margin: 0 20px;
  position: relative;
  z-index: 1;
  background: white;
`;

const ProgressBar = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  border-bottom: 1px solid #E2E8F0;
`;

const ProgressStep = styled.div<{ $active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 16px 8px;
  color: ${props => props.$active ? '#000' : '#94A3B8'};
  border-bottom: 2px solid ${props => props.$active ? '#000' : 'transparent'};
  font-weight: ${props => props.$active ? '500' : '400'};
  font-size: 16px;
  margin-bottom: -1px;
`;

const Content = styled.div`
  padding: 32px 20px;
  /* max-width: 600px; */
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TermsContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  margin-top: auto;
`;

const CheckboxContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  background: ${props => props.checked ? '#4B89DC' : '#fff'};
  border: 1px solid ${props => props.checked ? '#4B89DC' : '#E2E8F0'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const TermsText = styled.p`
  font-size: 13px;
  color: #64748B;
  line-height: 1.4;

  a {
    color: #4B89DC;
    text-decoration: none;
    font-weight: 500;
  }
`;

const OTPOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 998;
`;

const OTPBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 32px;
  z-index: 999;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
`;

const OTPHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const OTPTitle = styled.h3`
  font-size: 28px;
  color: #1E293B;
  font-weight: 600;
`;

const OTPCloseButton = styled.button`
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OTPSubtitle = styled.p`
  font-size: 16px;
  color: #64748B;
  margin-bottom: 32px;
`;

const OTPInputContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 48px;
`;

const OTPDigit = styled.input.attrs({
  inputMode: 'numeric',
  pattern: '[0-9]*',
  type: 'tel',
})`
  width: 48px;
  height: 48px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #1E293B;
  outline: none;
  background: white;

  &:focus {
    border-color: #4B89DC;
  }

  &::placeholder {
    color: #94A3B8;
  }
`;

const CircularTimer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CircularProgress = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: #E2E8F0;
  stroke-width: 2;
`;

const CircleProgress = styled.circle<{ $progress: number }>`
  fill: none;
  stroke: #64748B;
  stroke-width: 2;
  stroke-dasharray: 44; // 2 * π * r (r = 7)
  stroke-dashoffset: ${props => 44 * (1 - props.$progress)}; // Calculate remaining progress
  transition: stroke-dashoffset 1s linear;
`;

const Timer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748B;
  font-size: 16px;
`;

const ResendContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ResendButton = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.disabled ? '#94A3B8' : '#4B89DC'};
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  padding: 0;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SpinningLoader = styled(Loader2)`
  animation: spin 1s linear infinite;
  color: #4B89DC;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const OTPError = styled.p`
  color: #EF4444;
  font-size: 14px;
  margin-top: -32px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OTPDigitError = styled(OTPDigit)`
  border-color: #EF4444;
  
  &:focus {
    border-color: #EF4444;
  }
`;

const ScreenContainer = styled.div`
 align-self: center;
 min-width: 50vw;
`

interface InitialState {
  mobileNumber: string;
  agreed: boolean;
  showOTP: boolean;
  otp: string[];
  isVerified: boolean;
  panNumber: string;
  isPanVerified: boolean;
  name: string;
  dob: string;
  isNameVerified: boolean;
  isDobVerified: boolean;
  aadhaarNumber: string;
  showAdditionalDetails: boolean;
  email: string;
  employmentType: 'salaried' | 'self-employed' | '';
  salary: string;
  showWorkDetails: boolean;
  workEmail: string;
  officeAddress: string;
  salarySlips: string[];
  personalAddress: string;
  currentCity: string;
  currentLoans: string;
  stayingStatus: string;
  currentScreen: 'verify' | 'offer' | 'money';
  showPayment: boolean;
  showVerificationStatus: boolean;
}

interface VerifyDetailsProps {
  initialState: InitialState;
}

function VerifyDetails({ initialState }: VerifyDetailsProps) {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState(initialState.mobileNumber);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(initialState.agreed);
  const [showOTP, setShowOTP] = useState(initialState.showOTP);
  const [otp, setOTP] = useState(initialState.otp);
  const [timer, setTimer] = useState(30);
  const [isVerified, setIsVerified] = useState(initialState.isVerified);
  const [panNumber, setPanNumber] = useState(initialState.panNumber);
  const [gradientTopOffset, setGradientTopOffset] = useState(0);
  const [panError, setPanError] = useState('');
  const [isPanVerified, setIsPanVerified] = useState(initialState.isPanVerified);
  const [name, setName] = useState(initialState.name);
  const [dob, setDob] = useState(initialState.dob);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isNameVerified, setIsNameVerified] = useState(initialState.isNameVerified);
  const [isDobVerified, setIsDobVerified] = useState(initialState.isDobVerified);
  const [aadhaarNumber, setAadhaarNumber] = useState(initialState.aadhaarNumber);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(initialState.showAdditionalDetails);
  const [email, setEmail] = useState(initialState.email);
  //@ts-ignore
  const [employmentType, setEmploymentType] = useState<'salaried' | 'self-employed'>(initialState.employmentType);
  const [salary, setSalary] = useState(initialState.salary);
  const [showWorkDetails, setShowWorkDetails] = useState(initialState.showWorkDetails);
  const [workEmail, setWorkEmail] = useState(initialState.workEmail);
  const [officeAddress, setOfficeAddress] = useState(initialState.officeAddress);
  const [salarySlips, setSalarySlips] = useState(initialState.salarySlips);
  const [personalAddress, setPersonalAddress] = useState(initialState.personalAddress);
  const [currentCity, setCurrentCity] = useState(initialState.currentCity);
  const [currentLoans, setCurrentLoans] = useState(initialState.currentLoans);
  const [stayingStatus, setStayingStatus] = useState(initialState.stayingStatus);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentScreen, setCurrentScreen] = useState<'verify' | 'offer' | 'money'>(initialState.currentScreen);
  const [showPayment, setShowPayment] = useState(initialState.showPayment);
  const [showVerificationStatus, setShowVerificationStatus] = useState(initialState.showVerificationStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const [consolidatedState, setConsolidatedState] = useState({
    mobileNumber: '',
    agreed: false,
    showOTP: false,
    otp: ['', '', '', '', '', ''],
    isVerified: false,
    panNumber: '',
    isPanVerified: false,
    name: '',
    dob: '',
    isNameVerified: false,
    isDobVerified: false,
    aadhaarNumber: '',
    showAdditionalDetails: false,
    email: '',
    employmentType: 'salaried',
    salary: '',
    showWorkDetails: false,
    workEmail: '',
    officeAddress: '',
    salarySlips: ['', '', ''],
    personalAddress: '',
    currentCity: '',
    currentLoans: '',
    stayingStatus: '',
    currentScreen: 'verify',
    showPayment: false,
    showVerificationStatus: false,
  });

  const updateConsolidatedState = (update: Object) => {
    const updatedObj = {
      ...consolidatedState,
      ...update
    }
    console.log(updatedObj)
    setConsolidatedState(updatedObj)
  }

  const debouncedUpdateConsolidatedState = debounce(updateConsolidatedState, 200)


  useEffect(() => {
    debouncedUpdateConsolidatedState({
      mobileNumber,
      otp,
      panNumber,
      isPanVerified,
      name,
      dob,
      isNameVerified,
      isDobVerified,
      aadhaarNumber,
      showAdditionalDetails,
      email,
      employmentType,
      salary,
      workEmail,
      officeAddress,
      salarySlips,
      personalAddress,
      currentCity,
      currentLoans,
      stayingStatus,
      currentScreen,
      showPayment,
      showVerificationStatus,
      isVerified,
    });

    // Cleanup function to cancel any pending debounced calls
    return () => {
      debouncedUpdateConsolidatedState.cancel();
    };
  }, [
    mobileNumber,
    otp,
    panNumber,
    isPanVerified,
    name,
    dob,
    isNameVerified,
    isDobVerified,
    aadhaarNumber,
    showAdditionalDetails,
    email,
    employmentType,
    salary,
    workEmail,
    officeAddress,
    salarySlips,
    personalAddress,
    currentCity,
    currentLoans,
    stayingStatus,
    currentScreen,
    showPayment,
    showVerificationStatus,
    isVerified,
    isNameVerified,
    isDobVerified
  ]);

  useEffect(() => {
    let interval: number;
    if (showOTP && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  useEffect(() => {
    const updateGradientPosition = () => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        setGradientTopOffset(rect.top);
      }
    };

    updateGradientPosition();
    window.addEventListener('resize', updateGradientPosition);

    return () => window.removeEventListener('resize', updateGradientPosition);
  }, []);

  const handleMobileNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setMobileNumber(value);
      setError('');

      if (value.length === 10 && !isVerified) {
        setIsLoading(true);
        try {
          const response = await sendOTP(value);

          if (response.userDetails) {
            // Update all states with existing user details
            setMobileNumber(response.userDetails.mobileNumber);
            setAgreed(response.userDetails.agreed);
            setShowOTP(response.userDetails.showOTP);
            setOTP(response.userDetails.otp);
            setIsVerified(response.userDetails.isVerified);
            setPanNumber(response.userDetails.panNumber);
            setIsPanVerified(response.userDetails.isPanVerified);
            setName(response.userDetails.name);
            setDob(response.userDetails.dob);
            setIsNameVerified(response.userDetails.isNameVerified);
            setIsDobVerified(response.userDetails.isDobVerified);
            setAadhaarNumber(response.userDetails.aadhaarNumber);
            setShowAdditionalDetails(response.userDetails.showAdditionalDetails);
            setEmail(response.userDetails.email);
            // @ts-ignore
            setEmploymentType(response.userDetails.employmentType);
            setSalary(response.userDetails.salary);
            setShowWorkDetails(response.userDetails.showWorkDetails);
            setWorkEmail(response.userDetails.workEmail);
            setOfficeAddress(response.userDetails.officeAddress);
            setSalarySlips(response.userDetails.salarySlips);
            setPersonalAddress(response.userDetails.personalAddress);
            setCurrentCity(response.userDetails.currentCity);
            setCurrentLoans(response.userDetails.currentLoans);
            setStayingStatus(response.userDetails.stayingStatus);
            setCurrentScreen(response.userDetails.currentScreen);
            setShowPayment(response.userDetails.showPayment);
            setShowVerificationStatus(response.userDetails.showVerificationStatus);
          } else {
            // Normal flow - show OTP input
            setShowOTP(true);
            setTimer(30);
          }
        } catch (error) {
          console.error('Error:', error);
          setError('Something went wrong. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleOTPChange = async (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      setOtpError(false);

      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }

      if (index === 5 && value) {
        const enteredOTP = [...newOTP.slice(0, 5), value].join('');
        setShowOTP(false);
        setIsLoading(true);

        try {
          const response = await verifyOTP(mobileNumber, enteredOTP);

          if (response.message === "OTP verified successfully" && response.userDetails) {
          const userDetails = response.userDetails;
          setMobileNumber(userDetails.mobileNumber);
          setAgreed(userDetails.agreed);
          setShowOTP(userDetails.showOTP);
          setOTP(userDetails.otp);
          setIsVerified(userDetails.isVerified);
          setPanNumber(userDetails.panNumber);
          setIsPanVerified(userDetails.isPanVerified);
          setName(userDetails.name);
          setDob(userDetails.dob);
          setIsNameVerified(userDetails.isNameVerified);
          setIsDobVerified(userDetails.isDobVerified);
          setAadhaarNumber(userDetails.aadhaarNumber);
          setShowAdditionalDetails(userDetails.showAdditionalDetails);
          setEmail(userDetails.email);
          // @ts-ignore
          setEmploymentType(userDetails.employmentType);
          setSalary(userDetails.salary);
          setShowWorkDetails(userDetails.showWorkDetails);
          setWorkEmail(userDetails.workEmail);
          setOfficeAddress(userDetails.officeAddress);
          setSalarySlips(userDetails.salarySlips);
          setPersonalAddress(userDetails.personalAddress);
          setCurrentCity(userDetails.currentCity);
          setCurrentLoans(userDetails.currentLoans);
          setStayingStatus(userDetails.stayingStatus);
          setCurrentScreen(userDetails.currentScreen);
          setShowPayment(userDetails.showPayment);
          setShowVerificationStatus(userDetails.showVerificationStatus);
        } else {
          setOtpError(true);
          setShowOTP(true);
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        setOtpError(true);
        setShowOTP(true);
      } finally {
        setIsLoading(false);
      }
    }
  }
};

const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Backspace') {
    if (index > 0 && !otp[index]) {
      const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }
};

const validatePAN = (pan: string) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (pan.length === 10) {
    if (!panRegex.test(pan)) {
      setPanError('Invalid PAN format. Please check and try again.');
      setIsPanVerified(false);
    } else {
      setPanError('');
      setIsPanVerified(true);
    }
  } else {
    setPanError('');
    setIsPanVerified(false);
  }
};

const handlePanNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.toUpperCase();
  if (value.length <= 10) {
    setPanNumber(value);
    validatePAN(value);
  }
};

const handleResendOTP = () => {
  setTimer(30);
  setOTP(['', '', '', '', '', '']);
};

const calculateProgress = (currentTime: number, maxTime: number) => {
  return currentTime / maxTime;
};

const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setDob(value);
  setIsDateValid(!!value); // Set to true if date is not empty
};

const handleProceed = async () => {
  setIsLoading(true);
  try {
    setIsNameVerified(true);
    setIsDobVerified(true);

    setTimeout(async () => {
      await updateUserDetails({
        ...consolidatedState,
        isNameVerified: true,
        isDobVerified: true,
      });

    },100)

  } catch (error) {
    console.error('Error updating user details:', error);
  } finally {
    setIsLoading(false);
  }
};

const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D/g, '');
  if (value.length <= 12) {
    setAadhaarNumber(value);
  }
};

const isAadhaarValid = (aadhaar: string) => {
  return aadhaar.length === 12;
};

const handleFinalProceed = async () => {
  setIsLoading(true);
  try {
    await updateUserDetails({
      ...consolidatedState,
      aadhaarNumber,
      showAdditionalDetails: true
    });
  setShowAdditionalDetails(true);
  } catch (error) {
    console.error('Error updating user details:', error);
  } finally {
    setIsLoading(false);
  }
};

const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D/g, '');
  setSalary(value);
};

const handleContinue = async () => {
  setIsLoading(true);
  try {
    await updateUserDetails({
      ...consolidatedState,
      email,
      employmentType,
      salary,
      showWorkDetails: true
    });
  setShowWorkDetails(true);
  } catch (error) {
    console.error('Error updating user details:', error);
  } finally {
    setIsLoading(false);
  }
};

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    // Get the actual File objects from the WorkDetails component
    const files = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    const uploadFiles: File[] = [];
    
    files.forEach((fileInput) => {
      if (fileInput.files && fileInput.files.length > 0) {
        uploadFiles.push(fileInput.files[0]);
      }
    });

    // First update user details with files
    await updateUserWithFiles({
      ...consolidatedState,
      workEmail,
      officeAddress,
      personalAddress,
      currentCity,
      currentLoans,
      stayingStatus,
      currentScreen: 'offer'
    }, uploadFiles);

    setCurrentScreen('offer');
  } catch (error) {
    console.error('Error submitting work details:', error);
  } finally {
    setIsLoading(false);
  }
};

const handleGetMoney = () => {
  setShowPayment(true);
};

const handlePaymentComplete = () => {
  setShowVerificationStatus(true);
};

return (
  <Container>
    {isLoading && (
      <LoadingOverlay>
        <SpinningLoader size={40} />
      </LoadingOverlay>
    )}
    {/* <BackgroundGradient $topOffset={gradientTopOffset} /> */}

    <div style={{ pointerEvents: showOTP ? 'none' : 'auto' }}>
      <Header>
        <Logo>INSTAloan</Logo>
        <CloseButton onClick={() => router.push('/apply-loan-v2')}>
          <X size={24} />
        </CloseButton>
      </Header>

      <ProgressContainer>
        <ProgressBar>
          <ProgressStep $active={currentScreen === 'verify'}>Verify Details</ProgressStep>
          <ProgressStep $active={currentScreen === 'offer'}>Get Offer</ProgressStep>
          <ProgressStep $active={currentScreen === 'money'}>Get Money</ProgressStep>
        </ProgressBar>
      </ProgressContainer>

      <Content ref={contentRef}>
        <BackgroundGradient $topOffset={gradientTopOffset} />
        <ScreenContainer >
          {currentScreen === 'verify' ? (
            !showAdditionalDetails ? (
              <LGS
                isVerified={isVerified}
                mobileNumber={mobileNumber}
                handleMobileNumberChange={handleMobileNumberChange}
                isPanVerified={isPanVerified}
                panNumber={panNumber}
                handlePanNumberChange={handlePanNumberChange}
                isAadhaarValid={isAadhaarValid}
                aadhaarNumber={aadhaarNumber}
                handleFinalProceed={handleFinalProceed}
                handleAadhaarChange={handleAadhaarChange}
                isNameVerified={isNameVerified}
                isDobVerified={isDobVerified}
                dob={dob}
                handleDateChange={handleDateChange}
                isDateValid={isDateValid}
                handleProceed={handleProceed}
                name={name}
                setName={setName}
                panError={panError}
              />
            ) : !showWorkDetails ? (
              <AdditionalDetails
                email={email}
                employmentType={employmentType}
                salary={salary}
                onEmailChange={(e) => setEmail(e.target.value)}
                onEmploymentTypeChange={setEmploymentType}
                onSalaryChange={handleSalaryChange}
                onContinue={handleContinue}
              />
            ) : (
              <WorkDetails
                workEmail={workEmail}
                officeAddress={officeAddress}
                personalAddress={personalAddress}
                currentCity={currentCity}
                currentLoans={currentLoans}
                stayingStatus={stayingStatus}
                salarySlips={salarySlips}
                onWorkEmailChange={(e) => setWorkEmail(e.target.value)}
                onOfficeAddressChange={(e) => setOfficeAddress(e.target.value)}
                onPersonalAddressChange={(e) => setPersonalAddress(e.target.value)}
                onCurrentCityChange={(e) => setCurrentCity(e.target.value)}
                onCurrentLoansChange={(e) => setCurrentLoans(e.target.value)}
                onStayingStatusChange={(e) => setStayingStatus(e.target.value)}
                onSalarySlipsChange={setSalarySlips}
                onSubmit={handleSubmit}
              />
            )
          ) : currentScreen === 'offer' ? (
            !showPayment ? (
              <Congratulations onGetMoney={handleGetMoney} />
            ) : !showVerificationStatus ? (
              <PaymentDetails onProceed={handlePaymentComplete} />
            ) : (
              <DocumentsVerification onCheckStatus={() => console.log('Checking status...')} />
            )
          ) : currentScreen === 'money' ? (
            null
          ) : null}
        </ScreenContainer>


        {!showOTP && !isVerified && (
          <TermsContainer>
            <CheckboxContainer>
              <HiddenCheckbox
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <StyledCheckbox checked={agreed} onClick={() => setAgreed(!agreed)}>
                <Check size={12} color="white" />
              </StyledCheckbox>
            </CheckboxContainer>
            <TermsText>
              Agree to <a href="#">T&C</a> and use of my KYC details from Cersai/UIDAI
            </TermsText>
          </TermsContainer>
        )}
      </Content>
    </div>

    {showOTP && (
      <>
        <OTPOverlay />
        <OTPBanner>
          <OTPHeader>
            <OTPTitle>Enter OTP</OTPTitle>
            <OTPCloseButton onClick={() => setShowOTP(false)}>
              <X size={24} />
            </OTPCloseButton>
          </OTPHeader>
          <OTPSubtitle>OTP sent to +91 {mobileNumber} for verification</OTPSubtitle>

          <OTPInputContainer>
            {otp.map((digit, index) => (
              otpError ? (
                <OTPDigitError
                  key={index}
                  name={`otp-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ) : (
                <OTPDigit
                  key={index}
                  name={`otp-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              )
            ))}
          </OTPInputContainer>

          {otpError && (
            <OTPError>
              <X size={16} />
              Invalid OTP. Please enter a valid one
            </OTPError>
          )}

          <ResendContainer>
            <ResendButton
              onClick={handleResendOTP}
              disabled={timer > 0}
            >
              Resend OTP
            </ResendButton>
            {timer > 0 && (
              <Timer>
                <CircularTimer>
                  <CircularProgress width="20" height="20" viewBox="0 0 20 20">
                    <CircleBackground cx="10" cy="10" r="7" />
                    <CircleProgress
                      cx="10"
                      cy="10"
                      r="7"
                      $progress={calculateProgress(timer, 30)}
                    />
                  </CircularProgress>
                </CircularTimer>
                {timer} Sec
              </Timer>
            )}
          </ResendContainer>
        </OTPBanner>
      </>
    )}
  </Container>
);
}

export default VerifyDetails;