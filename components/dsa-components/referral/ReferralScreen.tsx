import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '../common/Button';
import { useRouter } from 'next/router';

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

interface FormData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  loanAmount: string;
  loanType: string;
  documents: FileList;
}

 const ReferralScreen: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // TODO: Implement referral submission logic
    router.push("/dashboard")
  };

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <ReferralContainer>
      <Header>
        <BackButton onClick={() => goBack()}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>New Loan Referral</Title>
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <h2>Customer Information</h2>
          <InputGroup>
            <label>Full Name</label>
            <Input
              {...register('customerName', { required: true })}
              placeholder="Enter customer's full name"
            />
            {errors.customerName && (
              <ErrorMessage>Customer name is required</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label>Email Address</label>
            <Input
              type="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Enter customer's email"
            />
            {errors.email && (
              <ErrorMessage>Valid email is required</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label>Phone Number</label>
            <Input
              type="tel"
              {...register('phone', { required: true })}
              placeholder="Enter customer's phone number"
            />
            {errors.phone && (
              <ErrorMessage>Phone number is required</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label>Address</label>
            <Input
              {...register('address', { required: true })}
              placeholder="Enter customer's address"
            />
            {errors.address && (
              <ErrorMessage>Address is required</ErrorMessage>
            )}
          </InputGroup>
        </FormSection>

        <FormSection>
          <h2>Loan Details</h2>
          <InputGroup>
            <label>Loan Amount</label>
            <Input
              type="number"
              {...register('loanAmount', { required: true })}
              placeholder="Enter required loan amount"
            />
            {errors.loanAmount && (
              <ErrorMessage>Loan amount is required</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label>Loan Type</label>
            <Select {...register('loanType', { required: true })}>
              <option value="">Select loan type</option>
              <option value="personal">Personal Loan</option>
              <option value="business">Business Loan</option>
              <option value="home">Home Loan</option>
            </Select>
            {errors.loanType && (
              <ErrorMessage>Loan type is required</ErrorMessage>
            )}
          </InputGroup>
        </FormSection>

        <FormSection>
          <h2>Required Documents</h2>
          <DocumentUpload>
            <input
              type="file"
              multiple
              {...register('documents', { required: true })}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <Upload size={48} className="icon" />
            <p>Drag and drop files here or click to browse</p>
            <span className="supported-formats">
              Supported formats: PDF, JPEG, PNG
            </span>
          </DocumentUpload>
          {errors.documents && (
            <ErrorMessage>Required documents are missing</ErrorMessage>
          )}
        </FormSection>

        <Button type="submit" fullWidth>
          Submit Referral
        </Button>
      </Form>
    </ReferralContainer>
  );
};

export default ReferralScreen;