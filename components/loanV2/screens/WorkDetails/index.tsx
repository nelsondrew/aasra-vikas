import styled from "styled-components";
import { Upload } from 'lucide-react';
import React, { useRef } from 'react';

const WorkDetailsContent = styled.div`
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

const WorkInput = styled.input`
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

const FileUploadContainer = styled.div`
  margin-top: 24px;
`;

const FileUploadInput = styled.div`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  font-size: 16px;
  color: #1E293B;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: white;
  margin-bottom: 12px;

  &:hover {
    border-color: #4B89DC;
  }
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  font-size: 16px;
  color: #1E293B;
  outline: none;
  background: white;
  appearance: none;
  cursor: pointer;

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

interface WorkDetailsProps {
  workEmail: string;
  officeAddress: string;
  personalAddress: string;
  currentCity: string;
  currentLoans: string;
  stayingStatus: string;
  salarySlips: Array<{
    label: string;
    url: string;
  }>;
  onWorkEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOfficeAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPersonalAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrentCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrentLoansChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStayingStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSalarySlipsChange: (slips: {
    label: string;
    url: string;
  }[]) => void;
  onSubmit: () => void;
}

const WorkDetails = ({
  workEmail,
  officeAddress,
  personalAddress,
  currentCity,
  currentLoans,
  stayingStatus,
  salarySlips,
  onWorkEmailChange,
  onOfficeAddressChange,
  onPersonalAddressChange,
  onCurrentCityChange,
  onCurrentLoansChange,
  onStayingStatusChange,
  onSalarySlipsChange,
  onSubmit
}: WorkDetailsProps) => {
  const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleFileInputClick = (index: number) => {
    fileInputRefs[index].current?.click();
  };

  return (
    <WorkDetailsContent>
      <Title>Help us with your work details</Title>

      <Label>Work email address</Label>
      <WorkInput
        type="email"
        placeholder="Enter your work email"
        value={workEmail}
        onChange={onWorkEmailChange}
      />

      <Label style={{ marginTop: '24px' }}>Office address</Label>
      <WorkInput
        type="text"
        placeholder="Enter your office address"
        value={officeAddress}
        onChange={onOfficeAddressChange}
      />

      <FileUploadContainer>
        <Label>3 months salary slip</Label>
        {salarySlips.map((month, index) => (
          <FileUploadInput 
           // @ts-ignore
            key={month}
            onClick={() => handleFileInputClick(index)}
          >
            <span>{salarySlips[index]?.label || `Month ${index+ 1} salary slip`}</span>
            <Upload size={20} color="#64748B" />
            <input
              ref={fileInputRefs[index]}
              type="file"
              hidden
              onChange={(e) => {
                const newSlips = [...salarySlips];
                newSlips[index].label = e.target.files?.[0]?.name || '';
                onSalarySlipsChange(newSlips);
              }}
            />
          </FileUploadInput>
        ))}
      </FileUploadContainer>

      <Label style={{ marginTop: '24px' }}>Personal address</Label>
      <WorkInput
        type="text"
        placeholder="Enter your personal address"
        value={personalAddress}
        onChange={onPersonalAddressChange}
      />

      <Label style={{ marginTop: '24px' }}>Current city</Label>
      <WorkInput
        type="text"
        placeholder="Enter your current city"
        value={currentCity}
        onChange={onCurrentCityChange}
      />

      <Label style={{ marginTop: '24px' }}>Current ongoing loans</Label>
      <WorkInput
        type="text"
        placeholder="Enter your current loans (if any)"
        value={currentLoans}
        onChange={onCurrentLoansChange}
      />

      <Label style={{ marginTop: '24px' }}>Staying in</Label>
      <SelectInput
        value={stayingStatus}
        onChange={onStayingStatusChange}
      >
        <option value="">Select your staying status</option>
        <option value="owned">Owned</option>
        <option value="rented">Rented</option>
        <option value="family">Family Property</option>
      </SelectInput>

      <CTAButton onClick={onSubmit}>
        Submit
      </CTAButton>
    </WorkDetailsContent>
  );
};

export default WorkDetails; 