# Quick Start Guide - React Features Demo

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Feature Overview & Quick Usage

### 1. Theme Switching
- Click the theme toggle button in the header
- Switches between light and dark modes
- Affects all components automatically

### 2. Form Handling Demo
1. Navigate to "User Form" from the header
2. Try submitting empty form to see validations
3. Fill in valid data to see successful submission
4. Refresh page to see data persistence

### 3. Data Fetching Demo
1. Navigate to "Data Fetcher" from the header
2. Observe loading states
3. View fetched data
4. Try the refresh button
5. Toggle theme to see styled data display

### 4. Error Boundary Testing
1. Any JavaScript error will be caught
2. User-friendly error message displayed
3. Option to recover/refresh

## Project Structure

```
react-demo/
├── src/
│   ├── components/     # Reusable components
│   ├── context/       # Context providers
│   ├── hooks/         # Custom hooks
│   ├── hoc/           # Higher Order Components
│   ├── pages/         # Page components
│   └── App.js         # Main component
```

## Key Components

### ThemeProvider
```jsx
// Access theme in any component:
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  // Use theme
};
```

### UserForm
```jsx
// Form with validation and persistence:
<UserForm onSubmit={handleSubmit} />
```

### DataFetcher
```jsx
// Fetch and display data:
<DataFetcher
  url="/api/data"
  render={({ data, loading }) => (
    loading ? <Loading /> : <DisplayData data={data} />
  )}
/>
```

## Common Tasks

### Adding a New Route
1. Create component in `src/pages`
2. Add route in `App.js`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New Theme-Aware Component
```jsx
import { useTheme } from '../context/ThemeContext';

const NewComponent = () => {
  const { theme, styles } = useTheme();
  const currentStyles = styles[theme];
  
  return (
    <div style={{ 
      backgroundColor: currentStyles.background,
      color: currentStyles.text 
    }}>
      Content
    </div>
  );
};
```

### Using the Loading HOC
```jsx
import { withLoading } from '../hoc/withLoading';

const MyComponent = ({ data }) => (
  <div>{data}</div>
);

export default withLoading(MyComponent);
```

## Development Tools

### React Developer Tools
- Install Chrome/Firefox extension
- Inspect component hierarchy
- Debug props and state

### Available Scripts

- `npm start`: Start development server
- `npm test`: Run tests
- `npm run build`: Build for production
- `npm run eject`: Eject from Create React App

## Troubleshooting

### Common Issues

1. **Blank Page**
   - Check console for errors
   - Verify routes are correct
   - Ensure components are exported

2. **Theme Not Working**
   - Verify component is wrapped in ThemeProvider
   - Check useTheme hook usage

3. **Form Data Not Persisting**
   - Check localStorage in browser
   - Verify useLocalStorage hook implementation

### Getting Help

1. Check the technical documentation in `TECHNICAL_DOCS.md`
2. Review the architecture diagram in `react_app_flow.puml`
3. Consult the full README.md for detailed information

## Next Steps

1. Review the code examples in `TECHNICAL_DOCS.md`
2. Experiment with the different features
3. Try implementing your own components using the patterns demonstrated
4. Explore the source code to understand implementation details

## Best Practices

1. Always wrap theme-dependent components with ThemeProvider
2. Use Error Boundaries for error handling
3. Implement proper loading states
4. Follow the established patterns for consistency
5. Write tests for new components

Remember to consult the full documentation in README.md and TECHNICAL_DOCS.md for more detailed information about the application's architecture and features.
