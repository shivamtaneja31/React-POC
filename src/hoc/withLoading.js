import React, { useState } from 'react';

// Loading spinner component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  </div>
);

// HOC that adds loading functionality
const withLoading = (WrappedComponent, loadingMessage = 'Loading...') => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    const [error, setError] = useState(null);

    // Handle loading state
    if (isLoading) {
      return (
        <div>
          <LoadingSpinner />
          <p style={{ textAlign: 'center' }}>{loadingMessage}</p>
        </div>
      );
    }

    // Handle error state
    if (error) {
      return (
        <div className="error-message">
          <p>Error: {error.message}</p>
          <button onClick={() => setError(null)}>Retry</button>
        </div>
      );
    }

    // Wrap the component with error handling
    try {
      return <WrappedComponent {...props} setError={setError} />;
    } catch (err) {
      setError(err);
      return null;
    }
  };
};

export default withLoading;
