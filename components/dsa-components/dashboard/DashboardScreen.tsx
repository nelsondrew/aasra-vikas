import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PlusCircle, TrendingUp, AlertCircle, Wallet } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../common/Button';
import Header from '../common/Header';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setHeaderText } from '../../../store/slices/commonSlice';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #FFFFFF;
  padding: 1.5rem;
  padding-top: 7rem;
 

  @media (min-width: 768px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  h3 {
    font-size: 24px !important;
  }

  h4 {
    font-size: 20px !important;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background-color: #F8FAFC;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 0.875rem;
    color: #64748B;
    margin-bottom: 0.5rem;
  }

  .amount {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1E293B;
    margin-bottom: 0.5rem;
  }

  .trend {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #059669;
    font-size: 0.875rem;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ActionCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #F8FAFC;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .icon {
    color: #60A5FA;
  }

  h3 {
    font-weight: 500;
    margin-bottom: 0.25rem;
    color: #1E293B;
  }

  p {
    font-size: 0.875rem;
    color: #64748B;
  }
`;

const RecentApplications = styled.div`
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1E293B;
  }
`;

const ApplicationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ApplicationCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #F8FAFC;
  border-radius: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .customer-info {
    h4 {
      font-weight: 500;
      margin-bottom: 0.25rem;
      color: #1E293B;
    }
    p {
      font-size: 0.875rem;
      color: #64748B;
    }
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #60A5FA;
    font-weight: 500;
  }
`;

const mockApplications = [
  {
    id: 1,
    customerName: 'John Doe',
    loanType: 'Personal Loan',
    loanAmount: '₹5,00,000',
    status: 'review',
    date: new Date(),
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    loanType: 'Business Loan',
    loanAmount: '₹10,00,000',
    status: 'approved',
    date: new Date(Date.now() - 86400000),
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    loanType: 'Home Loan',
    loanAmount: '₹50,00,000',
    status: 'pending',
    date: new Date(Date.now() - 172800000),
  },
];

const DashboardScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderText('Your Dashboard'));
  }, [dispatch]);

  return (
    <>
      <Header isLoggedIn />
      <DashboardContainer>
        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3>Total Earnings</h3>
            <div className="amount">₹1,25,000</div>
            <div className="trend">
              <TrendingUp size={16} />
              +12.5% this month
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Active Applications</h3>
            <div className="amount">24</div>
            <div className="trend">
              <TrendingUp size={16} />
              +8 new this week
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Success Rate</h3>
            <div className="amount">85%</div>
            <div className="trend">
              <TrendingUp size={16} />
              +5% improvement
            </div>
          </StatCard>
        </StatsGrid>

        <QuickActions>
          <ActionCard
            onClick={() => router.push('/referral')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusCircle size={24} className="icon" />
            <div>
              <h3>New Referral</h3>
              <p>Add a new loan application</p>
            </div>
          </ActionCard>

          <ActionCard
            onClick={() => router.push('/track')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AlertCircle size={24} className="icon" />
            <div>
              <h3>Track Applications</h3>
              <p>Monitor ongoing applications</p>
            </div>
          </ActionCard>

          <ActionCard
            onClick={() => router.push('/earnings')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Wallet size={24} className="icon" />
            <div>
              <h3>Withdraw Earnings</h3>
              <p>Transfer your commissions</p>
            </div>
          </ActionCard>
        </QuickActions>

        <RecentApplications>
          <h2>Recent Applications</h2>
          <ApplicationList>
            {mockApplications.map((application) => (
              <ApplicationCard key={application.id}>
                <div className="customer-info">
                  <h4>{application.customerName}</h4>
                  <p>
                    {application.loanAmount} • {format(application.date, 'dd MMM yyyy')}
                  </p>
                </div>
                <div className="status">
                  {application.status}
                </div>
              </ApplicationCard>
            ))}
          </ApplicationList>
          <Button
            variant="outline"
            fullWidth
            style={{ marginTop: '1rem' }}
            onClick={() => router.push('/applications')}
          >
            View All Applications
          </Button>
        </RecentApplications>
      </DashboardContainer>
    </>
  );
};

export default DashboardScreen;