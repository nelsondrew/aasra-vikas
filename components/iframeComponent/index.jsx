import React from 'react';

const IframeComponent = () => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://loan-app-ten-roan.vercel.app/"
        title="Mobile loan app"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
        }}
      />
    </div>
  );
};

export default IframeComponent;
