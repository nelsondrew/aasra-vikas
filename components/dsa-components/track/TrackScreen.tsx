import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import  Header  from '../common/Header';
import { useRouter } from 'next/router';

const TrackContainer = styled.div`
  min-height: 100vh;
  background-color: #FFFFFF;
  padding: 1rem;
  padding-top: 5rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const BackButton = styled.button`
  color: #1E293B;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1E293B;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;

  input {
    width: 100%;
    padding: 0.5rem 1rem;
    padding-left: 2.5rem;
    border: 1px solid #E2E8F0;
    border-radius: 0.5rem;
    background-color: #F8FAFC;
    color: #1E293B;
    font-size: 0.875rem;

    @media (min-width: 768px) {
      padding: 1rem;
      padding-left: 2.5rem;
      font-size: 1rem;
    }
  }

  .search-icon {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748B;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  background-color: #F8FAFC;
  color: #1E293B;
  font-size: 0.875rem;
  white-space: nowrap;

  @media (min-width: 768px) {
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
`;

const ApplicationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ApplicationCardProps {
  status: 'pending' | 'approved' | 'rejected' | 'review';
}

const ApplicationCard = styled(motion.div)<ApplicationCardProps>`
  background-color: #F8FAFC;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 1rem;
      font-weight: 500;
      color: #1E293B;

      @media (min-width: 768px) {
        font-size: 1.125rem;
      }
    }
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
    
    ${({ status }) => {
      switch (status) {
        case 'approved':
          return `
            background-color: rgba(5, 150, 105, 0.15);
            color: #059669;
          `;
        case 'rejected':
          return `
            background-color: rgba(220, 38, 38, 0.15);
            color: #DC2626;
          `;
        case 'review':
          return `
            background-color: rgba(217, 119, 6, 0.15);
            color: #D97706;
          `;
        default:
          return `
            background-color: rgba(100, 116, 139, 0.15);
            color: #64748B;
          `;
      }
    }}
  }

  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
  }

  .info-group {
    h4 {
      font-size: 0.75rem;
      color: #64748B;
      margin-bottom: 0.25rem;

      @media (min-width: 768px) {
        font-size: 0.875rem;
      }
    }
    p {
      font-size: 0.875rem;
      color: #1E293B;
      font-weight: 500;

      @media (min-width: 768px) {
        font-size: 1rem;
      }
    }
  }

  .timeline {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #E2E8F0;

    h4 {
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 1rem;
      color: #1E293B;

      @media (min-width: 768px) {
        font-size: 1rem;
      }
    }
  }

  .steps {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 1rem;
    padding: 0 0.25rem;

    &::before {
      content: '';
      position: absolute;
      top: 15px;
      left: 20px;
      right: 20px;
      height: 2px;
      background-color: #E2E8F0;
      z-index: 0;
    }
  }

  .step {
    position: relative;
    z-index: 1;
    background: #F8FAFC;
    padding: 0 0.25rem;
    text-align: center;
    min-width: 60px;

    @media (min-width: 768px) {
      min-width: 80px;
      padding: 0 0.5rem;
    }

    .icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 0.25rem;
      background-color: #F8FAFC;
      border: 2px solid #E2E8F0;

      @media (min-width: 768px) {
        width: 32px;
        height: 32px;
      }

      &.completed {
        background-color: #059669;
        border-color: #059669;
        color: white;
      }

      &.current {
        background-color: #60A5FA;
        border-color: #60A5FA;
        color: white;
      }
    }

    .label {
      font-size: 0.625rem;
      color: #64748B;
      /* display: none; */

      @media (min-width: 768px) {
        display: block;
        font-size: 0.75rem;
      }
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #E2E8F0;

    .date {
      font-size: 0.75rem;
      color: #64748B;

      @media (min-width: 768px) {
        font-size: 0.875rem;
      }
    }

    .view-details {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #60A5FA;
      font-weight: 500;
      font-size: 0.875rem;

      @media (min-width: 768px) {
        font-size: 1rem;
      }
    }
  }
`;

const mockApplications = [
  {
    id: 1,
    customerName: 'John Doe',
    loanType: 'Personal Loan',
    loanAmount: '₹5,00,000',
    applicationId: 'LOAN2024001',
    status: 'review' as const,
    date: new Date(),
    currentStep: 2,
    steps: [
      { label: 'Submitted', completed: true },
      { label: 'Document Verification', completed: true },
      { label: 'Credit Assessment', completed: false },
      { label: 'Final Approval', completed: false },
      { label: 'Disbursement', completed: false },
    ],
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    loanType: 'Business Loan',
    loanAmount: '₹10,00,000',
    applicationId: 'LOAN2024002',
    status: 'pending' as const,
    date: new Date(Date.now() - 86400000),
    currentStep: 1,
    steps: [
      { label: 'Submitted', completed: true },
      { label: 'Document Verification', completed: false },
      { label: 'Credit Assessment', completed: false },
      { label: 'Final Approval', completed: false },
      { label: 'Disbursement', completed: false },
    ],
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    loanType: 'Home Loan',
    loanAmount: '₹50,00,000',
    applicationId: 'LOAN2024003',
    status: 'approved' as const,
    date: new Date(Date.now() - 172800000),
    currentStep: 5,
    steps: [
      { label: 'Submitted', completed: true },
      { label: 'Document Verification', completed: true },
      { label: 'Credit Assessment', completed: true },
      { label: 'Final Approval', completed: true },
      { label: 'Disbursement', completed: true },
    ],
  },
];

 const TrackScreen: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      case 'review':
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <>
      <Header isLoggedIn />
      <TrackContainer>
        <PageHeader>
          <BackButton onClick={() => router.push('/dashboard')}>
            <ArrowLeft size={24} />
          </BackButton>
          <Title>Track Applications</Title>
        </PageHeader>

        <SearchBar>
          <SearchInput>
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>
          <FilterButton>
            <Filter size={20} />
            Filter
          </FilterButton>
        </SearchBar>

        <ApplicationList>
          {mockApplications.map((application, index) => (
            <ApplicationCard
              key={application.id}
              status={application.status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="header">
                <h3>{application.customerName}</h3>
                <div className="status">
                  {getStatusIcon(application.status)}
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </div>
              </div>

              <div className="content">
                <div className="info-group">
                  <h4>Application ID</h4>
                  <p>{application.applicationId}</p>
                </div>
                <div className="info-group">
                  <h4>Loan Type</h4>
                  <p>{application.loanType}</p>
                </div>
                <div className="info-group">
                  <h4>Loan Amount</h4>
                  <p>{application.loanAmount}</p>
                </div>
              </div>

              <div className="timeline">
                <h4>Application Progress</h4>
                <div className="steps">
                  {application.steps.map((step, index) => (
                    <div key={index} className="step">
                      <div className={`icon ${
                        step.completed ? 'completed' : 
                        index === application.currentStep - 1 ? 'current' : ''
                      }`}>
                        {step.completed ? (
                          <CheckCircle size={16} />
                        ) : (
                          <Clock size={16} />
                        )}
                      </div>
                      <span className="label">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="actions">
                <span className="date">{format(application.date, 'dd MMM yyyy')}</span>
                <button className="view-details">
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </ApplicationCard>
          ))}
        </ApplicationList>
      </TrackContainer>
    </>
  );
};

export default TrackScreen;