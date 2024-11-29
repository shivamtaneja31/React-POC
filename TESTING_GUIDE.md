# Testing Guide - React Features Demo

## Testing Setup

This project uses the following testing tools:
- Jest as the test runner
- React Testing Library for component testing
- Jest DOM for DOM testing utilities
- MSW (Mock Service Worker) for API mocking

## Test Structure

```
react-demo/
├── src/
│   ├── __tests__/          # Test files
│   │   ├── components/     # Component tests
│   │   ├── hooks/         # Hook tests
│   │   └── integration/   # Integration tests
│   └── __mocks__/         # Mock files
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- UserForm.test.js
```

## Component Testing Examples

### 1. UserForm Component

```jsx
// UserForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../components/forms/UserForm';

describe('UserForm', () => {
  it('displays validation errors for empty fields', () => {
    render(<UserForm />);
    
    fireEvent.click(screen.getByText('Submit'));
    
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('submits form with valid data', () => {
    const onSubmit = jest.fn();
    render(<UserForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Username:'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.click(screen.getByText('Submit'));
    
    expect(onSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com'
    });
  });
});
```

### 2. Theme-Aware Component

```jsx
// Header.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/Header';

describe('Header', () => {
  it('toggles theme', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    
    const themeButton = screen.getByRole('button', { name: /dark mode/i });
    fireEvent.click(themeButton);
    
    expect(themeButton).toHaveTextContent(/light mode/i);
  });
});
```

## Hook Testing Examples

### 1. useLocalStorage Hook

```jsx
// useLocalStorage.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns stored value', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    expect(result.current[0]).toBe('initial');
  });

  it('updates stored value', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test-key')).toBe('"updated"');
  });
});
```

## Integration Testing Examples

### 1. Data Fetching Flow

```jsx
// DataFetcherDemo.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import DataFetcherDemo from '../pages/DataFetcherDemo';

const server = setupServer(
  rest.get('/api/data', (req, res, ctx) => {
    return res(ctx.json({ data: 'test data' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('DataFetcherDemo', () => {
  it('fetches and displays data', async () => {
    render(<DataFetcherDemo />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('test data')).toBeInTheDocument();
    });
  });

  it('handles error states', async () => {
    server.use(
      rest.get('/api/data', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    render(<DataFetcherDemo />);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

## Testing Error Boundaries

```jsx
// ErrorBoundary.test.js
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('displays fallback UI when error occurs', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    
    spy.mockRestore();
  });
});
```

## Testing Best Practices

### 1. Test Organization

- Group related tests using `describe` blocks
- Use clear test descriptions
- Follow AAA pattern (Arrange, Act, Assert)

```jsx
describe('Component', () => {
  // Arrange
  beforeEach(() => {
    // Setup
  });

  it('should do something', () => {
    // Act
    const result = doSomething();
    
    // Assert
    expect(result).toBe(expected);
  });
});
```

### 2. Mock Management

```jsx
// Create mocks
const mockFn = jest.fn();
const mockComponent = jest.mock('./Component');

// Verify mock calls
expect(mockFn).toHaveBeenCalledWith(expectedArgs);
expect(mockFn).toHaveBeenCalledTimes(1);

// Reset mocks
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 3. Async Testing

```jsx
it('handles async operations', async () => {
  render(<AsyncComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

## Common Testing Patterns

### 1. User Interactions

```jsx
test('handles user input', () => {
  render(<Component />);
  
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'new value' }
  });
  
  expect(screen.getByRole('textbox')).toHaveValue('new value');
});
```

### 2. Context Testing

```jsx
const wrapper = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

test('uses context', () => {
  render(<Component />, { wrapper });
  // Test component with context
});
```

### 3. Route Testing

```jsx
import { MemoryRouter } from 'react-router-dom';

test('renders correct route', () => {
  render(
    <MemoryRouter initialEntries={['/path']}>
      <App />
    </MemoryRouter>
  );
  // Test routing behavior
});
```

## Testing Checklist

- [ ] Unit tests for components
- [ ] Unit tests for hooks
- [ ] Integration tests for features
- [ ] Error boundary tests
- [ ] Loading state tests
- [ ] Error state tests
- [ ] User interaction tests
- [ ] Accessibility tests
- [ ] Route tests
- [ ] Context tests

## Continuous Integration

This project is configured to run tests in CI:

```yaml
# Example GitHub Actions workflow
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

Remember to:
- Keep tests focused and isolated
- Test behavior, not implementation
- Use meaningful assertions
- Maintain test coverage
- Update tests when changing code
