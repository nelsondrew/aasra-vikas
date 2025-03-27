import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Upload, Loader, Check, X } from 'lucide-react';
import { Button } from '../common/Button';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setHeaderText } from '../../../store/slices/commonSlice';

const ReferralContainer = styled.div`
  min-height: 100vh;
  background-color: #FFFFFF;
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  color: #1E293B;
  display: flex;
  align-items: center;
  background: transparent;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E293B;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  background-color: #F8FAFC;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    color: #1E293B;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.25rem;
    color: #1E293B;
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  background-color: transparent;
  color: #1E293B;

  &:focus {
    border-color: #60A5FA;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  background-color: transparent;
  color: #1E293B;

  &:focus {
    border-color: #60A5FA;
  }
`;

const DocumentUpload = styled.div`
  border: 2px dashed #E2E8F0;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    border-color: #60A5FA;
  }

  input {
    display: none;
  }

  .icon {
    color: #60A5FA;
    margin-bottom: 1rem;
  }

  p {
    color: #64748B;
    margin-bottom: 0.25rem;
  }

  .supported-formats {
    font-size: 0.875rem;
    color: #64748B;
  }
`;

const ErrorMessage = styled.span`
  color: #DC2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const FileUploadContainer = styled.div`
  margin-top: 1rem;

  .salary-slip-label {
    margin-bottom: 1rem;
  }
`;

const FileUploadInput = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  font-size: 16px;
  color: #1E293B;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: white;
  margin-bottom: 0.75rem;

  &:hover {
    border-color: #60A5FA;
  }
`;

const LoadingSpinner = styled(Loader)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #F1F5F9;
    color: #1E293B;
  }
`;

const SuccessPopover = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
  position: relative;

  h3 {
    color: #059669;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: #4B5563;
    margin-bottom: 1.5rem;
  }
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  background: #D1FAE5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #059669;
`;

interface FormData {
  name: string;
  email: string;
  mobileNumber: string;
  dob: string;
  aadhaarNumber: string;
  panNumber: string;
  employmentType: 'salaried' | 'business';
  salary: string;
  currentLoans: string;
  workEmail: string;
  officeAddress: string;
  personalAddress: string;
  currentCity: string;
  stayingStatus: 'Owned' | 'Rented' | 'With Parents';
  salarySlips: Array<{
    label: string;
    url: string;
  }>;
  loanType: string;
  loanAmount: string;
}

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

const ReferralScreen: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    defaultValues: {
      salarySlips: [
        { label: 'Month 1 salary slip', url: '' },
        { label: 'Month 2 salary slip', url: '' },
        { label: 'Month 3 salary slip', url: '' }
      ]
    }
  });
  const dispatch = useDispatch();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const salarySlips = watch('salarySlips');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    dispatch(setHeaderText('Referral'));
  }, [dispatch]);

  const onSubmit = (data: FormData) => {
    const referralData = {
      // Personal Information
      name: data.name,
      email: data.email,
      mobileNumber: data.mobileNumber,
      dob: data.dob,
      
      // Loan Details
      loanType: data.loanType,
      loanAmount: data.loanAmount,
      
      // Identity Details
      aadhaarNumber: data.aadhaarNumber,
      panNumber: data.panNumber,
      
      // Employment & Financial Details
      employmentType: data.employmentType,
      salary: data.salary,
      currentLoans: data.currentLoans || '',
      workEmail: data.workEmail || '',
      salarySlips: data.salarySlips,
      
      // Address Details
      officeAddress: data.officeAddress,
      personalAddress: data.personalAddress,
      currentCity: data.currentCity,
      stayingStatus: data.stayingStatus,
      
      // Metadata
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    console.log('Referral Data:', referralData);
    
    // Show success popover
    setShowSuccess(true);
    
    // Automatically redirect after 2 seconds
    setTimeout(() => {
      router.push("/dsa-dashboard");
    }, 2000);
  };

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleFileInputClick = (index: number) => {
    fileInputRefs[index].current?.click();
  };

  const uploadFile = async (file: File, index: number) => {
    try {
      setFileError(null);

      if (file.size > MAX_FILE_SIZE) {
        setFileError('File size must be less than 3MB');
        return;
      }

      setUploadingIndex(index);
      
      // Update label immediately
      const newSlips = [...salarySlips];
      newSlips[index].label = file.name;
      setValue('salarySlips', newSlips);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const updatedSlips = [...salarySlips];
        updatedSlips[index] = {
          label: file.name,
          url: data.url
        };
        setValue('salarySlips', updatedSlips);
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
      setValue('salarySlips', revertedSlips);
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <ReferralContainer>
      <Header>
        <BackButton onClick={goBack}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>New Loan Referral</Title>
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <h2>Personal Information</h2>
          <InputGroup>
            <label>Full Name</label>
            <Input
              {...register('name', { required: 'Full name is required' })}
              placeholder="Enter customer's full name"
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>Date of Birth</label>
            <Input
              type="date"
              {...register('dob', { required: 'Date of birth is required' })}
            />
            {errors.dob && <ErrorMessage>{errors.dob.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>Mobile Number</label>
            <Input
              type="tel"
              {...register('mobileNumber', { 
                required: 'Mobile number is required',
                pattern: {
                  value: /^\+91[0-9]{10}$/,
                  message: 'Please enter valid Indian mobile number with +91'
                }
              })}
              placeholder="+91XXXXXXXXXX"
            />
            {errors.mobileNumber && <ErrorMessage>{errors.mobileNumber.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>Email Address</label>
            <Input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email'
                }
              })}
              placeholder="Enter personal email"
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </InputGroup>
        </FormSection>

        <FormSection>
          <h2>Loan Details</h2>
          <InputGroup>
            <label>Loan Type</label>
            <Select {...register('loanType', { required: 'Loan type is required' })}>
              <option value="">Select loan type</option>
              <option value="personal">Personal Loan</option>
              <option value="business">Business Loan</option>
              <option value="home">Home Loan</option>
              <option value="education">Education Loan</option>
              <option value="vehicle">Vehicle Loan</option>
            </Select>
            {errors.loanType && <ErrorMessage>{errors.loanType.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>Loan Amount</label>
            <Input
              type="number"
              {...register('loanAmount', { 
                required: 'Loan amount is required',
                min: {
                  value: 100000,
                  message: 'Minimum loan amount is ₹1,00,000'
                },
                max: {
                  value: 10000000,
                  message: 'Maximum loan amount is ₹1,00,00,000'
                }
              })}
              placeholder="Enter required loan amount"
            />
            {errors.loanAmount && <ErrorMessage>{errors.loanAmount.message}</ErrorMessage>}
          </InputGroup>
        </FormSection>

        <FormSection>
          <h2>Identity Details</h2>
          <InputGroup>
            <label>Aadhaar Number</label>
            <Input
              {...register('aadhaarNumber', { 
                required: 'Aadhaar number is required',
                pattern: {
                  value: /^\d{12}$/,
                  message: 'Please enter valid 12-digit Aadhaar number'
                }
              })}
              placeholder="XXXX XXXX XXXX"
            />
            {errors.aadhaarNumber && <ErrorMessage>{errors.aadhaarNumber.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>PAN Number</label>
            <Input
              {...register('panNumber', { 
                required: 'PAN number is required',
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: 'Please enter valid PAN number'
                }
              })}
              placeholder="ABCDE1234F"
            />
            {errors.panNumber && <ErrorMessage>{errors.panNumber.message}</ErrorMessage>}
          </InputGroup>
        </FormSection>

        <FormSection>
          <h2>Employment & Financial Details</h2>
          <InputGroup>
            <label>Employment Type</label>
            <Select {...register('employmentType', { required: 'Employment type is required' })}>
              <option value="">Select employment type</option>
              <option value="salaried">Salaried</option>
              <option value="business">Business</option>
            </Select>
            {errors.employmentType && <ErrorMessage>{errors.employmentType.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>Monthly Income</label>
            <Input
              type="number"
              {...register('salary', { required: 'Monthly income is required' })}
              placeholder="Enter monthly income"
            />
            {errors.salary && <ErrorMessage>{errors.salary.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>Current Loans (if any)</label>
            <Input
              {...register('currentLoans')}
              placeholder="Enter details of existing loans"
            />
          </InputGroup>

          <InputGroup>
            <label>Work Email (Optional)</label>
            <Input
              type="email"
              {...register('workEmail')}
              placeholder="Enter work email"
            />
          </InputGroup>

          <FileUploadContainer>
            <label className='salary-slip-label'>3 months salary slip</label>
            {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
            {salarySlips.map((slip, index) => (
              <FileUploadInput
                key={index}
                onClick={() => handleFileInputClick(index)}
                style={{ opacity: uploadingIndex === index ? 0.7 : 1 }}
              >
                <span>{slip.label}</span>
                {uploadingIndex === index ? (
                  <LoadingSpinner size={20} color="#60A5FA" />
                ) : (
                  <Upload size={20} color="#64748B" />
                )}
                <input
                  ref={fileInputRefs[index]}
                  type="file"
                  hidden
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFileError(null);
                      uploadFile(file, index);
                    }
                  }}
                  disabled={uploadingIndex !== null}
                />
              </FileUploadInput>
            ))}
          </FileUploadContainer>
        </FormSection>

        <FormSection>
          <h2>Address Details</h2>
          <InputGroup>
            <label>Current City</label>
            <Input
              {...register('currentCity', { required: 'Current city is required' })}
              placeholder="Enter current city"
            />
            {errors.currentCity && <ErrorMessage>{errors.currentCity.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>Staying Status</label>
            <Select {...register('stayingStatus', { required: 'Staying status is required' })}>
              <option value="">Select staying status</option>
              <option value="Owned">Owned</option>
              <option value="Rented">Rented</option>
              <option value="With Parents">With Parents</option>
            </Select>
            {errors.stayingStatus && <ErrorMessage>{errors.stayingStatus.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>Personal Address</label>
            <Input
              as="textarea"
              {...register('personalAddress', { required: 'Personal address is required' })}
              placeholder="Enter residential address"
            />
            {errors.personalAddress && <ErrorMessage>{errors.personalAddress.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <label>Office Address</label>
            <Input
              as="textarea"
              {...register('officeAddress', { required: 'Office address is required' })}
              placeholder="Enter office address"
            />
            {errors.officeAddress && <ErrorMessage>{errors.officeAddress.message}</ErrorMessage>}
          </InputGroup>
        </FormSection>

        <Button type="submit" fullWidth>
          Submit Referral
        </Button>
      </Form>

      {showSuccess && (
        <Overlay>
          <SuccessPopover>
            <CloseButton onClick={() => setShowSuccess(false)}>
              <X size={20} />
            </CloseButton>
            <SuccessIcon>
              <Check size={32} />
            </SuccessIcon>
            <h3>Successfully Submitted!</h3>
            <p>The loan referral details have been submitted successfully.</p>
          </SuccessPopover>
        </Overlay>
      )}
    </ReferralContainer>
  );
};

export default ReferralScreen;