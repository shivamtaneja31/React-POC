import React from 'react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme, styles } = useTheme();
  const currentStyles = styles[theme];

  const sections = [
    {
      title: 'Project Overview',
      content: `This React demo project is designed to showcase various important React concepts, patterns, and best practices. 
      It serves as a learning resource for developers looking to understand how different React features work together in a real application.`
    },
    {
      title: 'Key Features',
      content: [
        'Hooks (useState, useEffect, custom hooks)',
        'Context API for global state management',
        'Error Boundaries for graceful error handling',
        'Higher Order Components (HOC) pattern',
        'Render Props pattern',
        'Code Splitting & Lazy Loading',
        'Form handling and validation',
        'Theme switching functionality',
        'Data fetching patterns'
      ]
    },
    {
      title: 'Learning Objectives',
      content: [
        'Understanding React component patterns',
        'Implementing state management solutions',
        'Handling side effects in React',
        'Building reusable and composable components',
        'Managing application-wide themes',
        'Implementing proper error handling',
        'Optimizing React applications',
        'Working with forms and user input'
      ]
    },
    {
      title: 'Technologies Used',
      content: [
        'React 18',
        'React Router for navigation',
        'Context API for state management',
        'CSS-in-JS for styling',
        'React.lazy and Suspense for code splitting'
      ]
    }
  ];

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: currentStyles.background,
      color: currentStyles.text,
      minHeight: 'calc(100vh - 80px)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem', color: currentStyles.primary }}>
          About This Demo
        </h1>

        {sections.map((section, index) => (
          <section 
            key={index}
            style={{ 
              marginBottom: '3rem',
              padding: '2rem',
              backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h2 style={{ 
              color: currentStyles.primary,
              marginBottom: '1rem'
            }}>
              {section.title}
            </h2>
            
            {Array.isArray(section.content) ? (
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {section.content.map((item, i) => (
                  <li 
                    key={i}
                    style={{ 
                      marginBottom: '0.5rem',
                      paddingLeft: '1.5rem',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: currentStyles.primary
                    }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ 
                lineHeight: '1.6',
                margin: 0
              }}>
                {section.content}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default About;
