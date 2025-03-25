import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size = 'md' }) =>
    size === 'sm'
      ? '0.25rem 0.5rem'
      : size === 'md'
      ? '0.5rem 1rem'
      : '1rem 1.5rem'};
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  font-size: 1rem;

  ${({ variant = 'primary' }) =>
    variant === 'primary'
      ? `
    background: linear-gradient(135deg, #60A5FA, #93C5FD);
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
    }
    &:active {
      transform: translateY(0);
    }
  `
      : variant === 'secondary'
      ? `
    background-color: #93C5FD;
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
    }
    &:active {
      transform: translateY(0);
    }
  `
      : `
    border: 2px solid #E2E8F0;
    color: #1E293B;
    background: transparent;
    &:hover {
      background-color: #F8FAFC;
      border-color: #60A5FA;
    }
  `}
`;
