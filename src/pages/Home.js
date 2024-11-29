import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme, styles } = useTheme();
  const currentStyles = styles[theme];

  const features = [
    {
      title: 'Form Handling with Hooks',
      path: '/user-form',
      description: 'Demonstrates form handling using useState and useEffect hooks, with form validation and error handling.'
    },
    {
      title: 'Custom Hooks',
      path: '/user-form',
      description: 'Shows how to create and use custom hooks (useLocalStorage) for persistent state management.'
    },
    {
      title: 'Context API',
      path: '/',
      description: 'Theme switching using React Context API for global state management (try the theme toggle in the header!).'
    },
    {
      title: 'Error Boundaries',
      path: '/',
      description: 'Graceful error handling with React Error Boundaries, protecting the app from crashes.'
    },
    {
      title: 'Higher Order Components (HOC)',
      path: '/data-fetcher',
      description: 'Demonstrates HOC pattern with withLoading and withTheme components for shared functionality.'
    },
    {
      title: 'Render Props Pattern',
      path: '/data-fetcher',
      description: 'Shows the render props pattern with DataFetcher component for flexible data fetching.'
    },
    {
      title: 'Code Splitting & Lazy Loading',
      path: '/',
      description: 'Implements React.lazy and Suspense for optimized page loading.'
    }
  ];

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: currentStyles.background,
      color: currentStyles.text,
      minHeight: 'calc(100vh - 80px)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>React Features Demo</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
          This demo application showcases various important React concepts and patterns.
          Explore each feature to learn more about React best practices and patterns.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.path}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                padding: '1.5rem',
                backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                height: '100%',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }
              }}>
                <h2 style={{ 
                  color: currentStyles.primary,
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h2>
                <p style={{ 
                  color: currentStyles.text,
                  lineHeight: '1.5'
                }}>
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
