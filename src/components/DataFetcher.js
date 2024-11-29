import React, { useState, useEffect, useCallback } from 'react';

const DataFetcher = ({ 
  url, 
  render, 
  initialData = null, 
  pollInterval = null,
  options = {} 
}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();

    // Set up polling if pollInterval is provided
    if (pollInterval) {
      const intervalId = setInterval(fetchData, pollInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, pollInterval]); // Include all dependencies

  // Expose refetch method to manually trigger data fetching
  const refetch = () => {
    fetchData();
  };

  // Expose method to update data locally
  const updateData = (updater) => {
    setData(typeof updater === 'function' ? updater(data) : updater);
  };

  return render({
    data,
    loading,
    error,
    refetch,
    updateData
  });
};

// Example usage:
/*
<DataFetcher
  url="https://api.example.com/data"
  pollInterval={5000} // Optional: poll every 5 seconds
  render={({ data, loading, error, refetch, updateData }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button onClick={refetch}>Refresh</button>
      </div>
    );
  }}
/>
*/

// Helper HOC to convert render props to HOC pattern
export const withData = (url, options) => (WrappedComponent) => {
  return function WithDataComponent(props) {
    return (
      <DataFetcher
        url={url}
        options={options}
        render={({ data, loading, error, refetch, updateData }) => (
          <WrappedComponent
            {...props}
            data={data}
            loading={loading}
            error={error}
            refetch={refetch}
            updateData={updateData}
          />
        )}
      />
    );
  };
};

export default DataFetcher;
