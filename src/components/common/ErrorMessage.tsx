import React from 'react';

const errorStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: '#fff0f0',
  border: '1px solid var(--color-error)',
  color: 'var(--color-error)',
  borderRadius: 'var(--radius-md)',
  textAlign: 'center',
  margin: '20px 0',
};

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div style={errorStyle} role="alert">
    <strong>Error:</strong> {message}
  </div>
);