import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div<{ size?: number; color?: string }>`
  width: ${props => props.size || 24}px;
  height: ${props => props.size || 24}px;
  border: 2px solid ${props => props.color || '#60A5FA'};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

interface LoaderProps {
  size?: number;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size, color }) => {
  return <LoaderContainer size={size} color={color} />;
}; 