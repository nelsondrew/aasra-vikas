import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, User, Mail, Phone, MapPin, Edit2, LogOut } from 'lucide-react';
import { Button } from '../common/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { useRouter } from 'next/router';
import { clearUser } from '../../../store/slices/userSlice';

const ProfileContainer = styled.div`
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
  margin-top: 0px !important;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfilePicture = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  border: 4px solid #60A5FA;

  .edit-button {
    position: absolute;
    bottom: 4px;
    right: 4px;
    background-color: #60A5FA;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 0.25rem;
`;

const ProfileRole = styled.p`
  color: #64748B;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  background-color: #F8FAFC;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    color: #1E293B;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #E2E8F0;

  &:last-child {
    border-bottom: none;
  }

  .icon {
    color: #60A5FA;
  }

  .label {
    font-size: 0.875rem;
    color: #64748B;
  }

  .value {
    margin-left: auto;
    color: #1E293B;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #FEE2E2;
  color: #DC2626;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  padding: 1rem;
  border: 1px solid #FCA5A5;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-top: 1rem;

  &:hover {
    background-color: #FEE2E2;
    border-color: #DC2626;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;


const LogoutSection = styled.div`
  margin-top: 2rem;
  padding: 0 0.5rem;
`;

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const goBack = () => {
    router.push('/dsa-dashboard');
  };

  const userData = useSelector((state: RootState) => state.user.user);
  const { email = "", firstName = "", lastName = "", id = '', phone = "" } = userData || {};


  const fullName = firstName && lastName ? `${firstName} ${lastName}` : 'User';

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/dsa/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear user data from Redux
        dispatch(clearUser());
        // Use window.location.href for redirect
        window.location.href = '/dsa-auth';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <ProfileContainer>
      <Header>
        <BackButton onClick={goBack}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>Profile</Title>
      </Header>

      <ProfileHeader>
        <ProfilePicture>
          <User size={48} />
          <div className="edit-button">
            <Edit2 size={16} />
          </div>
        </ProfilePicture>
        <ProfileName>{fullName}</ProfileName>
        <ProfileRole>Senior Loan Agent</ProfileRole>
        <Button variant="outline">Edit Profile</Button>
      </ProfileHeader>

      <Section>
        <h3>Personal Information</h3>
        <InfoItem>
          <Mail size={20} className="icon" />
          <span className="label">Email</span>
          <span className="value">{email}</span>
        </InfoItem>
        <InfoItem>
          <Phone size={20} className="icon" />
          <span className="label">Phone</span>
          <span className="value">{phone}</span>
        </InfoItem>
        <InfoItem>
          <MapPin size={20} className="icon" />
          <span className="label">Location</span>
          <span className="value">Mumbai, India</span>
        </InfoItem>
      </Section>

      <Section>
        <h3>Account Information</h3>
        <InfoItem>
          <span className="label">Agent ID</span>
          <span className="value">{id}</span>
        </InfoItem>
        <InfoItem>
          <span className="label">Member Since</span>
          <span className="value">January 2024</span>
        </InfoItem>
        <InfoItem>
          <span className="label">Status</span>
          <span className="value">Active</span>
        </InfoItem>
      </Section>

      <LogoutSection>
        <LogoutButton fullWidth onClick={handleLogout}>
          <LogOut size={20} />
          Sign Out
        </LogoutButton>
      </LogoutSection>
    </ProfileContainer>
  );
};

export default ProfileScreen;