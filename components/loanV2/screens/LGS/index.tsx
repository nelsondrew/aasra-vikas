import { CheckCircle } from 'lucide-react';
import styled from "styled-components";


const MainContent = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #1E293B;
  margin-bottom: 12px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #64748B;
  margin-bottom: 24px;
`;


const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
`;

const CountryCode = styled.span`
  padding: 16px 20px;
  color: #64748B;
  font-size: 16px;
  background: white;
  border-right: 1px solid #E2E8F0;
`;

const Input = styled.input`
  flex: 1;
  padding: 16px 20px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #1E293B;
  background: white;

  &::placeholder {
    color: #94A3B8;
  }
`;

const VerifiedIcon = styled.div`
  margin-right: 16px;
  color: #10B981;
  display: flex;
  align-items: center;
`;

const PanInputContainer = styled.div`
  margin-top: 24px;
`;

const PanLabel = styled.label`
  display: block;
  font-size: 16px;
  color: #64748B;
  margin-bottom: 12px;
`;

const PanInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  font-size: 16px;
  color: #1E293B;
  outline: none;
  background: white;

  &::placeholder {
    color: #94A3B8;
  }
`;

const VerifiedInputGroup = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 24px;
  padding: 16px 24px;
  margin-bottom: 24px;
`;

const VerifiedPanInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #1E293B;
  background: white;
  padding: 0;

  &:disabled {
    background: white;
    color: #1E293B;
  }
`;


const PanErrorMessage = styled.div`
  color: #DC2626;
  font-size: 13px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NameInputContainer = styled.div`
  margin-top: 24px;
`;


const VerifiedNameInput = styled(VerifiedPanInput)`
  // Inherits all styles from VerifiedPanInput
`;

const VerifiedDateInput = styled(VerifiedPanInput)`
  // Inherits all styles from VerifiedPanInput
`;

const DateInputContainer = styled.div`
  margin-top: 24px;
`;


const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #64748B;
  margin-bottom: 12px;
`;

const NameInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  font-size: 16px;
  color: #1E293B;
  outline: none;
  background: white;

  &::placeholder {
    color: #94A3B8;
  }
`;

const CTAButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  background: linear-gradient(135deg, #4B89DC 0%, #2E5C9E 100%);
  box-shadow: 0 4px 14px rgba(75, 137, 220, 0.25);
  margin-top: 32px;
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

const AadhaarInputContainer = styled.div`
  margin-top: 24px;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AadhaarInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  font-size: 16px;
  color: #1E293B;
  outline: none;
  background: white;

  &::placeholder {
    color: #94A3B8;
  }
`;

const DateInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  font-size: 16px;
  color: #1E293B;
  outline: none;
  background: white;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }

  &::placeholder {
    color: #94A3B8;
  }
`;


interface LGSProps {
    isVerified: boolean;
    mobileNumber: string;
    handleMobileNumberChange: Function;
    isPanVerified: boolean;
    panNumber: string;
    handlePanNumberChange: Function;
    isAadhaarValid: Function;
    aadhaarNumber: string;
    handleFinalProceed: Function;
    handleAadhaarChange : Function;
    isNameVerified: boolean;
    isDobVerified: boolean;
    dob: string;
    handleDateChange:Function;
    isDateValid: boolean;
    handleProceed: Function;
    name: string;
    setName: Function;
    panError: string
}

const LGS = ({ 
    isVerified, 
    mobileNumber, 
    handleMobileNumberChange, 
    isPanVerified, 
    panNumber , 
    isAadhaarValid , 
    aadhaarNumber , 
    handleFinalProceed,
    handleAadhaarChange,
    isDobVerified,
    isNameVerified,
    dob,
    handleDateChange,
    handleProceed,
    isDateValid,
    name,
    setName,
    handlePanNumberChange,
    panError,

}: LGSProps) => {

    return (
        <MainContent>
            <Title>Let's Get Started</Title>
            <Subtitle>Enter Aadhaar linked mobile number</Subtitle>

            {isVerified ? (
                <InputGroup>
                    <CountryCode>+91</CountryCode>
                    <Input
                        type="tel"
                        value={mobileNumber}
                        disabled
                    />
                    <VerifiedIcon>
                        <CheckCircle size={20} />
                    </VerifiedIcon>
                </InputGroup>
            ) : (
                <InputGroup>
                    <CountryCode>+91</CountryCode>
                    <Input
                        type="tel"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        // @ts-ignore
                        onChange={handleMobileNumberChange}
                    />
                </InputGroup>
            )}

            {isVerified && (
                <>
                    <PanInputContainer>
                        <PanLabel>PAN Number</PanLabel>
                        {isPanVerified ? (
                            <VerifiedInputGroup style={{
                                paddingRight: '17px'
                            }}>
                                <VerifiedPanInput
                                    type="text"
                                    value={panNumber}
                                    disabled
                                />
                                <VerifiedIcon style={{
                                    marginRight: 0
                                }}>
                                    <CheckCircle size={20} color="#10B981" />
                                </VerifiedIcon>
                            </VerifiedInputGroup>
                        ) : (
                            <>
                                <PanInput
                                    type="text"
                                    placeholder="Enter PAN Number"
                                    value={panNumber}
                                    // @ts-ignore
                                    onChange={handlePanNumberChange}
                                />
                                {panError && (
                                    <PanErrorMessage>
                                        {panError}
                                    </PanErrorMessage>
                                )}
                            </>
                        )}
                    </PanInputContainer>

                    {isPanVerified && (
                        <>
                            <NameInputContainer>
                                <Label>Name as per PAN</Label>
                                {isNameVerified ? (
                                    <VerifiedInputGroup style={{ paddingRight: '17px' }}>
                                        <VerifiedNameInput
                                            type="text"
                                            value={name}
                                            disabled
                                        />
                                        <VerifiedIcon style={{ marginRight: 0 }}>
                                            <CheckCircle size={20} color="#10B981" />
                                        </VerifiedIcon>
                                    </VerifiedInputGroup>
                                ) : (
                                    <NameInput
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                )}
                            </NameInputContainer>

                            <DateInputContainer>
                                <Label>Date of Birth</Label>
                                {isDobVerified ? (
                                    <VerifiedInputGroup style={{ paddingRight: '17px' }}>
                                        <VerifiedDateInput
                                            type="text"
                                            value={dob}
                                            disabled
                                        />
                                        <VerifiedIcon style={{ marginRight: 0 }}>
                                            <CheckCircle size={20} color="#10B981" />
                                        </VerifiedIcon>
                                    </VerifiedInputGroup>
                                ) : (
                                    <DateInput
                                        type="date"
                                        value={dob}
                                        // @ts-ignore
                                        onChange={handleDateChange}
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                )}
                            </DateInputContainer>

                            {isDateValid && !isNameVerified && !isDobVerified && (
                                            // @ts-ignore
                                <CTAButton onClick={handleProceed}>
                                    Proceed
                                </CTAButton>
                            )}

                            {isNameVerified && isDobVerified && (
                                <>
                                    <AadhaarInputContainer>
                                        <Label>Aadhaar Number (12-digits)</Label>
                                        <AadhaarInput
                                            type="text"
                                            placeholder="Enter your Aadhaar number"
                                            value={aadhaarNumber}
                                            // @ts-ignore
                                            onChange={handleAadhaarChange}
                                            maxLength={12}
                                        />
                                    </AadhaarInputContainer>

                                    {isAadhaarValid(aadhaarNumber) && (
                                        // @ts-ignore
                                        <CTAButton onClick={handleFinalProceed}>
                                            Proceed
                                        </CTAButton>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </MainContent>
    )
}

export default LGS;