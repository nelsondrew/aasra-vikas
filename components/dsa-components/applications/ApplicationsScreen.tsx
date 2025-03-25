import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const ApplicationsContainer = styled.div`
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

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;

  input {
    width: 100%;
    padding: 1rem;
    padding-left: 2.5rem;
    border: 1px solid #E2E8F0;
    border-radius: 0.5rem;
    background-color: #F8FAFC;
    color: #1E293B;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748B;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  background-color: #F8FAFC;
  color: #1E293B;
`;

const StatusTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
    border-radius: 9999px;
  }

  &::-webkit-scrollbar-thumb {
    background: #E2E8F0;
    border-radius: 9999px;
  }
`;

interface StatusTabProps {
  active?: boolean;
}

const StatusTab = styled.button<StatusTabProps>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: ${({ active }) => active ? '#60A5FA' : '#F8FAFC'};
  color: ${({ active }) => active ? 'white' : '#64748B'};
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ active }) => active ? '#60A5FA' : '#E2E8F0'};
  }
`;

const ApplicationsList = styled.div`
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
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-weight: 500;
      color: #1E293B;
    }
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    
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

  .details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;

    .detail-item {
      h4 {
        font-size: 0.875rem;
        color: #64748B;
        margin-bottom: 0.25rem;
      }
      p {
        color: #1E293B;
        font-weight: 500;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #E2E8F0;

    .date {
      font-size: 0.875rem;
      color: #64748B;
    }

    .view-details {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #60A5FA;
      font-weight: 500;
      background: transparent;
    }
  }
`;

const mockApplications = [
  {
    id: 1,
    customerName: 'John Doe',
    loanType: 'Personal Loan',
    loanAmount: '₹5,00,000',
    status: 'review' as const,
    date: new Date(),
    applicationId: 'APP001',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    loanType: 'Business Loan',
    loanAmount: '₹10,00,000',
    status: 'approved' as const,
    date: new Date(Date.now() - 86400000),
    applicationId: 'APP002',
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    loanType: 'Home Loan',
    loanAmount: '₹50,00,000',
    status: 'pending' as const,
    date: new Date(Date.now() - 172800000),
    applicationId: 'APP003',
  },
  {
    id: 4,
    customerName: 'Sarah Williams',
    loanType: 'Personal Loan',
    loanAmount: '₹3,00,000',
    status: 'rejected' as const,
    date: new Date(Date.now() - 259200000),
    applicationId: 'APP004',
  },
];

const ApplicationsScreen: React.FC = () => {
  const [activeStatus, setActiveStatus] = React.useState('all');

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <ApplicationsContainer>
      <Header>
        <BackButton onClick={() => goBack()}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>Loan Applications</Title>
      </Header>

      <SearchBar>
        <SearchInput>
          <Search size={20} className="search-icon" />
          <input type="text" placeholder="Search by name or application ID" />
        </SearchInput>
        <FilterButton>
          <Filter size={20} />
          Filter
        </FilterButton>
      </SearchBar>

      <StatusTabs>
        <StatusTab
          active={activeStatus === 'all'}
          onClick={() => setActiveStatus('all')}
        >
          All Applications
        </StatusTab>
        <StatusTab
          active={activeStatus === 'pending'}
          onClick={() => setActiveStatus('pending')}
        >
          Pending
        </StatusTab>
        <StatusTab
          active={activeStatus === 'review'}
          onClick={() => setActiveStatus('review')}
        >
          Under Review
        </StatusTab>
        <StatusTab
          active={activeStatus === 'approved'}
          onClick={() => setActiveStatus('approved')}
        >
          Approved
        </StatusTab>
        <StatusTab
          active={activeStatus === 'rejected'}
          onClick={() => setActiveStatus('rejected')}
        >
          Rejected
        </StatusTab>
      </StatusTabs>

      <ApplicationsList>
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
                {application.status === 'review'
                  ? 'Under Review'
                  : application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
              </div>
            </div>
            <div className="details">
              <div className="detail-item">
                <h4>Application ID</h4>
                <p>{application.applicationId}</p>
              </div>
              <div className="detail-item">
                <h4>Loan Type</h4>
                <p>{application.loanType}</p>
              </div>
              <div className="detail-item">
                <h4>Loan Amount</h4>
                <p>{application.loanAmount}</p>
              </div>
            </div>
            <div className="footer">
              <span className="date">
                {format(application.date, 'dd MMM yyyy')}
              </span>
              <button className="view-details">
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          </ApplicationCard>
        ))}
      </ApplicationsList>
    </ApplicationsContainer>
  );
};

export default ApplicationsScreen;