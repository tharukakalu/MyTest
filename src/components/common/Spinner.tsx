import React from 'react';

// Simple CSS spinner
const spinnerStyle: React.CSSProperties = {
  border: '4px solid var(--color-border)',
  borderTop: '4px solid var(--color-primary-blue)',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
  margin: '48px auto',
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Spinner: React.FC = () => (
  <>
    <style>{keyframes}</style>
    <div style={spinnerStyle} aria-label="Loading content"></div>
  </>
);