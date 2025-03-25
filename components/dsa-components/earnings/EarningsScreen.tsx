import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, Wallet, TrendingUp, Download, ChevronRight, Ban as Bank } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../common/Button';

const EarningsContainer = styled.div`
  min-height: 100vh;
  background-color: #FFFFFF;
  padding: 2rem;

  h2 {
    font-size: x-large !important;
  }
  
  h3 {
    font-size: larger !important;
  }

  h4 {
    font-size: large !important;
  }
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
  margin-top: 0;
`;

const EarningsOverview = styled.div`
  background-color: #60A5FA;
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
`;

const TotalEarnings = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 0.875rem;
    opacity: 0.9;
    margin-bottom: 0.5rem;
    color: white;
  }

  .amount {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .trend {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    opacity: 0.9;
  }
`;

const EarningsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const EarningsCard = styled.div`
  background-color: #F8FAFC;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;

  h3 {
    font-size: 0.875rem;
    color: #64748B;
    margin-bottom: 0.5rem;
  }

  .amount {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1E293B;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1E293B;
  }
`;

const WithdrawCard = styled.div`
  background-color: #F8FAFC;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h3 {
      font-weight: 500;
      color: #1E293B;
    }
  }

  .bank-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #FFFFFF;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;

    .icon {
      color: #60A5FA;
    }

    .details {
      h4 {
        font-weight: 500;
        margin-bottom: 0.25rem;
      }
      p {
        font-size: 0.875rem;
        color: #64748B;
      }
    }
  }
`;

const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TransactionCard = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #F8FAFC;
  border-radius: 1rem;

  .transaction-info {
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

  .amount {
    text-align: right;
    
    .value {
      font-weight: 600;
      color: #059669;
      margin-bottom: 0.25rem;
    }
    
    .date {
      font-size: 0.875rem;
      color: #64748B;
    }
  }
`;

const mockTransactions = [
  {
    id: 1,
    customerName: 'John Doe',
    loanType: 'Personal Loan',
    amount: '₹15,000',
    date: new Date(),
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    loanType: 'Business Loan',
    amount: '₹25,000',
    date: new Date(Date.now() - 86400000),
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    loanType: 'Home Loan',
    amount: '₹50,000',
    date: new Date(Date.now() - 172800000),
  },
];

const EarningsScreen: React.FC = () => {

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <EarningsContainer>
      <Header>
        <BackButton onClick={() => goBack()}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>My Earnings</Title>
      </Header>

      <EarningsOverview>
        <TotalEarnings>
          <h2>Total Earnings</h2>
          <div className="amount">₹1,25,000</div>
          <div className="trend">
            <TrendingUp size={16} />
            +12.5% from last month
          </div>
        </TotalEarnings>

        <EarningsGrid>
          <EarningsCard>
            <h3>This Month</h3>
            <div className="amount">₹45,000</div>
          </EarningsCard>
          <EarningsCard>
            <h3>Pending</h3>
            <div className="amount">₹15,000</div>
          </EarningsCard>
          <EarningsCard>
            <h3>Available</h3>
            <div className="amount">₹30,000</div>
          </EarningsCard>
        </EarningsGrid>
      </EarningsOverview>

      <Section>
        <h2>Withdraw Earnings</h2>
        <WithdrawCard>
          <div className="header">
            <h3>Available to withdraw</h3>
            <span className="amount">₹30,000</span>
          </div>
          <div className="bank-info">
            <Bank size={24} className="icon" />
            <div className="details">
              <h4>HDFC Bank</h4>
              <p>Account ending in 1234</p>
            </div>
          </div>
          <Button fullWidth>Withdraw to Bank Account</Button>
        </WithdrawCard>
      </Section>

      <Section>
        <h2>Recent Transactions</h2>
        <TransactionsList>
          {mockTransactions.map((transaction, index) => (
            <TransactionCard
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="transaction-info">
                <h4>{transaction.customerName}</h4>
                <p>{transaction.loanType}</p>
              </div>
              <div className="amount">
                <div className="value">{transaction.amount}</div>
                <div className="date">{format(transaction.date, 'dd MMM yyyy')}</div>
              </div>
            </TransactionCard>
          ))}
        </TransactionsList>
      </Section>
    </EarningsContainer>
  );
};

export default EarningsScreen;