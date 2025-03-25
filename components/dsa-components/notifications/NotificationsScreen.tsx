import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Clock, Wallet } from 'lucide-react';
import { format } from 'date-fns';

const NotificationsContainer = styled.div`
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
  margin-top: 0 !important;
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface NotificationCardProps {
  type: 'success' | 'warning' | 'info' | 'earnings';
}

const NotificationCard = styled(motion.div) <NotificationCardProps>`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #F8FAFC;
  border-radius: 1rem;
  border-left: 4px solid ${({ type }) => {
    switch (type) {
      case 'success':
        return '#059669';
      case 'warning':
        return '#D97706';
      case 'earnings':
        return '#60A5FA';
      default:
        return '#64748B';
    }
  }};

  .icon {
    color: ${({ type }) => {
    switch (type) {
      case 'success':
        return '#059669';
      case 'warning':
        return '#D97706';
      case 'earnings':
        return '#60A5FA';
      default:
        return '#64748B';
    }
  }};
  }

  .content {
    flex: 1;

    h3 {
      font-weight: 500;
      margin-bottom: 0.25rem;
      color: #1E293B;
      font-size: x-large !important;
    }

    p {
      font-size: 0.875rem;
      color: #64748B;
      margin-bottom: 0.5rem;
    }

    .timestamp {
      font-size: 0.75rem;
      color: #64748B;
    }
  }
`;

const DateDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #E2E8F0;
  }

  span {
    font-size: 0.875rem;
    color: #64748B;
    white-space: nowrap;
  }
`;

const IconContainer = styled.div`
 margin-top: 3px;
`

const mockNotifications = [
  {
    id: 1,
    type: 'success' as const,
    title: 'Loan Application Approved',
    message: 'John Doe\'s personal loan application has been approved.',
    date: new Date(),
    icon: CheckCircle,
  },
  {
    id: 2,
    type: 'earnings' as const,
    title: 'Commission Received',
    message: 'You have received ₹15,000 commission for Jane Smith\'s loan approval.',
    date: new Date(Date.now() - 86400000),
    icon: Wallet,
  },
  {
    id: 3,
    type: 'warning' as const,
    title: 'Document Update Required',
    message: 'Additional documents required for Mike Johnson\'s loan application.',
    date: new Date(Date.now() - 86400000),
    icon: AlertCircle,
  },
  {
    id: 4,
    type: 'info' as const,
    title: 'Application Under Review',
    message: 'Sarah Williams\'s loan application is being reviewed by the team.',
    date: new Date(Date.now() - 172800000),
    icon: Clock,
  },
];

const NotificationIcon: React.FC<{ type: string; size: number; className: string }> = ({ type, size, className }) => {
  switch (type) {
    case 'success':
      return <CheckCircle size={size} className={className} />;
    case 'warning':
      return <AlertCircle size={size} className={className} />;
    case 'earnings':
      return <Wallet size={size} className={className} />;
    case 'info':
      return <Clock size={size} className={className} />;
    default:
      return <Bell size={size} className={className} />;
  }
};

const NotificationsScreen: React.FC = () => {
  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const groupNotificationsByDate = () => {
    const groups: { [key: string]: typeof mockNotifications } = {};

    mockNotifications.forEach(notification => {
      const dateKey = format(notification.date, 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(notification);
    });

    return groups;
  };

  const notificationGroups = groupNotificationsByDate();

  return (
    <NotificationsContainer>
      <Header>
        <BackButton onClick={goBack}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>Notifications</Title>
      </Header>

      <NotificationsList>
        {Object.entries(notificationGroups).map(([dateKey, notifications], groupIndex) => (
          <React.Fragment key={dateKey}>
            <DateDivider>
              <span>
                {format(new Date(dateKey), 'dd MMMM yyyy')}
              </span>
            </DateDivider>
            {notifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                type={notification.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (groupIndex * notifications.length + index) * 0.1 }}
              >
                <IconContainer>
                  <NotificationIcon
                    type={notification.type}
                    size={24}
                    className="icon"
                  />
                </IconContainer>

                <div className="content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <div className="timestamp">
                    {format(notification.date, 'hh:mm a')}
                  </div>
                </div>
              </NotificationCard>
            ))}
          </React.Fragment>
        ))}
      </NotificationsList>
    </NotificationsContainer>
  );
};

export default NotificationsScreen;