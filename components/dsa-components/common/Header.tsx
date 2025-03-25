import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { DollarSign, User, LogOut, Bell, ChevronDown , ArrowLeft } from 'lucide-react';
import { Button } from './Button';
// import { useAuth } from '../../contexts/AuthContext';

const HeaderContainer = styled.header`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  font-size: 1.5rem;
  color: #60A5FA;
  cursor: pointer;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NotificationButton = styled.button`
  position: relative;
  color: #1E293B;
  padding: 0.25rem;
  border-radius: 0.5rem;
  background: transparent;
  
  &:hover {
    background-color: #F8FAFC;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: #60A5FA;
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 9999px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: #1E293B;
  background-color: ${({ isOpen }) => isOpen ? '#F8FAFC' : 'transparent'};
  
  &:hover {
    background-color: #F8FAFC;
  }

  .chevron {
    transition: transform 0.2s ease;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background-color: #60A5FA;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const BackButton = styled.button`
  color: #1E293B;
  display: flex;
  align-items: center;
  background: transparent;
`;


const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  overflow: hidden;
  border: 1px solid #E2E8F0;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  color: #1E293B;
  background: transparent;
  
  &:hover {
    background-color: #F8FAFC;
  }

  &.logout {
    color: #DC2626;
    border-top: 1px solid #E2E8F0;
  }
`;

interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const userData = {
    logout: () => {
      console.log("dummy logout");
    },
    user: {
      name: "John Smith",
    },
  };
  
  const { user, logout } = userData;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/dsa/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push('/dsa-auth');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => router.push(isLoggedIn ? '/dsa-dashboard' : '/')}>
        {/* <DollarSign size={24} />
        InstantLoan */}
         <BackButton onClick={() => goBack()}>
          <ArrowLeft size={24} />
        </BackButton>
      </Logo>
      <HeaderButtons>
        {isLoggedIn ? (
          <>
            <NotificationButton onClick={() => router.push('/notifications')}>
              <Bell size={20} />
              <NotificationBadge>3</NotificationBadge>
            </NotificationButton>
            <div ref={dropdownRef}>
              <UserButton
                isOpen={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <UserAvatar>
                  <User size={20} />
                </UserAvatar>
                <span>{user?.name || 'User'}</span>
                <ChevronDown size={16} className="chevron" />
              </UserButton>
              {isDropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => router.push('/profile')}>
                    <User size={18} />
                    Profile
                  </DropdownItem>
                  <DropdownItem className="logout" onClick={handleLogout}>
                    <LogOut size={18} />
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              )}
            </div>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => router.push('/')}>
              For Borrowers
            </Button>
            <Button onClick={() => router.push('/splash')}>
              DSA Login
            </Button>
          </>
        )}
      </HeaderButtons>
    </HeaderContainer>
  );
};

export default Header;