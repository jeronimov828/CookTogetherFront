import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Cargando...' 
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg',
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <div className={`spinner-border text-primary ${sizeClasses[size]}`} role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      {message && <p className="mt-2 text-muted">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;

