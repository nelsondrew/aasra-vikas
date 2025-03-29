import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Loader } from './Loader';

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName?: string;
  fileType?: string;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
`;

const ViewerContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #1E293B;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  color: #64748B;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #F1F5F9;
    color: #1E293B;
  }

  &:active {
    background: #E2E8F0;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 300px;
  background: #F8FAFC;
`;

const ImageContainer = styled.div<{ scale: number; rotation: number }>`
  position: relative;
  transition: transform 0.3s ease;
  transform: scale(${props => props.scale}) rotate(${props => props.rotation}deg);
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  opacity: ${props => props.loading ? 0 : 1};
  transition: opacity 0.3s ease;
`;

const FileViewer: React.FC<FileViewerProps> = ({
  isOpen,
  onClose,
  fileUrl,
  fileName = 'File Preview',
  fileType
}) => {
  const [scale, setScale] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };

  const handleDownload = () => {
    window.open(fileUrl, '_blank');
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    // Optionally handle error state here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ViewerContainer
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <Header>
              <Title>{fileName}</Title>
              <Controls>
                <IconButton onClick={handleZoomOut} title="Zoom Out">
                  <ZoomOut size={20} />
                </IconButton>
                <IconButton onClick={handleZoomIn} title="Zoom In">
                  <ZoomIn size={20} />
                </IconButton>
                <IconButton onClick={handleRotate} title="Rotate">
                  <RotateCcw size={20} />
                </IconButton>
                <IconButton onClick={handleReset} title="Reset">
                  <RotateCcw size={20} />
                </IconButton>
                <IconButton onClick={handleDownload} title="Download">
                  <Download size={20} />
                </IconButton>
                <IconButton onClick={onClose} title="Close">
                  <X size={20} />
                </IconButton>
              </Controls>
            </Header>
            <Content>
              <ImageContainer scale={scale} rotation={rotation}>
                <ImageWrapper>
                  {isLoading && (
                    <LoaderContainer>
                      <Loader size={40} color="#60A5FA" />
                    </LoaderContainer>
                  )}
                  <StyledImage 
                    src={fileUrl} 
                    alt={fileName}
                    loading="lazy"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ opacity: isLoading ? 0 : 1 }}
                  />
                </ImageWrapper>
              </ImageContainer>
            </Content>
          </ViewerContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default FileViewer; 