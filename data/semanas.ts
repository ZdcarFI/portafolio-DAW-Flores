import {Code, Component, Cpu, FileText, LucideIcon, Palette, Play, Zap} from "lucide-react";

interface Ejemplo {
    id: number
    titulo: string
    descripcion: string
    reflexion: string
    codigo: string
}

export const ejemplo_7: Ejemplo[] = [
    {
        id: 1,
        titulo: "Hooks",
        descripcion: "useReducer, useCallback, useMemo y custom hooks",
        reflexion:
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
        titulo: "Performance Optimization",
        descripcion: "React.memo, code splitting y optimizaciones",
        reflexion:
            "Optimizar aplicaciones React usando memorización, code splitting, lazy loading y técnicas avanzadas de performance.",

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
]
export const ejemplo_6: Ejemplo[] = [
    {
        id: 1,
        titulo: "React Fundamentals",
        descripcion: "Componentes, JSX, Props y State con Hooks",
        reflexion:
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
        reflexion:
            "Implementar routing basado en archivos, API Routes y SSR/SSG en Next.js me hizo apreciar su poder como meta-framework. Descubrí que el rendimiento mejora radicalmente al elegir estratégicamente entre generación estática (SSG) para contenido fijo y renderizado en servidor (SSR) para datos dinámicos. El deployment automático en Vercel fue la cereza del pastel, demostrando la coherencia de su ecosistema.",

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
        titulo: "Framework Comparison",
        descripcion: "React vs Vue vs Angular - Comparación práctica",
        reflexion:
            "Al construir el mismo proyecto con los tres frameworks, comprendí que React ofrece flexibilidad a costa de más decisiones (state management, routing), Vue equilibra estructura y libertad con su sistema de SFC, mientras que Angular impone una arquitectura robusta ideal para equipos grandes. La elección depende del trade-off entre libertad de desarrollo y estructura predefinida.",

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


*/`,
    },
]
export const ejemplo_5: Ejemplo[] = [
    {
        id: 1,
        titulo: "JavaScript ES6+ Moderno",
        descripcion: "Características esenciales de JavaScript moderno",
        reflexion:
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
        reflexion:
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
        reflexion:
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
        reflexion:
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
        reflexion:
            "Configurar Tailwind desde cero me enseñó la importancia de optimizar el CSS para producción. Usar purgeCSS para eliminar estilos no utilizados mejoró drásticamente el rendimiento. Además, personalizar el archivo tailwind.config.js me permitió adaptar el framework a las necesidades específicas del diseño.",

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
        reflexion:
            "Trabajar con el sistema de grillas de Bootstrap reforzó mi comprensión del diseño responsivo. Aprovechar breakpoints, offsets y columnas anidadas me permitió crear layouts complejos sin escribir CSS personalizado, aunque con ciertas limitaciones en diseños altamente customizados.",

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
        reflexion:
            "Al implementar el mismo componente en Tailwind y Bootstrap, descubrí que Tailwind ofrece mayor control al trabajar con clases utilitarias, mientras que Bootstrap acelera el desarrollo con componentes preconstruidos. La clave está en elegir según el proyecto: Tailwind para diseños personalizados y Bootstrap para prototipado rápido.",

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
        reflexion:
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
        reflexion:
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
        reflexion:
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
]
export const ejemplo_2: Ejemplo[] = [
    {
        id: 1,
        titulo: "Página HTML5 Semántica",
        descripcion: "Estructura completa con elementos semánticos",
        reflexion:
            "Estructurar páginas con <article>, <section> y <nav> no es solo buenas prácticas: es comunicar significado a navegadores, motores de búsqueda y tecnologías asistivas. La semántica es el puente entre el código y su interpretación universal.",
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
        reflexion:
            " Implementar tipos como email, tel y atributos como pattern o aria-invalid elevó mi comprensión de la interacción usuario-interfaz.",
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
        reflexion:
            "Dominar Emmet fue un punto de inflexión en mi productividad. Estas abreviaciones no son simples atajos, sino un lenguaje que transforma cómo escribo HTML/CSS, reduciendo errores y acelerando mi flujo de trabajo de manera exponencial.",
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
        reflexion:
            "Al implementar imágenes y videos adaptativos, comprendí que el verdadero responsive va más allá del CSS. Usar <picture>, srcset y lazy loading no solo mejora el rendimiento, sino que garantiza una experiencia óptima en cualquier dispositivo – un requisito esencial en la web moderna.",
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
        reflexion:
            "Configurar un entorno de desarrollo profesional con VS Code, extensiones esenciales y configuraciones optimizadas para productividad máxima.",
        codigo: `// settings.json - Configuración recomendada
{
  "name": "mi-proyecto-web",
  "version": "1.0.0",
  "description": "Proyecto web moderno con Next.js y TypeScript",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "lucide-react": "^0.263.1",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "cross-env": "^7.0.3"
  },
  "keywords": [
    "nextjs",
    "react",
    "typescript",
    "tailwindcss",
    "web-development"
  ],
  "author": "Carlos Andre Johan Flores Ildefonso",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/tu-usuario/mi-proyecto-web.git"
  },
  "bugs": {
    "url": "https://github.com/tu-usuario/mi-proyecto-web/issues"
  },
  "homepage": "https://github.com/tu-usuario/mi-proyecto-web#readme"
}`,
    },
    {
        id: 2,
        titulo: "Primeros pasos con Git",
        descripcion: "Comandos básicos de Git y flujo de trabajo",
        reflexion:
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
        reflexion:
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

]


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
        tecnologias: ["Planificación", "Metodología", "Visual Studio Code"],
        imagen: "/Fundamentos.png",
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
        imagen: "/Html-emmet.webp",
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
        imagen: "/css.png",
        slug: "semana-3-css-basico-avanzado",
    },
    {
        id: 4,
        titulo: "Frameworks CSS",
        subtitulo: "Tailwind & Bootstrap",
        descripcion: "Comparación y dominio de los frameworks CSS más populares para desarrollo rápido y eficiente.",
        icono: Zap,
        color: "from-green-500 to-teal-500",
        tecnologias: ["Tailwind CSS", "Bootstrap", "Utility-First", "Responsive"],
        imagen: "/t-b.avif",
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
        imagen: "/js.webp",
        slug: "semana-5-javascript-typescript",
    },
    {
        id: 6,
        titulo: "Principios React",
        subtitulo: "React, Next.js & Vue",
        descripcion: "Introducción a los frameworks modernos de JavaScript y sus ecosistemas de desarrollo.",
        icono: Component,
        color: "from-cyan-500 to-blue-500",
        tecnologias: ["React", "Next.js", "Vue.js"],
        imagen: "/r-v.png",
        slug: "semana-6-principios-react",
    },
    {
        id: 7,
        titulo: "React Avanzado",
        subtitulo: "Componentes & Hooks",
        descripcion: "Profundización en React con componentes avanzados, hooks personalizados y patrones de diseño.",
        icono: Play,
        color: "from-indigo-500 to-purple-500",
        tecnologias: ["React Hooks", "Custom Hooks", "Context"],
        imagen: "/re-h.webp",
        slug: "semana-7-componentes-hooks",
    },
];