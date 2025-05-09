import styled from "styled-components";
import { Upload, Loader } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

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

const LoadingSpinner = styled(Loader)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #DC2626;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 8px;
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
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleFileInputClick = (index: number) => {
    fileInputRefs[index].current?.click();
  };

  const uploadFile = async (file: File, index: number) => {
    try {
      // Clear any previous errors
      setFileError(null);

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File size must be less than 3MB');
        return;
      }

      setUploadingIndex(index);
      
      // Update label immediately for better UX
      const newSlips = [...salarySlips];
      newSlips[index].label = file.name;
      onSalarySlipsChange(newSlips);

      // Create FormData and append file
      const formData = new FormData();
      formData.append('file', file);

      // Call upload API
      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Update with URL after successful upload
        const updatedSlips = [...salarySlips];
        updatedSlips[index] = {
          label: file.name,
          url: data.url
        };
        onSalarySlipsChange(updatedSlips);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setFileError('Failed to upload file');
      // Revert on failure
      const revertedSlips = [...salarySlips];
      revertedSlips[index].label = `Month ${index + 1} salary slip`;
      revertedSlips[index].url = '';
      onSalarySlipsChange(revertedSlips);
    } finally {
      setUploadingIndex(null);
    }
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
        {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
        {salarySlips.map((slip, index) => (
          <FileUploadInput
            key={index}
            onClick={() => handleFileInputClick(index)}
            style={{ opacity: uploadingIndex === index ? 0.7 : 1 }}
          >
            <span>{slip.label || `Month ${index + 1} salary slip`}</span>
            {uploadingIndex === index ? (
              <LoadingSpinner size={20} color="#4B89DC" />
            ) : (
              <Upload size={20} color="#64748B" />
            )}
            <input
              ref={fileInputRefs[index]}
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFileError(null); // Clear previous errors
                  uploadFile(file, index);
                }
              }}
              disabled={uploadingIndex !== null}
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