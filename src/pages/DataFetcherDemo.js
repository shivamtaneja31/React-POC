import React from 'react';
import DataFetcher from '../components/DataFetcher';
import withLoading from '../hoc/withLoading';
import { useTheme } from '../context/ThemeContext';

const DataDisplay = ({ data }) => {
  const { theme, styles } = useTheme();
  const currentStyles = styles[theme];

  return (
    <div style={{ 
      backgroundColor: currentStyles.background, 
      color: currentStyles.text,
      padding: '20px'
    }}>
      <pre style={{ 
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#333',
        padding: '15px',
        borderRadius: '5px',
        overflow: 'auto'
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

// Wrap DataDisplay with loading HOC
const DataDisplayWithLoading = withLoading(DataDisplay);

const DataFetcherDemo = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Data Fetcher Demo</h1>
      <button 
        onClick={toggleTheme}
        style={{ marginBottom: '20px' }}
      >
        Toggle Theme (Current: {theme})
      </button>

      <div style={{ marginBottom: '30px' }}>
        <h2>Posts from JSONPlaceholder</h2>
        <DataFetcher
          url="https://jsonplaceholder.typicode.com/posts?_limit=5"
          render={({ data, loading, error, refetch }) => (
            <div>
              <DataDisplayWithLoading
                isLoading={loading}
                data={data}
              />
              {error && <div style={{ color: 'red' }}>Error: {error}</div>}
              <button 
                onClick={refetch}
                style={{ marginTop: '10px' }}
              >
                Refresh Data
              </button>
            </div>
          )}
        />
      </div>

      <div>
        <h2>Users from JSONPlaceholder</h2>
        <DataFetcher
          url="https://jsonplaceholder.typicode.com/users?_limit=3"
          render={({ data, loading, error, refetch }) => (
            <div>
              <DataDisplayWithLoading
                isLoading={loading}
                data={data}
              />
              {error && <div style={{ color: 'red' }}>Error: {error}</div>}
              <button 
                onClick={refetch}
                style={{ marginTop: '10px' }}
              >
                Refresh Data
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default DataFetcherDemo;
