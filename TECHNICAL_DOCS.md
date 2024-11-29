# Technical Documentation - React Features Demo

## Implementation Details

### 1. Theme Context Implementation

```jsx
// ThemeContext.js
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const value = {
    theme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light'),
    styles: {
      light: { /* light theme styles */ },
      dark: { /* dark theme styles */ }
    }
  };
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Usage in components
const MyComponent = () => {
  const { theme, toggleTheme, styles } = useTheme();
  // Access theme state and functions
};
```

### 2. Custom Hook Pattern

```jsx
// useLocalStorage.js
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Usage example:
  // const [userData, setUserData] = useLocalStorage('user', { name: '' });
};
```

### 3. Higher Order Component (HOC) Pattern

```jsx
// withLoading.js
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <LoadingSpinner />;
    return <WrappedComponent {...props} />;
  };
};

// Usage:
const MyComponentWithLoading = withLoading(MyComponent);
<MyComponentWithLoading isLoading={true} />;
```

### 4. Render Props Pattern

```jsx
// DataFetcher.js
const DataFetcher = ({ url, render }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch logic here
  
  return render({ data, loading, error, refetch });
};

// Usage:
<DataFetcher
  url="/api/data"
  render={({ data, loading }) => (
    loading ? <LoadingSpinner /> : <DisplayData data={data} />
  )}
/>;
```

### 5. Error Boundary Implementation

```jsx
// ErrorBoundary.js
class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error to service
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Component Communication Patterns

### 1. Parent-Child Communication

```jsx
// Parent component passes props down
<UserForm onSubmit={handleSubmit} initialData={data} />

// Child component receives props
const UserForm = ({ onSubmit, initialData }) => {
  // Use props here
};
```

### 2. Context-Based Communication

```jsx
// Provider at app level
<ThemeProvider>
  <App />
</ThemeProvider>

// Consumer components use useTheme hook
const Header = () => {
  const { theme } = useTheme();
  // Use theme value
};
```

## State Management Patterns

### 1. Local State

```jsx
const [formData, setFormData] = useState({
  username: '',
  email: ''
});

const handleChange = (e) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};
```

### 2. Context State

```jsx
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Code Splitting Implementation

```jsx
// App.js
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

## Form Handling Pattern

```jsx
const UserForm = () => {
  const [formData, setFormData] = useLocalStorage('formData', {
    username: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    // Validation logic
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form
    }
  };
};
```

## Performance Optimization Techniques

### 1. Memoization

```jsx
const MemoizedComponent = React.memo(({ data }) => {
  // Only re-renders if data changes
  return <div>{data}</div>;
});
```

### 2. useCallback

```jsx
const handleSubmit = useCallback((formData) => {
  // Handle form submission
}, [/* dependencies */]);
```

### 3. useMemo

```jsx
const expensiveComputation = useMemo(() => {
  // Expensive calculation
  return result;
}, [/* dependencies */]);
```

## Testing Patterns

```jsx
// Component test example
describe('UserForm', () => {
  it('validates email format', () => {
    render(<UserForm />);
    // Test implementation
  });
});

// Hook test example
test('useLocalStorage', () => {
  const { result } = renderHook(() => useLocalStorage('key', 'value'));
  // Test implementation
});
```

## Error Handling Patterns

```jsx
// API error handling
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
} catch (error) {
  // Handle error
}

// Form error handling
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await submitForm(formData);
  } catch (error) {
    setErrors(error.validationErrors);
  }
};
```

## Best Practices

1. Component Organization
   - Keep components small and focused
   - Use meaningful names
   - Group related components

2. State Management
   - Use appropriate state management for the use case
   - Keep state as local as possible
   - Use context for truly global state

3. Performance
   - Implement code splitting
   - Use memoization wisely
   - Optimize re-renders

4. Error Handling
   - Use Error Boundaries
   - Implement proper error states
   - Provide meaningful error messages

5. Testing
   - Write tests for critical functionality
   - Test error cases
   - Use meaningful test descriptions

## Development Workflow

1. Start the development server:
```bash
npm start
```

2. Run tests:
```bash
npm test
```

3. Build for production:
```bash
npm run build
```

## Debugging Tips

1. Use React Developer Tools
2. Implement proper error boundaries
3. Use console.log strategically
4. Monitor component re-renders
5. Check network requests

## Common Issues and Solutions

1. Infinite re-renders
   - Check useEffect dependencies
   - Verify state updates
   - Use proper memoization

2. Context performance
   - Split contexts by functionality
   - Use context selectors
   - Implement proper memoization

3. Form handling
   - Implement proper validation
   - Handle all input types
   - Manage form state effectively
