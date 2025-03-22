import styled from "styled-components";

const AdditionalDetailsContent = styled.div`
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

const Title = styled.h2`
  font-size: 24px;
  color: #1E293B;
  margin-bottom: 12px;
  font-weight: 600;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #64748B;
  margin-bottom: 12px;
`;

const EmailInput = styled.input`
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

const EmploymentTypeContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const EmploymentTypeButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 16px;
  border: 1px solid ${props => props.$active ? '#4B89DC' : '#E2E8F0'};
  border-radius: 16px;
  background: ${props => props.$active ? '#4B89DC' : 'white'};
  color: ${props => props.$active ? 'white' : '#64748B'};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4B89DC;
  }
`;

const SalaryInputContainer = styled.div`
  margin-top: 24px;
`;

const SalaryInput = styled.input`
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

const SalaryNote = styled.p`
  font-size: 12px;
  color: #64748B;
  margin-top: 8px;
`;

const DocumentsList = styled.div`
  margin-top: 32px;
  padding: 24px;
  background: #F8FAFC;
  border-radius: 16px;
`;

const DocumentsTitle = styled.h3`
  font-size: 16px;
  color: #1E293B;
  margin-bottom: 16px;
  font-weight: 500;
`;

const DocumentItem = styled.div`
  color: #64748B;
  font-size: 14px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
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

interface AdditionalDetailsProps {
  email: string;
  employmentType: 'salaried' | 'self-employed';
  salary: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmploymentTypeChange: (type: 'salaried' | 'self-employed') => void;
  onSalaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
}

const AdditionalDetails = ({
  email,
  employmentType,
  salary,
  onEmailChange,
  onEmploymentTypeChange,
  onSalaryChange,
  onContinue
}: AdditionalDetailsProps) => {
  return (
    <AdditionalDetailsContent>
      <Title>Help us with some more details</Title>

      <Label>Personal email ID</Label>
      <EmailInput
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={onEmailChange}
      />

      <Label style={{ marginTop: '24px' }}>Employment Type</Label>
      <EmploymentTypeContainer>
        <EmploymentTypeButton
          $active={employmentType === 'salaried'}
          onClick={() => onEmploymentTypeChange('salaried')}
        >
          Salaried
        </EmploymentTypeButton>
        <EmploymentTypeButton
          $active={employmentType === 'self-employed'}
          onClick={() => onEmploymentTypeChange('self-employed')}
        >
          Self-employed
        </EmploymentTypeButton>
      </EmploymentTypeContainer>

      <SalaryInputContainer>
        <Label>Net monthly in-hand salary</Label>
        <SalaryInput
          type="text"
          placeholder="Enter your monthly salary"
          value={salary}
          onChange={onSalaryChange}
        />
        <SalaryNote>
          Do not include incentives, bonuses or any one-time payments.
        </SalaryNote>
      </SalaryInputContainer>

      <DocumentsList>
        <DocumentsTitle>
          For a quick loan application process, keep these documents handy:
        </DocumentsTitle>
        <DocumentItem>• PAN Card</DocumentItem>
        <DocumentItem>• Aadhaar Card</DocumentItem>
        <DocumentItem>
          • Last 3 month's bank statements of salary account or net banking credentials
        </DocumentItem>
      </DocumentsList>

      <CTAButton onClick={onContinue}>
        Continue
      </CTAButton>
    </AdditionalDetailsContent>
  );
};

export default AdditionalDetails; 