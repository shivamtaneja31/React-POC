import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    styles: {
      light: {
        background: '#ffffff',
        text: '#000000',
        primary: '#007bff',
        secondary: '#6c757d'
      },
      dark: {
        background: '#222222',
        text: '#ffffff',
        primary: '#0056b3',
        secondary: '#545b62'
      }
    }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// HOC to wrap components that need theme
export const withTheme = (WrappedComponent) => {
  return function WithThemeComponent(props) {
    const theme = useTheme();
    return <WrappedComponent {...props} theme={theme} />;
  };
};
