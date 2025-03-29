import React from 'react';
import styled from 'styled-components';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const SliderTrack = styled.div`
  width: 100%;
  height: 4px;
  background: #E2E8F0;
  border-radius: 2px;
  position: relative;
`;

const SliderFill = styled.div<{ fillPercentage: number }>`
  position: absolute;
  height: 100%;
  background: #3B82F6;
  border-radius: 2px;
  width: ${props => props.fillPercentage}%;
`;

const SliderThumb = styled.div<{ position: number }>`
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #3B82F6;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${props => props.position}%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
  }
  
  &:active {
    box-shadow: 0 0 0 12px rgba(59, 130, 246, 0.2);
  }
`;

const SliderContainer = styled.div`
  position: relative;
  padding: 1rem 0;
  touch-action: none;
`;

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onChange
}) => {
  const trackRef = React.useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const newValue = Math.round((percentage * (max - min) / 100 + min) / step) * step;
    onChange(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX);

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <SliderContainer>
      <SliderTrack ref={trackRef} onMouseDown={handleMouseDown}>
        <SliderFill fillPercentage={percentage} />
        <SliderThumb position={percentage} />
      </SliderTrack>
    </SliderContainer>
  );
}; 