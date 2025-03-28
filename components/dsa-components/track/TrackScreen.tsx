import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {  Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import Header from '../common/Header';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderText } from '../../../store/slices/commonSlice';
import { RootState } from '../../../store/store';

interface LoanApplication {
  loanApplicationId: string;
  referralId: string;
  name: string;
  loanType: string;
  loanAmount: string;
  loanPurpose: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  mobileNumber: string;
  dob: string;
  aadhaarNumber: string;
  panNumber: string;
  employmentType: string;
  salary: string;
  currentLoans?: string;
  workEmail?: string;
  currentCity: string;
  officeAddress: string;
  personalAddress: string;
  stayingStatus: string;
}

const TrackContainer = styled.div`
margin-top: 5rem;
  min-height: 100vh;
  background-color: #FFFFFF;
  padding: 1rem;
  padding-top: 5rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
    padding-left: 7rem !important;
    padding-right: 7rem !important;
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

const LoadingContainer = styled.div`
  padding: 1rem;
`;

const SkeletonCard = styled(motion.div)`
  background: #F8FAFC;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .timeline {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #E2E8F0;
  }

  .steps {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 1rem 0;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F8FAFC;
    padding: 0 0.25rem;
    min-width: 60px;

    .icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.25rem;
      background-color: #F8FAFC;
      border: 2px solid #E2E8F0;
      color: #94A3B8;
    }

    .label {
      font-size: 0.625rem;
      color: #94A3B8;
      text-align: center;
    }
  }
`;

const SkeletonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SkeletonTitle = styled.div`
  height: 24px;
  width: 200px;
  background: linear-gradient(
    90deg,
    #E2E8F0 0%,
    #F1F5F9 50%,
    #E2E8F0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const SkeletonStatus = styled.div`
  height: 24px;
  width: 100px;
  background: linear-gradient(
    90deg,
    #E2E8F0 0%,
    #F1F5F9 50%,
    #E2E8F0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 999px;
`;

const SkeletonContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SkeletonField = styled.div`
  div:first-child {
    height: 16px;
    width: 80px;
    background: linear-gradient(
      90deg,
      #E2E8F0 0%,
      #F1F5F9 50%,
      #E2E8F0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  div:last-child {
    height: 20px;
    width: 120px;
    background: linear-gradient(
      90deg,
      #E2E8F0 0%,
      #F1F5F9 50%,
      #E2E8F0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
    border-radius: 4px;
  }
`;

const TrackScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const agentId = useSelector((state: RootState) => state.user.user?.agentID);
  const fetchedRef = useRef(false);

  useEffect(() => {
    dispatch(setHeaderText('Track Applications'));
  }, [dispatch]);

  useEffect(() => {
    if (agentId && !fetchedRef.current) {
      fetchedRef.current = true;
      fetchApplications();
    }
  }, [agentId]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/dsa/get-loan-applications?agentId=${agentId}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch applications');
      }

      setApplications(data.applications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Number(amount));
  };

  const handleViewDetails = (loanApplicationId: string) => {
    router.push(`/application-details?id=${loanApplicationId}`);
  };

  if (loading) {
    return (
      <>
        <Header isLoggedIn />
        <TrackContainer>
          <SearchBar>
            <SearchInput>
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or ID"
                disabled
              />
            </SearchInput>
            <FilterButton disabled>
              <Filter size={20} />
              Filter
            </FilterButton>
          </SearchBar>

          <LoadingContainer>
            {[1, 2, 3].map((index) => (
              <SkeletonCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SkeletonHeader>
                  <SkeletonTitle />
                  <SkeletonStatus />
                </SkeletonHeader>

                <SkeletonContent>
                  <SkeletonField>
                    <div />
                    <div />
                  </SkeletonField>
                  <SkeletonField>
                    <div />
                    <div />
                  </SkeletonField>
                  <SkeletonField>
                    <div />
                    <div />
                  </SkeletonField>
                </SkeletonContent>

                <div className="timeline">
                  <SkeletonTitle style={{ width: '140px', marginBottom: '1rem' }} />
                  <div className="steps">
                    {['Submitted', 'Document Verification', 'Credit Assessment', 'Final Approval', 'Disbursement'].map((step, index) => (
                      <div key={index} className="step">
                        <div className="icon">
                          <Clock size={16} />
                        </div>
                        <span className="label">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SkeletonCard>
            ))}
          </LoadingContainer>
        </TrackContainer>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header isLoggedIn />
        <TrackContainer>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#DC2626' }}>Error: {error}</div>
        </TrackContainer>
      </>
    );
  }

  return (
    <>
      <Header isLoggedIn />
      <TrackContainer>
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
          {applications.map((application, index) => (
            <ApplicationCard
              key={application.loanApplicationId}
              status={application.status as 'pending' | 'approved' | 'rejected' | 'review'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="header">
                <h3>{application.name}</h3>
                <div className="status">
                  {getStatusIcon(application.status)}
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </div>
              </div>

              <div className="content">
                <div className="info-group">
                  <h4>Application ID</h4>
                  <p>{application.loanApplicationId}</p>
                </div>
                <div className="info-group">
                  <h4>Loan Type</h4>
                  <p>{application.loanType.charAt(0).toUpperCase() + application.loanType.slice(1)} Loan</p>
                </div>
                <div className="info-group">
                  <h4>Loan Amount</h4>
                  <p>{formatAmount(application.loanAmount)}</p>
                </div>
              </div>

              <div className="timeline">
                <h4>Application Progress</h4>
                <div className="steps">
                  {['Submitted', 'Document Verification', 'Credit Assessment', 'Final Approval', 'Disbursement'].map((step, index) => (
                    <div key={index} className="step">
                      <div className={`icon ${index === 0 ? 'completed' : ''}`}>
                        {index === 0 ? <CheckCircle size={16} /> : <Clock size={16} />}
                      </div>
                      <span className="label">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="actions">
                <span className="date">{format(new Date(application.createdAt), 'dd MMM yyyy')}</span>
                <button 
                  className="view-details"
                  onClick={() => handleViewDetails(application.loanApplicationId)}
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </ApplicationCard>
          ))}

          {applications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
              No applications found
            </div>
          )}
        </ApplicationList>
      </TrackContainer>
    </>
  );
};

export default TrackScreen;