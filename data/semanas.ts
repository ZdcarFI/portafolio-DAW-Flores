import {Code, Component, Cpu, FileText, LucideIcon, Palette, Play, Zap} from "lucide-react";

interface Ejemplo {
    id: number
    titulo: string
    descripcion: string
    objetivo: string
    codigo: string
}

export const ejemplo_7: Ejemplo[] = [
    {
        id: 1,
        titulo: "Advanced Hooks",
        descripcion: "useReducer, useCallback, useMemo y custom hooks",
        objetivo:
            "Dominar los hooks avanzados de React para manejar estado complejo, optimizar rendimiento y crear hooks personalizados reutilizables.",

        codigo: `// 1. useReducer para estado complejo
const initialState = {
  todos: [],
  filter: 'all', // all, active, completed
  nextId: 1
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: state.nextId,
          text: action.payload,
          completed: false
        }],
        nextId: state.nextId + 1
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');
  
  // 2. useCallback para optimizar funciones
  const addTodo = useCallback(() => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue.trim() });
      setInputValue('');
    }
  }, [inputValue]);
  
  const toggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);
  
  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);
  
  // 3. useMemo para cálculos costosos
  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed);
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);
  
  const stats = useMemo(() => ({
    total: state.todos.length,
    active: state.todos.filter(todo => !todo.completed).length,
    completed: state.todos.filter(todo => todo.completed).length
  }), [state.todos]);
  
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Advanced Todo App</h2>
      
      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button onClick={addTodo} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'active', 'completed'].map(filter => (
          <button
            key={filter}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
            className={\`px-3 py-1 rounded \${
              state.filter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }\`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Stats */}
      <div className="mb-4 text-sm text-gray-600">
        Total: {stats.total} | Active: {stats.active} | Completed: {stats.completed}
      </div>
      
      {/* Todo List */}
      <ul className="space-y-2">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={\`flex-1 \${todo.completed ? 'line-through text-gray-500' : ''}\`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-xs"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 4. Custom Hook para localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
}

// 5. Custom Hook para API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);
  
  useEffect(() => {
    refetch();
  }, [refetch]);
  
  return { data, loading, error, refetch };
}`,
    },
    {
        id: 2,
        titulo: "Component Patterns",
        descripcion: "HOCs, Render Props, Compound Components y Context API",
        objetivo:
            "Implementar patrones avanzados de componentes para crear APIs flexibles y reutilizables, incluyendo HOCs, Render Props y Context API.",

        codigo: `// 1. Higher-Order Component (HOC)
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    if (props.loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading...</span>
        </div>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
}

// 2. HOC para autenticación
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Simular verificación de autenticación
      setTimeout(() => {
        setUser({ id: 1, name: 'John Doe' });
        setLoading(false);
      }, 1000);
    }, []);
    
    if (loading) {
      return <div>Checking authentication...</div>;
    }
    
    if (!user) {
      return <div>Please log in to access this content.</div>;
    }
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// 3. Render Props Pattern
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);
  
  return children({ data, loading, error });
}

// Uso del Render Props
function UserProfile() {
  return (
    <DataFetcher url="/api/user">
      {({ data, loading, error }) => {
        if (loading) return <div>Loading user...</div>;
        if (error) return <div>Error: {error.message}</div>;
        return <div>Welcome, {data?.name}!</div>;
      }}
    </DataFetcher>
  );
}

// 4. Compound Components Pattern
const Modal = {
  Root: function ModalRoot({ children, isOpen, onClose }) {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
          {children}
        </div>
      </div>
    );
  },
  
  Header: function ModalHeader({ children, onClose }) {
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">{children}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
    );
  },
  
  Body: function ModalBody({ children }) {
    return <div className="p-4">{children}</div>;
  },
  
  Footer: function ModalFooter({ children }) {
    return <div className="flex justify-end gap-2 p-4 border-t">{children}</div>;
  }
};

// Uso de Compound Components
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      <Modal.Root isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header onClose={() => setIsModalOpen(false)}>
          Confirm Action
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item?
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </Modal.Footer>
      </Modal.Root>
    </div>
  );
}

// 5. Context API avanzado
const ThemeContext = createContext();
const UserContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  const value = useMemo(() => ({
    theme,
    toggleTheme,
    colors: theme === 'light' 
      ? { bg: 'white', text: 'black' }
      : { bg: 'black', text: 'white' }
  }), [theme, toggleTheme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 6. Provider composition
function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}`,
    },
    {
        id: 3,
        titulo: "Performance Optimization",
        descripcion: "React.memo, code splitting y optimizaciones",
        objetivo:
            "Optimizar aplicaciones React usando memoización, code splitting, lazy loading y técnicas avanzadas de performance.",

        codigo: `// 1. React.memo para componentes puros
const ExpensiveComponent = memo(function ExpensiveComponent({ data, onUpdate }) {
  console.log('ExpensiveComponent rendered');
  
  // Simulación de cálculo costoso
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: item.value * 2 + Math.random()
    }));
  }, [data]);
  
  return (
    <div>
      <h3>Expensive Component</h3>
      {processedData.map(item => (
        <div key={item.id}>
          {item.name}: {item.processed.toFixed(2)}
        </div>
      ))}
    </div>
  );
});

// 2. Optimización con useCallback y useMemo
function OptimizedParent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: 20 },
    { id: 3, name: 'Item 3', value: 30 }
  ]);
  
  // useCallback para evitar re-renders innecesarios
  const handleUpdate = useCallback((id, newValue) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, value: newValue } : item
    ));
  }, []);
  
  // useMemo para cálculos costosos
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return items.reduce((sum, item) => sum + item.value, 0) * Math.PI;
  }, [items]);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <p>Expensive calculation: {expensiveValue.toFixed(2)}</p>
      <ExpensiveComponent data={items} onUpdate={handleUpdate} />
    </div>
  );
}

// 3. Code Splitting con React.lazy
const LazyComponent = lazy(() => import('./LazyComponent'));
const LazyModal = lazy(() => import('./LazyModal'));

function CodeSplittingExample() {
  const [showLazy, setShowLazy] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <h2>Code Splitting Example</h2>
      
      <button onClick={() => setShowLazy(!showLazy)}>
        Toggle Lazy Component
      </button>
      
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      
      {showLazy && (
        <Suspense fallback={<div>Loading component...</div>}>
          <LazyComponent />
        </Suspense>
      )}
      
      {showModal && (
        <Suspense fallback={<div>Loading modal...</div>}>
          <LazyModal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  );
}

// 4. Virtual Scrolling para listas grandes
function VirtualList({ items, itemHeight = 50, containerHeight = 300 }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef();
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(visibleStart, visibleEnd);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;
  
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, index) => (
            <div
              key={visibleStart + index}
              style={{ height: itemHeight }}
              className="border-b p-2"
            >
              Item {visibleStart + index}: {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5. Debounced Search con optimización
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

function OptimizedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      // Simular búsqueda API
      setTimeout(() => {
        setResults([
          \`Result 1 for "\${debouncedQuery}"\`,
          \`Result 2 for "\${debouncedQuery}"\`,
          \`Result 3 for "\${debouncedQuery}"\`
        ]);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full p-2 border rounded"
      />
      
      {loading && <div>Searching...</div>}
      
      <ul>
        {results.map((result, index) => (
          <li key={index} className="p-2 border-b">
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 6. Image lazy loading
function LazyImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={imgRef} {...props}>
      {isInView && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        />
      )}
    </div>
  );
}`,
    },
    {
        id: 4,
        titulo: "Testing y Architecture",
        descripcion: "React Testing Library, arquitectura y error boundaries",
        objetivo:
            "Implementar testing comprehensivo con React Testing Library, crear arquitecturas escalables y manejar errores con error boundaries.",

        codigo: `// 1. Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to service
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 border border-red-500 rounded">
          <h2 className="text-red-600 font-bold">Something went wrong!</h2>
          <details className="mt-2">
            <summary>Error details</summary>
            <pre className="text-sm mt-2 text-red-500">
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// 2. Hook Error Boundary (React 18+)
function useErrorBoundary() {
  const [error, setError] = useState(null);
  
  const resetError = useCallback(() => {
    setError(null);
  }, []);
  
  const captureError = useCallback((error) => {
    setError(error);
  }, []);
  
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  
  return { captureError, resetError };
}

// 3. Component Testing Examples
// Counter.jsx
function Counter({ initialValue = 0, onCountChange }) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };
  
  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };
  
  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button data-testid="increment-btn" onClick={increment}>
        +
      </button>
      <button data-testid="decrement-btn" onClick={decrement}>
        -
      </button>
    </div>
  );
}

// Counter.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {
  test('renders with initial value', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByTestId('count-value')).toHaveTextContent('5');
  });
  
  test('increments count when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const incrementBtn = screen.getByTestId('increment-btn');
    await user.click(incrementBtn);
    
    expect(screen.getByTestId('count-value')).toHaveTextContent('1');
  });
  
  test('calls onCountChange when count changes', async () => {
    const user = userEvent.setup();
    const mockOnCountChange = jest.fn();
    render(<Counter onCountChange={mockOnCountChange} />);
    
    await user.click(screen.getByTestId('increment-btn'));
    
    expect(mockOnCountChange).toHaveBeenCalledWith(1);
  });
});

// 4. Custom Hook Testing
// useCounter.js
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}

// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter Hook', () => {
  test('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  test('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
  
  test('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  test('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(7);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
});

// 5. Integration Testing
// UserProfile.jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(response => {
        if (!response.ok) throw new Error('User not found');
        return response.json();
      })
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

// UserProfile.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserProfile from './UserProfile';

const server = setupServer(
  rest.get('/api/users/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    
    if (userId === '1') {
      return res(ctx.json({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin'
      }));
    }
    
    return res(ctx.status(404));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserProfile Integration', () => {
  test('displays user information when loaded successfully', async () => {
    render(<UserProfile userId="1" />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role: admin')).toBeInTheDocument();
  });
  
  test('displays error when user not found', async () => {
    render(<UserProfile userId="999" />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: User not found')).toBeInTheDocument();
    });
  });
});

// 6. Component Architecture Pattern
// Feature-based structure
/*
src/
  features/
    auth/
      components/
        LoginForm.jsx
        SignupForm.jsx
      hooks/
        useAuth.js
      services/
        authApi.js
      __tests__/
        LoginForm.test.jsx
    dashboard/
      components/
        Dashboard.jsx
        DashboardCard.jsx
      hooks/
        useDashboard.js
  shared/
    components/
      Button.jsx
      Modal.jsx
    hooks/
      useLocalStorage.js
    utils/
      api.js
*/

// Service layer pattern
class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return response.json();
  }
  
  get(endpoint) {
    return this.request(endpoint);
  }
  
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

const apiService = new ApiService('/api');
export default apiService;`,
    },
]
export const ejemplo_6: Ejemplo[] = [
    {
        id: 1,
        titulo: "React Fundamentals",
        descripcion: "Componentes, JSX, Props y State con Hooks",
        objetivo:
            "Dominar los conceptos fundamentales de React incluyendo componentes funcionales, JSX, manejo de props, state con hooks y event handling para crear interfaces interactivas.",

        codigo: `// 1. Componente funcional básico con JSX
import React, { useState, useEffect } from 'react';

// Componente simple
function Welcome({ name, age }) {
  return (
    <div className="welcome-card">
      <h1>¡Hola, {name}!</h1>
      <p>Tienes {age} años</p>
    </div>
  );
}

// 2. Estado con useState
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>Contador: {count}</h2>
      <div className="controls">
        <button onClick={decrement}>-{step}</button>
        <button onClick={increment}>+{step}</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="step-control">
        <label>
          Paso: 
          <input 
            type="number" 
            value={step} 
            onChange={(e) => setStep(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
    </div>
  );
}

// 3. Lista de tareas con estado complejo
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h2>Lista de Tareas</h2>
      
      <div className="add-todo">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Agregar nueva tarea..."
        />
        <button onClick={addTodo}>Agregar</button>
      </div>

      <div className="filters">
        {['all', 'active', 'completed'].map(filterType => (
          <button 
            key={filterType}
            className={filter === filterType ? 'active' : ''}
            onClick={() => setFilter(filterType)}
          >
            {filterType === 'all' ? 'Todas' : 
             filterType === 'active' ? 'Activas' : 'Completadas'}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

// 4. Componente hijo que recibe props
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={\`todo-text \${todo.completed ? 'line-through' : ''}\`}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>
        Eliminar
      </button>
    </li>
  );
}`,
    },
    {
        id: 2,
        titulo: "Next.js Full-Stack",
        descripcion: "Routing, SSR, API Routes y Deployment",
        objetivo:
            "Aprender Next.js desde el routing basado en archivos hasta la creación de APIs completas, incluyendo SSR, SSG y deployment en Vercel.",

        codigo: `// 1. Estructura de archivos Next.js App Router
/*
app/
├── layout.tsx          // Layout raíz
├── page.tsx           // Página principal (/)
├── about/
│   └── page.tsx       // Página about (/about)
├── blog/
│   ├── page.tsx       // Lista de posts (/blog)
│   └── [slug]/
│       └── page.tsx   // Post individual (/blog/[slug])
├── api/
│   ├── posts/
│   │   └── route.ts   // API endpoint (/api/posts)
│   └── posts/[id]/
│       └── route.ts   // API endpoint (/api/posts/[id])
└── globals.css
*/

// 2. Layout raíz (app/layout.tsx)
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mi Blog Next.js',
  description: 'Blog creado con Next.js 14',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="header">
          <nav className="nav">
            <Link href="/">Inicio</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">Acerca de</Link>
          </nav>
        </header>
        <main className="main">
          {children}
        </main>
        <footer className="footer">
          <p>&copy; 2024 Mi Blog. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  )
}

// 3. Página principal con SSG (app/page.tsx)
import Link from 'next/link'

async function getPosts() {
  // Simular fetch de datos
  return [
    { id: 1, title: 'Post 1', slug: 'post-1', excerpt: 'Excerpt 1', author: 'Autor 1', date: '2024-01-01' },
    { id: 2, title: 'Post 2', slug: 'post-2', excerpt: 'Excerpt 2', author: 'Autor 2', date: '2024-01-02' },
  ]
}

export default async function HomePage() {
  const posts = await getPosts()
  const featuredPosts = posts.slice(0, 3)

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Bienvenido a Mi Blog</h1>
        <p>Descubre artículos increíbles sobre desarrollo web</p>
      </section>

      <section className="featured-posts">
        <h2>Posts Destacados</h2>
        <div className="posts-grid">
          {featuredPosts.map(post => (
            <article key={post.id} className="post-card">
              <h3>
                <Link href={\`/blog/\${post.slug}\`}>
                  {post.title}
                </Link>
              </h3>
              <p>{post.excerpt}</p>
              <div className="post-meta">
                <span>Por {post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </article>
          ))}
        </div>
        <Link href="/blog" className="view-all-btn">
          Ver todos los posts
        </Link>
      </section>
    </div>
  )
}

// 4. API Route para posts (app/api/posts/route.ts)
import { NextRequest, NextResponse } from 'next/server'

const posts = [
  { id: 1, title: 'Post 1', content: 'Contenido 1', author: 'Autor 1' },
  { id: 2, title: 'Post 2', content: 'Contenido 2', author: 'Autor 2' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    
    let result = posts
    
    if (limit) {
      result = posts.slice(0, parseInt(limit))
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { title, content, author } = body
    if (!title || !content || !author) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }
    
    const newPost = {
      id: posts.length + 1,
      title,
      content,
      author,
      date: new Date().toISOString()
    }
    
    posts.push(newPost)
    
    return NextResponse.json({
      success: true,
      data: newPost
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al crear post' },
      { status: 500 }
    )
  }
}`,
    },
    {
        id: 3,
        titulo: "Vue.js Ecosystem",
        descripcion: "Template Syntax, Composition API y Vue Router",
        objetivo:
            "Dominar Vue.js 3 con Composition API, template syntax, directivas, Vue Router para SPA y Pinia para gestión de estado global.",

        codigo: `<!-- 1. Componente básico con Composition API -->
<template>
  <div class="counter-app">
    <h1>{{ title }}</h1>
    <div class="counter">
      <button @click="decrement" :disabled="count <= 0">-</button>
      <span class="count">{{ count }}</span>
      <button @click="increment">+</button>
    </div>
    <div class="controls">
      <button @click="reset">Reset</button>
      <button @click="toggleAutoIncrement">
        {{ isAutoIncrementing ? 'Parar' : 'Auto Incrementar' }}
      </button>
    </div>
    <p v-if="count > 10" class="warning">
      ¡El contador está muy alto!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// interface Props {
//   initialCount?: number
//   title?: string
// }

const props = withDefaults(defineProps<Props>(), {
  initialCount: 0,
  title: 'Contador Vue'
})

const emit = defineEmits<{
  countChanged: [count: number]
  reset: []
}>()

const count = ref(props.initialCount)
const isAutoIncrementing = ref(false)
//let intervalId: number | null = null

const isEven = computed(() => count.value % 2 === 0)

const increment = () => {
  count.value++
  emit('countChanged', count.value)
}

const decrement = () => {
  if (count.value > 0) {
    count.value--
    emit('countChanged', count.value)
  }
}

const reset = () => {
  count.value = props.initialCount
  emit('reset')
}

const toggleAutoIncrement = () => {
  isAutoIncrementing.value = !isAutoIncrementing.value
  
  if (isAutoIncrementing.value) {
  //  intervalId = setInterval(increment, 1000)
  } else if (intervalId) {
    clearInterval(intervalId)
 //   intervalId = null
  }
}

watch(count, (newCount, oldCount) => {
  console.log(\`Count changed from \${oldCount} to \${newCount}\`)
})

onMounted(() => {
  console.log('Counter component mounted')
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<!-- 2. Vue Router setup -->
// main.ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Blog from './pages/Blog.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/blog/:slug', name: 'BlogPost', component: () => import('./pages/BlogPost.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

<!-- 3. Pinia Store -->
// stores/blog.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  author: string
  date: string
}

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const publishedPosts = computed(() => 
    posts.value.filter(post => post.date <= new Date().toISOString())
  )

  const getPostBySlug = computed(() => 
    (slug: string) => posts.value.find(post => post.slug === slug)
  )

  const fetchPosts = async () => {
    loading.value = true
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      posts.value = data
    } catch (err) {
      error.value = 'Error al cargar posts'
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    loading,
    error,
    publishedPosts,
    getPostBySlug,
    fetchPosts
  }
})`,
    },
    {
        id: 4,
        titulo: "Framework Comparison",
        descripcion: "React vs Vue vs Angular - Comparación práctica",
        objetivo:
            "Comparar React, Vue y Angular a través de ejemplos prácticos, analizando sintaxis, performance, ecosistema y casos de uso para tomar decisiones informadas.",

        codigo: `// COMPARACIÓN PRÁCTICA: MISMO COMPONENTE EN 3 FRAMEWORKS

// ============================================
// 1. REACT - Contador con hooks
// ============================================
import React, { useState, useEffect } from 'react';

const ReactCounter = ({ initialValue = 0, step = 1, onCountChange }) => {
  const [count, setCount] = useState(initialValue);
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);

  useEffect(() => {
    let interval;
    if (isAutoIncrementing) {
      interval = setInterval(() => {
        setCount(prev => prev + step);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoIncrementing, step]);

  useEffect(() => {
    onCountChange?.(count);
  }, [count, onCountChange]);

  return (
    <div className="counter">
      <h2>React Counter</h2>
      <div className="display">
        <span className="count">{count}</span>
      </div>
      <div className="controls">
        <button onClick={() => setCount(prev => prev - step)}>-{step}</button>
        <button onClick={() => setCount(prev => prev + step)}>+{step}</button>
        <button onClick={() => setCount(initialValue)}>Reset</button>
        <button onClick={() => setIsAutoIncrementing(!isAutoIncrementing)}>
          {isAutoIncrementing ? 'Stop' : 'Auto'}
        </button>
      </div>
    </div>
  );
};

// ============================================
// 2. VUE - Mismo componente con Composition API
// ============================================
/*
<template>
  <div class="counter">
    <h2>Vue Counter</h2>
    <div class="display">
      <span class="count">{{ count }}</span>
    </div>
    <div class="controls">
      <button @click="decrement">-{{ step }}</button>
      <button @click="increment">+{{ step }}</button>
      <button @click="reset">Reset</button>
      <button @click="toggleAutoIncrement">
        {{ isAutoIncrementing ? 'Stop' : 'Auto' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  initialValue: { type: Number, default: 0 },
  step: { type: Number, default: 1 }
})

const emit = defineEmits(['countChange'])

const count = ref(props.initialValue)
const isAutoIncrementing = ref(false)
let intervalId = null

const increment = () => count.value += props.step
const decrement = () => count.value -= props.step
const reset = () => count.value = props.initialValue

const toggleAutoIncrement = () => {
  isAutoIncrementing.value = !isAutoIncrementing.value
  if (isAutoIncrementing.value) {
    intervalId = setInterval(increment, 1000)
  } else if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

watch(count, (newCount) => emit('countChange', newCount))
onUnmounted(() => intervalId && clearInterval(intervalId))
</script>
*/

// ============================================
// 3. ANGULAR - Mismo componente
// ============================================
/*
// counter.component.ts
import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    <div class="counter">
      <h2>Angular Counter</h2>
      <div class="display">
        <span class="count">{{ count }}</span>
      </div>
      <div class="controls">
        <button (click)="decrement()">-{{ step }}</button>
        <button (click)="increment()">+{{ step }}</button>
        <button (click)="reset()">Reset</button>
        <button (click)="toggleAutoIncrement()">
          {{ isAutoIncrementing ? 'Stop' : 'Auto' }}
        </button>
      </div>
    </div>
  \`
})
export class CounterComponent implements OnDestroy {
  @Input() initialValue: number = 0;
  @Input() step: number = 1;
  @Output() countChange = new EventEmitter<number>();

  count: number = 0;
  isAutoIncrementing: boolean = false;
  private intervalId: any;

  ngOnInit() {
    this.count = this.initialValue;
  }

  increment(): void {
    this.count += this.step;
    this.countChange.emit(this.count);
  }

  decrement(): void {
    this.count -= this.step;
    this.countChange.emit(this.count);
  }

  reset(): void {
    this.count = this.initialValue;
    this.countChange.emit(this.count);
  }

  toggleAutoIncrement(): void {
    this.isAutoIncrementing = !this.isAutoIncrementing;
    if (this.isAutoIncrementing) {
      this.intervalId = setInterval(() => this.increment(), 1000);
    } else if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
*/

// ============================================
// COMPARACIÓN DE CARACTERÍSTICAS
// ============================================

/*
TABLA COMPARATIVA:

┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Característica  │ React           │ Vue             │ Angular         │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Curva Aprendiz. │ Media           │ Fácil           │ Difícil         │
│ Bundle Size     │ ~42KB           │ ~34KB           │ ~130KB          │
│ Performance     │ Excelente       │ Excelente       │ Muy Buena       │
│ TypeScript      │ Opcional        │ Opcional        │ Por defecto     │
│ Ecosistema      │ Muy Grande      │ Grande          │ Completo        │
│ Empresa         │ Meta            │ Independiente   │ Google          │
│ Arquitectura    │ Biblioteca      │ Framework Prog. │ Framework Full  │
│ Estado Global   │ Redux/Zustand   │ Pinia/Vuex      │ NgRx/Services   │
│ Routing         │ React Router    │ Vue Router      │ Angular Router  │
│ Testing         │ Jest + RTL      │ Vitest + VTU    │ Jasmine + Karma │
│ Mobile          │ React Native    │ NativeScript    │ Ionic           │
│ SSR             │ Next.js         │ Nuxt.js         │ Angular Univ.   │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘

CASOS DE USO IDEALES:

React:
✅ SPAs complejas
✅ Aplicaciones con mucho estado
✅ Equipos grandes
✅ Ecosistema rico

Vue:
✅ Proyectos de cualquier tamaño
✅ Migración gradual
✅ Desarrolladores junior/senior
✅ Prototipado rápido

Angular:
✅ Aplicaciones enterprise
✅ Equipos grandes
✅ Aplicaciones complejas
✅ TypeScript obligatorio
*/`,
    },
]
export const ejemplo_5: Ejemplo[] = [
    {
        id: 1,
        titulo: "JavaScript ES6+ Moderno",
        descripcion: "Características esenciales de JavaScript moderno",
        objetivo:
            "Dominar las características fundamentales de ES6+ incluyendo destructuring, arrow functions, template literals, y módulos para escribir JavaScript moderno y eficiente.",

        codigo: `// 1. Variables modernas y scope
const PI = 3.14159; // Constante, no se puede reasignar
let radius = 5; // Variable de bloque, se puede reasignar
// var evitar en código moderno

// 2. Template literals
const name = "Juan";
const age = 25;
const greeting = \`Hola, soy \${name} y tengo \${age} años\`;
console.log(greeting);

// 3. Destructuring Assignment
const colors = ['rojo', 'verde', 'azul'];
const [primary, secondary, tertiary] = colors;

const user = {
  id: 1,
  name: 'Ana',
  email: 'ana@example.com'
};
const { name: userName, email } = user;

// 4. Arrow Functions
const add = (a, b) => a + b;
const square = x => x * x;

// 5. Spread Operator
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5, 6];

// 6. Array Methods Modernos
const users = [
  { id: 1, name: 'Ana', age: 25, active: true },
  { id: 2, name: 'Luis', age: 30, active: false }
];

const userNames = users.map(user => user.name);
const activeUsers = users.filter(user => user.active);
const userById = users.find(user => user.id === 2);`,
    },
    {
        id: 2,
        titulo: "Programación Asíncrona",
        descripcion: "Promises, async/await y manejo de APIs",
        objetivo:
            "Dominar la programación asíncrona en JavaScript utilizando Promises y async/await para manejar operaciones como llamadas a APIs, con manejo robusto de errores.",

        codigo: `// 1. Promises básicas
const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: \`Usuario \${userId}\`,
          email: \`user\${userId}@example.com\`
        });
      } else {
        reject(new Error('ID de usuario inválido'));
      }
    }, 1000);
  });
};

// 2. Async/Await
async function getUserInfo(userId) {
  try {
    console.log('Obteniendo información del usuario...');
    const user = await fetchUserData(userId);
    console.log('Usuario obtenido:', user);
    return user;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// 3. Fetch API
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(\`HTTP Error: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error;
    }
  }
  
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }
  
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

// 4. Promise.all para operaciones paralelas
async function loadMultipleResources() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('Error cargando recursos:', error);
  }
}`,
    },
    {
        id: 3,
        titulo: "TypeScript Fundamentals",
        descripcion: "Introducción al tipado estático con TypeScript",
        objetivo:
            "Aprender los fundamentos de TypeScript para agregar tipado estático a JavaScript, incluyendo tipos básicos, interfaces, generics y configuración de proyectos.",

        codigo: `// 1. Tipos básicos
let userName: string = "Juan";
let age: number = 25;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3, 4, 5];

// 2. Interfaces
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Propiedad opcional
  readonly createdAt: Date; // Solo lectura
}

// 3. Funciones tipadas
function greet(name: string): string {
  return \`Hola, \${name}!\`;
}

const add = (a: number, b: number): number => a + b;

// 4. Generics
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("hello");
const numberResult = identity<number>(42);

// 5. Interfaces genéricas
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

// 6. Utility Types
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

type ProductUpdate = Partial<Product>; // Todas opcionales
type ProductSummary = Pick<Product, 'id' | 'name'>; // Solo id y name
type CreateProduct = Omit<Product, 'id'>; // Sin id

// 7. Clases en TypeScript
class TaskManager {
  private tasks: Task[] = [];
  
  constructor() {
    this.tasks = [];
  }
  
  addTask(task: Omit<Task, 'id'>): Task {
    const newTask: Task = {
      id: Date.now(),
      ...task,
      createdAt: new Date()
    };
    
    this.tasks.push(newTask);
    return newTask;
  }
  
  getTasks(): Task[] {
    return this.tasks;
  }
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}`,
    },
    {
        id: 4,
        titulo: "Manipulación del DOM",
        descripcion: "Interacción moderna con el DOM usando JavaScript",
        objetivo:
            "Dominar la manipulación del DOM con JavaScript moderno, incluyendo selección de elementos, manejo de eventos, almacenamiento local y creación de interfaces interactivas.",

        codigo: `// 1. Selección moderna de elementos
class DOMHelper {
  static $(selector) {
    return document.querySelector(selector);
  }
  
  static $$(selector) {
    return document.querySelectorAll(selector);
  }
  
  static createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key.startsWith('on')) {
        const eventType = key.slice(2).toLowerCase();
        element.addEventListener(eventType, value);
      } else {
        element.setAttribute(key, value);
      }
    });
    
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    
    return element;
  }
}

// 2. Gestión de almacenamiento local
class StorageManager {
  static setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error al guardar:', error);
      return false;
    }
  }
  
  static getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error al leer:', error);
      return defaultValue;
    }
  }
}

// 3. Manejo de eventos moderno
class EventManager {
  constructor() {
    this.events = new Map();
  }
  
  on(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    
    if (!this.events.has(element)) {
      this.events.set(element, []);
    }
    this.events.get(element).push({ event, handler });
  }
  
  off(element, event, handler) {
    element.removeEventListener(event, handler);
  }
  
  delegate(parent, selector, event, handler) {
    parent.addEventListener(event, (e) => {
      if (e.target.matches(selector)) {
        handler(e);
      }
    });
  }
}

// 4. Ejemplo práctico: Lista de tareas
class TodoApp {
  constructor() {
    this.todos = StorageManager.getItem('todos', []);
    this.nextId = this.todos.length > 0 ? 
      Math.max(...this.todos.map(t => t.id)) + 1 : 1;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.render();
  }
  
  bindEvents() {
    const form = DOMHelper.$('#todo-form');
    const list = DOMHelper.$('#todo-list');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo();
    });
    
    // Delegación de eventos
    list.addEventListener('click', (e) => {
      const todoItem = e.target.closest('.todo-item');
      if (!todoItem) return;
      
      const id = parseInt(todoItem.dataset.id);
      
      if (e.target.classList.contains('toggle')) {
        this.toggleTodo(id);
      } else if (e.target.classList.contains('delete')) {
        this.deleteTodo(id);
      }
    });
  }
  
  addTodo() {
    const input = DOMHelper.$('#todo-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    const todo = {
      id: this.nextId++,
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    this.todos.push(todo);
    this.save();
    this.render();
    
    input.value = '';
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      this.render();
    }
  }
  
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.render();
  }
  
  render() {
    const list = DOMHelper.$('#todo-list');
    list.innerHTML = '';
    
    this.todos.forEach(todo => {
      const item = DOMHelper.createElement('div', {
        className: \`todo-item \${todo.completed ? 'completed' : ''}\`,
        dataset: { id: todo.id }
      }, [
        DOMHelper.createElement('span', {
          className: 'todo-text'
        }, [todo.text]),
        DOMHelper.createElement('button', {
          className: 'toggle',
          onclick: () => this.toggleTodo(todo.id)
        }, [todo.completed ? '↶' : '✓']),
        DOMHelper.createElement('button', {
          className: 'delete',
          onclick: () => this.deleteTodo(todo.id)
        }, ['🗑️'])
      ]);
      
      list.appendChild(item);
    });
  }
  
  save() {
    StorageManager.setItem('todos', this.todos);
  }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});`,
    },
]
export const ejemplo_4: Ejemplo[] = [
    {
        id: 1,
        titulo: "Tailwind CSS Setup",
        descripcion: "Configuración completa de Tailwind CSS",
        objetivo:
            "Configurar Tailwind CSS desde cero en un proyecto, incluyendo instalación, configuración personalizada, y optimización para producción con purging de CSS no utilizado.",

        codigo: `# Instalación de Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: '#64748b'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}

/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: Inter, system-ui, sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-lg p-6 border border-gray-100;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
\`
<!-- HTML Example -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind CSS Example</title>
    <link href="./dist/output.css" rel="stylesheet">
</head>
<body class="bg-gray-50 font-sans">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="card max-w-md w-full">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">
                ¡Tailwind CSS funcionando!
            </h1>
            <p class="text-gray-600 mb-6">
                Esta es una configuración básica de Tailwind CSS.
            </p>
            <button class="btn-primary w-full">
                Comenzar
            </button>
        </div>
    </div>
</body>
</html>

# Build script para producción
npx tailwindcss -i ./src/styles/globals.css -o ./dist/output.css --watch

# Para producción (minificado)
npx tailwindcss -i ./src/styles/globals.css -o ./dist/output.css --minify`,
    },
    {
        id: 2,
        titulo: "Bootstrap Grid System",
        descripcion: "Sistema de grillas responsivo con Bootstrap",
        objetivo:
            "Dominar el sistema de grillas de Bootstrap para crear layouts responsivos complejos, incluyendo breakpoints, offsets, y anidamiento de columnas.",

        codigo: `<!-- Bootstrap CDN -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Grid System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Container Types -->
    <div class="container-fluid bg-primary text-white p-3 mb-4">
        <h1>Container Fluid (100% width)</h1>
    </div>
    
    <div class="container bg-secondary text-white p-3 mb-4">
        <h2>Container (responsive max-widths)</h2>
    </div>

    <!-- Basic Grid -->
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="bg-info p-3 mb-2">
                    Responsive: 12 cols mobile, 8 cols tablet, 6 cols desktop
                </div>
            </div>
            <div class="col-12 col-md-4 col-lg-6">
                <div class="bg-warning p-3 mb-2">
                    Responsive: 12 cols mobile, 4 cols tablet, 6 cols desktop
                </div>
            </div>
        </div>

        <!-- Equal Width Columns -->
        <div class="row mb-4">
            <div class="col">
                <div class="bg-success p-3">Equal width 1</div>
            </div>
            <div class="col">
                <div class="bg-success p-3">Equal width 2</div>
            </div>
            <div class="col">
                <div class="bg-success p-3">Equal width 3</div>
            </div>
        </div>

        <!-- Column Sizing -->
        <div class="row mb-4">
            <div class="col-sm-3">
                <div class="bg-primary text-white p-3">col-sm-3</div>
            </div>
            <div class="col-sm-6">
                <div class="bg-secondary text-white p-3">col-sm-6</div>
            </div>
            <div class="col-sm-3">
                <div class="bg-primary text-white p-3">col-sm-3</div>
            </div>
        </div>

        <!-- Offsets -->
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="bg-info p-3">col-md-4</div>
            </div>
            <div class="col-md-4 offset-md-4">
                <div class="bg-info p-3">col-md-4 offset-md-4</div>
            </div>
        </div>

        <!-- Nested Columns -->
        <div class="row mb-4">
            <div class="col-sm-9">
                <div class="bg-light p-3">
                    <h4>Nested Grid</h4>
                    <div class="row">
                        <div class="col-8 col-sm-6">
                            <div class="bg-warning p-2">Nested col-8 col-sm-6</div>
                        </div>
                        <div class="col-4 col-sm-6">
                            <div class="bg-danger text-white p-2">Nested col-4 col-sm-6</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="bg-success text-white p-3">col-sm-3</div>
            </div>
        </div>

        <!-- Alignment -->
        <div class="row align-items-start bg-light" style="height: 100px;">
            <div class="col">
                <div class="bg-primary text-white p-2">align-items-start</div>
            </div>
        </div>

        <div class="row align-items-center bg-light mb-2" style="height: 100px;">
            <div class="col">
                <div class="bg-secondary text-white p-2">align-items-center</div>
            </div>
        </div>

        <div class="row align-items-end bg-light mb-4" style="height: 100px;">
            <div class="col">
                <div class="bg-success text-white p-2">align-items-end</div>
            </div>
        </div>

        <!-- Justify Content -->
        <div class="row justify-content-start mb-2">
            <div class="col-4">
                <div class="bg-info p-2">justify-content-start</div>
            </div>
        </div>

        <div class="row justify-content-center mb-2">
            <div class="col-4">
                <div class="bg-warning p-2">justify-content-center</div>
            </div>
        </div>

        <div class="row justify-content-end mb-4">
            <div class="col-4">
                <div class="bg-danger text-white p-2">justify-content-end</div>
            </div>
        </div>

        <!-- Order -->
        <div class="row mb-4">
            <div class="col order-last">
                <div class="bg-primary text-white p-3">First in DOM, last visually</div>
            </div>
            <div class="col order-first">
                <div class="bg-secondary text-white p-3">Second in DOM, first visually</div>
            </div>
            <div class="col">
                <div class="bg-success text-white p-3">Third in DOM, middle visually</div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

/* Custom CSS for better visualization */
<style>
.row > div {
    margin-bottom: 1rem;
}

.row > div > div {
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 0.375rem;
}

/* Breakpoint indicators */
.container::before {
    content: "XS";
    position: fixed;
    top: 10px;
    right: 10px;
    background: #dc3545;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    z-index: 1000;
}

@media (min-width: 576px) {
    .container::before { content: "SM"; background: #fd7e14; }
}

@media (min-width: 768px) {
    .container::before { content: "MD"; background: #ffc107; color: #000; }
}

@media (min-width: 992px) {
    .container::before { content: "LG"; background: #198754; }
}

@media (min-width: 1200px) {
    .container::before { content: "XL"; background: #0d6efd; }
}

@media (min-width: 1400px) {
    .container::before { content: "XXL"; background: #6f42c1; }
}
</style>`,
    },
    {
        id: 3,
        titulo: "Comparación Tailwind vs Bootstrap",
        descripcion: "Mismo componente en ambos frameworks",
        objetivo:
            "Crear el mismo componente (tarjeta de producto) utilizando tanto Tailwind CSS como Bootstrap para comparar sintaxis, flexibilidad y resultado final.",

        codigo: `<!-- TAILWIND CSS VERSION -->
<div class="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <!-- Image -->
    <div class="relative">
        <img 
            class="w-full h-48 object-cover" 
            src="https://via.placeholder.com/400x200" 
            alt="Producto"
        >
        <div class="absolute top-2 right-2">
            <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -20%
            </span>
        </div>
    </div>
    
    <!-- Content -->
    <div class="p-6">
        <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
                Producto Increíble
            </h3>
            <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span class="text-sm text-gray-600 ml-1">4.5</span>
            </div>
        </div>
        
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">
            Descripción del producto que puede ser un poco larga y necesita ser truncada en múltiples líneas.
        </p>
        
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
                <span class="text-2xl font-bold text-gray-900">$79.99</span>
                <span class="text-sm text-gray-500 line-through">$99.99</span>
            </div>
            <span class="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
                En stock
            </span>
        </div>
        
        <div class="flex space-x-2">
            <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Agregar al carrito
            </button>
            <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
            </button>
        </div>
    </div>
</div>

<!-- BOOTSTRAP VERSION -->
<div class="card shadow-sm" style="max-width: 20rem; margin: 0 auto;">
    <!-- Image -->
    <div class="position-relative">
        <img 
            src="https://via.placeholder.com/400x200" 
            class="card-img-top" 
            alt="Producto"
            style="height: 12rem; object-fit: cover;"
        >
        <span class="position-absolute top-0 end-0 m-2 badge bg-danger rounded-pill">
            -20%
        </span>
    </div>
    
    <!-- Content -->
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title mb-0 text-truncate">Producto Increíble</h5>
            <div class="d-flex align-items-center">
                <i class="bi bi-star-fill text-warning"></i>
                <small class="text-muted ms-1">4.5</small>
            </div>
        </div>
        
        <p class="card-text text-muted small" style="
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        ">
            Descripción del producto que puede ser un poco larga y necesita ser truncada en múltiples líneas.
        </p>
        
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex align-items-center">
                <h4 class="mb-0 me-2">$79.99</h4>
                <small class="text-muted text-decoration-line-through">$99.99</small>
            </div>
            <span class="badge bg-success-subtle text-success">En stock</span>
        </div>
        
        <div class="d-flex gap-2">
            <button class="btn btn-primary flex-fill">
                Agregar al carrito
            </button>
            <button class="btn btn-outline-secondary">
                <i class="bi bi-heart"></i>
            </button>
        </div>
    </div>
</div>

<!-- COMPARISON ANALYSIS -->
/*
TAILWIND CSS:
✅ Pros:
- Utility-first approach
- Highly customizable
- Smaller bundle size (when purged)
- No JavaScript dependencies
- Consistent design system
- Better performance

❌ Cons:
- Steeper learning curve
- Longer class names
- Requires build process
- Less pre-built components

BOOTSTRAP:
✅ Pros:
- Component-first approach
- Faster prototyping
- Extensive pre-built components
- Large community
- Easy to learn
- JavaScript components included

❌ Cons:
- Larger bundle size
- Less customization flexibility
- Generic look without customization
- Potential for unused CSS

BUNDLE SIZE COMPARISON:
- Tailwind (purged): ~10-20KB
- Bootstrap: ~150-200KB
- Tailwind (unpurged): ~3MB+

DEVELOPMENT SPEED:
- Bootstrap: Faster initial development
- Tailwind: Faster long-term maintenance

CUSTOMIZATION:
- Bootstrap: Limited without Sass
- Tailwind: Highly customizable

LEARNING CURVE:
- Bootstrap: Easier for beginners
- Tailwind: Requires understanding of CSS concepts
*/`,
    },

]
export const ejemplo_3: Ejemplo[] = [
    {
        id: 1,
        titulo: "Flexbox Layout Completo",
        descripcion: "Sistema de layout moderno con Flexbox",
        objetivo:
            "Crear un layout completo utilizando Flexbox para header, navegación, contenido principal y footer, demostrando las propiedades fundamentales y casos de uso prácticos.",

        codigo: `/* HTML Structure */
<div class="container">
    <header class="header">
        <div class="logo">Logo</div>
        <nav class="nav">
            <a href="#">Inicio</a>
            <a href="#">Servicios</a>
            <a href="#">Contacto</a>
        </nav>
    </header>
    
    <main class="main">
        <section class="content">
            <h1>Contenido Principal</h1>
            <p>Lorem ipsum dolor sit amet...</p>
        </section>
        <aside class="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li>Enlace 1</li>
                <li>Enlace 2</li>
            </ul>
        </aside>
    </main>
    
    <footer class="footer">
        <p>&copy; 2024 Mi Sitio Web</p>
    </footer>
</div>

/* CSS Flexbox */
.container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    background: #333;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav {
    display: flex;
    gap: 1rem;
}

.nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background 0.3s;
}

.nav a:hover {
    background: rgba(255, 255, 255, 0.1);
}

.main {
    flex: 1;
    display: flex;
    gap: 2rem;
    padding: 2rem;
}

.content {
    flex: 2;
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
}

.sidebar {
    flex: 1;
    background: #e0e0e0;
    padding: 1.5rem;
    border-radius: 8px;
}

.footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
    .header {
        flex-direction: column;
        gap: 1rem;
    }
    
    .main {
        flex-direction: column;
    }
    
    .nav {
        justify-content: center;
    }
}`,
    },
    {
        id: 2,
        titulo: "CSS Grid Dashboard",
        descripcion: "Dashboard responsivo con CSS Grid",
        objetivo:
            "Construir un dashboard complejo utilizando CSS Grid para crear layouts bidimensionales, demostrando grid areas, auto-fit, y responsive design avanzado.",

        codigo: `/* HTML Structure */
<div class="dashboard">
    <header class="header">Dashboard</header>
    <nav class="sidebar">
        <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Settings</a></li>
        </ul>
    </nav>
    <main class="main-content">
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Users</h3>
                <p class="stat-number">1,234</p>
            </div>
            <div class="stat-card">
                <h3>Revenue</h3>
                <p class="stat-number">$12,345</p>
            </div>
            <div class="stat-card">
                <h3>Orders</h3>
                <p class="stat-number">567</p>
            </div>
            <div class="stat-card">
                <h3>Growth</h3>
                <p class="stat-number">+23%</p>
            </div>
        </div>
        <div class="chart-section">
            <div class="chart-large">
                <h3>Sales Chart</h3>
                <div class="chart-placeholder">Chart goes here</div>
            </div>
            <div class="chart-small">
                <h3>Traffic</h3>
                <div class="chart-placeholder">Small chart</div>
            </div>
        </div>
    </main>
    <footer class="footer">© 2024 Dashboard</footer>
</div>

/* CSS Grid Layout */
.dashboard {
    min-height: 100vh;
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
    padding: 1rem;
    background: #f0f2f5;
}

.header {
    grid-area: header;
    background: #fff;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
}

.sidebar {
    grid-area: sidebar;
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar li {
    margin-bottom: 0.5rem;
}

.sidebar a {
    display: block;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: #333;
    border-radius: 6px;
    transition: background 0.3s;
}

.sidebar a:hover {
    background: #f0f2f5;
}

.main-content {
    grid-area: main;
    display: grid;
    gap: 1.5rem;
    grid-template-rows: auto 1fr;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.stat-card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
}

.stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #007bff;
    margin: 0.5rem 0 0 0;
}

.chart-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
}

.chart-large,
.chart-small {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-placeholder {
    height: 200px;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    border-radius: 4px;
}

.footer {
    grid-area: footer;
    background: #fff;
    padding: 1rem;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
    .dashboard {
        grid-template-areas:
            "header"
            "main"
            "sidebar"
            "footer";
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto auto;
    }
    
    .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
    
    .chart-section {
        grid-template-columns: 1fr;
    }
}`,
    },
    {
        id: 3,
        titulo: "Animaciones CSS Avanzadas",
        descripcion: "Efectos y transiciones fluidas",
        objetivo:
            "Crear animaciones CSS complejas utilizando keyframes, transforms, y transitions para mejorar la experiencia de usuario con efectos visuales atractivos y performantes.",

        codigo: `/* HTML Structure */
<div class="animation-showcase">
    <div class="card hover-card">
        <h3>Hover Effect</h3>
        <p>Pasa el mouse por encima</p>
    </div>
    
    <div class="card loading-card">
        <div class="spinner"></div>
        <h3>Loading Animation</h3>
    </div>
    
    <div class="card bounce-card">
        <h3>Bounce Effect</h3>
        <div class="bounce-ball"></div>
    </div>
    
    <div class="card slide-card">
        <h3>Slide In</h3>
        <p>Animación de entrada</p>
    </div>
</div>

/* CSS Animations */
.animation-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover Effects */
.hover-card {
    cursor: pointer;
    transform-origin: center;
}

.hover-card:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    color: white;
}

.hover-card:hover h3 {
    animation: pulse 1s infinite;
}

/* Loading Spinner */
.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Bounce Animation */
.bounce-ball {
    width: 30px;
    height: 30px;
    background: #e74c3c;
    border-radius: 50%;
    margin: 1rem auto;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

/* Slide In Animation */
.slide-card {
    animation: slideInFromRight 1s ease-out;
}

@keyframes slideInFromRight {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Pulse Animation */
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

/* Complex Keyframe Animation */
.loading-card {
    position: relative;
    overflow: hidden;
}

.loading-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
    );
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    0% {
        left: -100%;
    }
    100% {
        left: 100%;
    }
}

/* 3D Transform Effects */
.card:nth-child(even) {
    perspective: 1000px;
}

.card:nth-child(even):hover {
    transform: rotateY(15deg) rotateX(5deg);
}

/* Responsive Animations */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}`,
    },
    {
        id: 4,
        titulo: "Metodología BEM",
        descripcion: "Organización de CSS con BEM",
        objetivo:
            "Implementar la metodología BEM (Block Element Modifier) para crear CSS mantenible y escalable, demostrando la nomenclatura y estructura de componentes reutilizables.",

        codigo: `/* HTML Structure with BEM */
<div class="card card--featured">
    <div class="card__header">
        <h2 class="card__title">Título de la Tarjeta</h2>
        <span class="card__badge card__badge--new">Nuevo</span>
    </div>
    
    <div class="card__body">
        <p class="card__description">
            Descripción del contenido de la tarjeta
        </p>
        <div class="card__meta">
            <span class="card__date">15 Enero 2024</span>
            <span class="card__author">Por Juan Pérez</span>
        </div>
    </div>
    
    <div class="card__footer">
        <button class="button button--primary button--small">
            Leer más
        </button>
        <button class="button button--secondary button--small">
            Compartir
        </button>
    </div>
</div>

/* CSS with BEM Methodology */

/* BLOCK: card */
.card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
}

/* MODIFIER: card--featured */
.card--featured {
    border: 2px solid #007bff;
    transform: scale(1.02);
}

.card--featured .card__title {
    color: #007bff;
}

/* ELEMENT: card__header */
.card__header {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
    position: relative;
}

/* ELEMENT: card__title */
.card__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
}

/* ELEMENT: card__badge */
.card__badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
}

/* MODIFIER: card__badge--new */
.card__badge--new {
    background: #28a745;
    color: white;
}

/* MODIFIER: card__badge--popular */
.card__badge--popular {
    background: #ffc107;
    color: #333;
}

/* ELEMENT: card__body */
.card__body {
    padding: 1.5rem;
}

/* ELEMENT: card__description */
.card__description {
    margin: 0 0 1rem 0;
    color: #666;
    line-height: 1.6;
}

/* ELEMENT: card__meta */
.card__meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: #999;
}

/* ELEMENT: card__date, card__author */
.card__date,
.card__author {
    display: flex;
    align-items: center;
}

/* ELEMENT: card__footer */
.card__footer {
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
}

/* BLOCK: button */
.button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* MODIFIER: button--primary */
.button--primary {
    background: #007bff;
    color: white;
}

.button--primary:hover {
    background: #0056b3;
    transform: translateY(-1px);
}

/* MODIFIER: button--secondary */
.button--secondary {
    background: transparent;
    color: #6c757d;
    border: 1px solid #6c757d;
}

.button--secondary:hover {
    background: #6c757d;
    color: white;
}

/* MODIFIER: button--small */
.button--small {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
}

/* MODIFIER: button--large */
.button--large {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
}

/* MODIFIER: button--disabled */
.button--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}

/* Media Queries with BEM */
@media (max-width: 768px) {
    .card__header {
        padding: 1rem;
    }
    
    .card__body {
        padding: 1rem;
    }
    
    .card__footer {
        padding: 0.75rem 1rem;
        flex-direction: column;
    }
    
    .card__meta {
        flex-direction: column;
        gap: 0.5rem;
    }
}

/* BEM with CSS Custom Properties */
.card {
    --card-padding: 1.5rem;
    --card-border-radius: 8px;
    --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card--compact {
    --card-padding: 1rem;
}

.card--rounded {
    --card-border-radius: 16px;
}`,
    },
]
export const ejemplo_2: Ejemplo[] = [
    {
        id: 1,
        titulo: "Página HTML5 Semántica",
        descripcion: "Estructura completa con elementos semánticos",
        objetivo:
            "Crear una página web utilizando elementos semánticos de HTML5 para mejorar la accesibilidad, SEO y estructura del contenido.",
        codigo: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Blog personal sobre desarrollo web">
    <title>Mi Blog de Desarrollo Web</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="inicio">
            <h1>Bienvenido a mi Blog</h1>
            <p>Comparto mis experiencias en desarrollo web</p>
        </section>

        <section id="blog">
            <h2>Últimos Artículos</h2>
            <article>
                <header>
                    <h3>Introducción a HTML5</h3>
                    <time datetime="2024-01-15">15 de Enero, 2024</time>
                </header>
                <p>HTML5 introduce nuevos elementos semánticos...</p>
                <footer>
                    <p>Por: <strong>Tu Nombre</strong></p>
                </footer>
            </article>
        </section>
    </main>

    <aside>
        <h2>Sobre mí</h2>
        <p>Desarrollador web apasionado por las tecnologías modernas</p>
    </aside>

    <footer>
        <p>&copy; 2024 Mi Blog. Todos los derechos reservados.</p>
    </footer>
</body>
</html>`,
    },
    {
        id: 2,
        titulo: "Formulario Avanzado",
        descripcion: "Formulario con validación HTML5 y accesibilidad",
        objetivo:
            "Implementar un formulario completo utilizando los nuevos tipos de input de HTML5, validación nativa y mejores prácticas de accesibilidad.",
        codigo: `<form action="/submit" method="post" novalidate>
    <fieldset>
        <legend>Información Personal</legend>
        
        <div class="form-group">
            <label for="nombre">Nombre completo *</label>
            <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                required 
                minlength="2"
                aria-describedby="nombre-help"
            >
            <small id="nombre-help">Ingresa tu nombre y apellido</small>
        </div>

        <div class="form-group">
            <label for="email">Correo electrónico *</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                required
                aria-describedby="email-error"
            >
            <div id="email-error" class="error" aria-live="polite"></div>
        </div>

        <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input 
                type="tel" 
                id="telefono" 
                name="telefono"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
            >
        </div>

        <div class="form-group">
            <label for="fecha-nacimiento">Fecha de nacimiento</label>
            <input 
                type="date" 
                id="fecha-nacimiento" 
                name="fecha-nacimiento"
                min="1900-01-01"
                max="2024-12-31"
            >
        </div>

        <div class="form-group">
            <label for="sitio-web">Sitio web</label>
            <input type="url" id="sitio-web" name="sitio-web">
        </div>
    </fieldset>

    <fieldset>
        <legend>Preferencias</legend>
        
        <div class="form-group">
            <label for="experiencia">Años de experiencia</label>
            <input 
                type="range" 
                id="experiencia" 
                name="experiencia"
                min="0" 
                max="20" 
                value="5"
                oninput="this.nextElementSibling.value = this.value"
            >
            <output>5</output> años
        </div>

        <div class="form-group">
            <label for="color-favorito">Color favorito</label>
            <input type="color" id="color-favorito" name="color-favorito">
        </div>
    </fieldset>

    <button type="submit">Enviar formulario</button>
</form>`,
    },
    {
        id: 3,
        titulo: "Emmet Shortcuts Esenciales",
        descripcion: "Abreviaciones de Emmet para desarrollo rápido",
        objetivo:
            "Dominar las abreviaciones más útiles de Emmet para acelerar significativamente la escritura de código HTML y mejorar la productividad.",
        codigo: `/* Abreviaciones básicas de Emmet */

/* 1. Estructura HTML básica */
! + Tab
/* Genera: */
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>

/* 2. Elementos con clases e IDs */
div.container#main + Tab
/* Genera: <div class="container" id="main"></div> */

/* 3. Elementos anidados */
nav>ul>li*3>a + Tab
/* Genera: */
<nav>
    <ul>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
    </ul>
</nav>

/* 4. Elementos hermanos */
header+main+footer + Tab
/* Genera: */
<header></header>
<main></main>
<footer></footer>

/* 5. Multiplicación con numeración */
ul>li.item$*3 + Tab
/* Genera: */
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
</ul>

/* 6. Texto y atributos */
a[href="https://example.com"]{Enlace externo} + Tab
/* Genera: <a href="https://example.com">Enlace externo</a> */

/* 7. Formulario completo */
form>fieldset>legend{Datos personales}+input:text[name=nombre]+input:email[name=email]+button{Enviar} + Tab

/* 8. Grid layout */
.container>.row>.col-md-4*3 + Tab
/* Genera: */
<div class="container">
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
    </div>
</div>`,
    },
    {
        id: 4,
        titulo: "Multimedia Responsiva",
        descripcion: "Imágenes y videos adaptativos",
        objetivo:
            "Implementar contenido multimedia que se adapte a diferentes dispositivos usando técnicas modernas de HTML5 como srcset, picture y lazy loading.",


        codigo: `<!-- Imagen responsiva con srcset -->
<img 
    src="imagen-small.jpg" 
    srcset="
        imagen-small.jpg 480w,
        imagen-medium.jpg 800w,
        imagen-large.jpg 1200w
    "
    sizes="
        (max-width: 480px) 100vw,
        (max-width: 800px) 50vw,
        33vw
    "
    alt="Descripción de la imagen"
    loading="lazy"
>

<!-- Picture element para art direction -->
<picture>
    <source 
        media="(min-width: 800px)" 
        srcset="hero-desktop.webp"
        type="image/webp"
    >
    <source 
        media="(min-width: 800px)" 
        srcset="hero-desktop.jpg"
    >
    <source 
        media="(min-width: 400px)" 
        srcset="hero-tablet.webp"
        type="image/webp"
    >
    <source 
        media="(min-width: 400px)" 
        srcset="hero-tablet.jpg"
    >
    <source 
        srcset="hero-mobile.webp"
        type="image/webp"
    >
    <img 
        src="hero-mobile.jpg" 
        alt="Imagen principal del sitio"
        loading="lazy"
    >
</picture>

<!-- Video responsivo -->
<video 
    controls 
    preload="metadata"
    poster="video-poster.jpg"
    width="100%"
    height="auto"
>
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
    <track 
        kind="subtitles" 
        src="subtitles-es.vtt" 
        srclang="es" 
        label="Español"
        default
    >
    <p>Tu navegador no soporta video HTML5. 
       <a href="video.mp4">Descarga el video</a>
    </p>
</video>

<!-- Audio con múltiples formatos -->
<audio controls preload="none">
    <source src="audio.ogg" type="audio/ogg">
    <source src="audio.mp3" type="audio/mpeg">
    <p>Tu navegador no soporta audio HTML5.</p>
</audio>

<!-- Iframe responsivo -->
<div class="video-container">
    <iframe 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        title="Título del video"
        frameborder="0" 
        allowfullscreen
        loading="lazy"
    ></iframe>
</div>

<style>
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>`,
    },
]
export const ejemplo_1: Ejemplo[] = [
    {
        id: 1,
        titulo: "Configuración de VS Code",
        descripcion: "Setup completo de Visual Studio Code para desarrollo web",
        objetivo:
            "Configurar un entorno de desarrollo profesional con VS Code, extensiones esenciales y configuraciones optimizadas para productividad máxima.",

        codigo: `// settings.json - Configuración recomendada
{
  "editor.fontSize": 14,
  "editor.fontFamily": "Fira Code, Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}`,
    },
    {
        id: 2,
        titulo: "Primeros pasos con Git",
        descripcion: "Comandos básicos de Git y flujo de trabajo",
        objetivo:
            "Dominar los comandos fundamentales de Git para control de versiones, incluyendo inicialización de repositorios, commits, y colaboración básica.",

        codigo: `# Configuración inicial
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Inicializar repositorio
git init
git add .
git commit -m "Initial commit"

# Conectar con GitHub
git remote add origin https://github.com/usuario/repo.git
git push -u origin main

# Flujo básico de trabajo
git add archivo.txt
git commit -m "Descripción del cambio"
git push

# Ver estado y historial
git status
git log --oneline
git diff`,
    },
    {
        id: 3,
        titulo: "Estructura de Proyecto Web",
        descripcion: "Organización profesional de archivos y carpetas",
        objetivo:
            "Crear una estructura de proyecto escalable y mantenible que siga las mejores prácticas de la industria para desarrollo web.",

        codigo: `proyecto-web/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── styles/
│   │   ├── base/
│   │   ├── components/
│   │   └── utils/
│   ├── scripts/
│   │   ├── main.js
│   │   └── utils.js
│   └── components/
├── public/
│   ├── index.html
│   └── favicon.ico
├── docs/
├── tests/
├── .gitignore
├── README.md
├── package.json
└── package-lock.json`,
    },
    {
        id: 4,
        titulo: "Plan de Estudio Personal",
        descripcion: "Metodología SMART para objetivos de aprendizaje",
        objetivo:
            "Desarrollar un plan de estudio personalizado usando la metodología SMART para establecer objetivos claros, medibles y alcanzables en el desarrollo web.",

        codigo: `// Ejemplo de objetivo SMART
const objetivoSMART = {
  especifico: "Aprender HTML5 semántico",
  medible: "Crear 5 páginas web diferentes",
  alcanzable: "Dedicar 2 horas diarias",
  relevante: "Para mi carrera como frontend developer",
  temporal: "En 2 semanas",
  
  plan: [
    "Semana 1: Elementos básicos y semánticos",
    "Semana 2: Formularios y multimedia",
    "Proyecto final: Landing page completa"
  ],
  
  recursos: [
    "MDN Web Docs",
    "freeCodeCamp",
    "Práctica diaria en CodePen"
  ]
}`,
    },
]

interface Semanas {
    id: number;
    titulo: string;
    subtitulo: string;
    descripcion: string;
    icono: LucideIcon;
    color: string;
    tecnologias: string[];
    imagen: string;
    slug: string;

}

import {LucideIcon} from "lucide-react";
import {
    FileText,
    Code,
    Palette,
    Zap,
    Cpu,
    Component,
    Play,
} from "lucide-react";

interface SemanasProps {
    id: number;
    titulo: string;
    subtitulo: string;
    descripcion: string;
    icono: LucideIcon; // Cambiado de string a LucideIcon
    color: string;
    tecnologias: string[];
    imagen: string;
    slug: string;
}

export const Semanas: SemanasProps[] = [
    {
        id: 1,
        titulo: "Fundamentos y Sílabo",
        subtitulo: "Introducción al Desarrollo Web",
        descripcion: "Establecimiento de bases sólidas y planificación del viaje de aprendizaje en desarrollo web moderno.",
        icono: FileText,
        color: "from-blue-500 to-cyan-500",
        tecnologias: ["Planificación", "Metodología", "Objetivos"],
        imagen: "/placeholder.svg?height=300&width=400",
        slug: "semana-1-silabo",
    },
    {
        id: 2,
        titulo: "HTML & Emmet",
        subtitulo: "Estructura y Productividad",
        descripcion: "Dominio de HTML semántico y técnicas avanzadas de Emmet para desarrollo eficiente.",
        icono: Code,
        color: "from-orange-500 to-red-500",
        tecnologias: ["HTML5", "Emmet", "Semántica", "Accesibilidad"],
        imagen: "/placeholder.svg?height=300&width=400",
        slug: "semana-2-html-emmet",
    },
    {
        id: 3,
        titulo: "CSS Completo",
        subtitulo: "De Básico a Avanzado",
        descripcion: "Exploración completa de CSS desde fundamentos hasta técnicas avanzadas de diseño y animación.",
        icono: Palette,
        color: "from-purple-500 to-pink-500",
        tecnologias: ["CSS3", "Flexbox", "Grid", "Animaciones"],
        imagen: "/placeholder.svg?height=300&width=400",
        slug: "semana-3-css-avanzado",
    },
    {
        id: 4,
        titulo: "Frameworks CSS",
        subtitulo: "Tailwind & Bootstrap",
        descripcion: "Comparación y dominio de los frameworks CSS más populares para desarrollo rápido y eficiente.",
        icono: Zap,
        color: "from-green-500 to-teal-500",
        tecnologias: ["Tailwind CSS", "Bootstrap", "Utility-First", "Responsive"],
        imagen: "/placeholder.svg?height=300&width=400",
        slug: "semana-4-tailwind-bootstrap",
    },
    {
        id: 5,
        titulo: "JavaScript & TypeScript",
        subtitulo: "Programación Moderna",
        descripcion: "Fundamentos sólidos de JavaScript y transición a TypeScript para desarrollo tipado y escalable.",
        icono: Cpu,
        color: "from-yellow-500 to-orange-500",
        tecnologias: ["JavaScript ES6+", "TypeScript", "DOM", "Async/Await"],
        imagen: "/placeholder.svg?height=300&width=400",
        slug: "semana-5-javascript-typescript",
    },
    {
        id: 6,
        titulo: "Principios React",
        subtitulo: "React, Next.js & Vue",
        descripcion: "Introducción a los frameworks modernos de JavaScript y sus ecosistemas de desarrollo.",
        icono: Component,
        color: "from-cyan-500 to-blue-500",
        tecnologias: ["React", "Next.js", "Vue.js", "SPA"],
        imagen: "/placeholder.svg?height=300&width=400",
        slug: "semana-6-principios-react",
    },
    {
        id: 7,
        titulo: "React Avanzado",
        subtitulo: "Componentes & Hooks",
        descripcion: "Profundización en React con componentes avanzados, hooks personalizados y patrones de diseño.",
        icono: Play,
        color: "from-indigo-500 to-purple-500",
        tecnologias: ["React Hooks", "Custom Hooks", "Context", "Patterns"],
        imagen: "/placeholder.svg?height=300&width=400",
        slug: "semana-7-componentes-hooks",
    },
];