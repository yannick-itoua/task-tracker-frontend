# Task Tracker Frontend

React application for the Task Tracker system with modern UI components and real-time task management.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              React Application              │
├─────────────────────────────────────────────┤
│  Components Layer                           │
│  ├── App.jsx (Main container)              │
│  ├── TaskForm.jsx (Create/Edit tasks)      │
│  ├── TaskList.jsx (Display tasks)          │
│  ├── TaskItem.jsx (Individual task)        │
│  ├── TaskStats.jsx (Statistics)            │
│  └── TaskFilters.jsx (Search & Filter)     │
├─────────────────────────────────────────────┤
│  Services Layer                             │
│  └── taskService.js (API communication)    │
├─────────────────────────────────────────────┤
│  Styling                                    │
│  └── index.css (Global styles)             │
└─────────────────────────────────────────────┘
                    │
                    ▼ HTTP/Axios
        ┌─────────────────────┐
        │   Backend API       │
        │   (Spring Boot)     │
        └─────────────────────┘
```

## 🚀 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: CSS3 (Custom styles)
- **Development**: ESLint, Hot Reload
- **Production**: Nginx (Docker)

## ✨ Features

### 🎯 Core Functionality
- ✅ Create new tasks with title and description
- 🔄 Mark tasks as completed/pending
- ✏️ Real-time task updates
- 🗑️ Delete tasks with confirmation
- 🔍 Search tasks by title
- 🎯 Filter by completion status (All, Pending, Completed)

### 📊 Dashboard Features
- 📈 Live task statistics
- 📱 Fully responsive design
- ⚡ Optimistic UI updates
- 🎨 Modern, clean interface
- 🌙 Accessible design patterns

### 🔧 Technical Features
- 🚀 Fast development with Vite
- 📦 Component-based architecture
- 🔄 Debounced search functionality
- 🛡️ Error handling and validation
- 🐳 Docker containerization
- 📱 Mobile-first responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Backend API running (see backend README)

### Local Development

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd task-tracker-frontend
   npm install
   ```

2. **Environment Setup:**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env file
   VITE_API_URL=http://localhost:8080
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access application:**
   - Frontend: `http://localhost:3000`
   - Development server: `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
```

## 📁 Project Structure

```
src/
├── components/                 # React Components
│   ├── TaskForm.jsx           # Create/edit task form
│   ├── TaskList.jsx           # Task list container
│   ├── TaskItem.jsx           # Individual task component
│   ├── TaskStats.jsx          # Statistics display
│   └── TaskFilters.jsx        # Search and filter controls
├── services/                  # API Services
│   └── taskService.js         # Task API calls
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
└── index.css                  # Global styles

public/
├── index.html                 # HTML template
└── vite.svg                   # Vite logo

Configuration Files:
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables
├── Dockerfile                # Docker configuration
├── nginx.conf                # Nginx configuration
└── .dockerignore             # Docker ignore rules
```

## 🎨 Component Overview

### App.jsx
- Main application container
- State management for tasks, filters, and loading states
- Error handling and user feedback
- Coordinates all child components

### TaskForm.jsx
- Controlled form for creating new tasks
- Input validation and submission handling
- Real-time form state management
- Loading states during submission

### TaskList.jsx
- Displays list of tasks
- Empty state handling
- Loading indicators
- Responsive grid layout

### TaskItem.jsx
- Individual task display
- Toggle completion functionality
- Delete confirmation
- Responsive action buttons

### TaskStats.jsx
- Real-time statistics display
- Progress percentage calculation
- Visual indicators with icons
- Responsive card layout

### TaskFilters.jsx
- Search input with debouncing
- Filter buttons (All, Pending, Completed)
- Real-time filter application
- Accessible controls

## 🌐 API Integration

### Service Layer (taskService.js)

```javascript
// Get all tasks with optional filters
taskService.getAllTasks({ done: true, search: 'keyword' })

// CRUD operations
taskService.createTask(taskData)
taskService.updateTask(id, taskData)
taskService.toggleTask(id)
taskService.deleteTask(id)

// Statistics
taskService.getTaskStats()
```

### Error Handling
- Automatic retry for failed requests
- User-friendly error messages
- Network error detection
- Graceful degradation

### API Configuration
```javascript
// Base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Axios interceptors for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)
```

## 🎨 Styling

### Design System
- **Colors**: Blue primary (`#007bff`), semantic colors for states
- **Typography**: System font stack for readability
- **Spacing**: Consistent rem-based spacing
- **Components**: Card-based layout with shadows
- **Responsive**: Mobile-first breakpoints

### CSS Architecture
```css
/* Global Reset */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* Component Classes */
.container       /* Main layout container */
.task-form       /* Form styling */
.task-list       /* List container */
.task-item       /* Individual task */
.btn             /* Button base class */
.btn-primary     /* Primary button variant */

/* Responsive Design */
@media (max-width: 768px) { /* Mobile styles */ }
```

### Responsive Breakpoints
- **Mobile**: < 768px (Stack layout, full-width components)
- **Tablet**: 768px - 1024px (Responsive grid)
- **Desktop**: > 1024px (Full layout with sidebars)

## 🐳 Docker

### Development
```bash
# Build image
docker build -t task-tracker-frontend .

# Run container
docker run -p 3000:80 \
  -e VITE_API_URL=http://localhost:8080 \
  task-tracker-frontend
```

### Multi-stage Dockerfile
1. **Build stage**: Install dependencies and build app
2. **Production stage**: Serve with Nginx

### Nginx Configuration
- Gzip compression enabled
- Client-side routing support
- Security headers
- Static asset caching
- API proxy (optional)

## 🔧 Development

### State Management
The application uses React's built-in state management:
- `useState` for component state
- `useEffect` for side effects
- `useCallback` for performance optimization
- Custom hooks for API integration

### Performance Optimization
- **Debounced Search**: 300ms delay for search input
- **Optimistic Updates**: Immediate UI feedback
- **Efficient Re-renders**: Proper dependency arrays
- **Code Splitting**: Dynamic imports for large components

### Development Workflow
1. **Component Development**: Build components in isolation
2. **API Integration**: Test with backend API
3. **Responsive Testing**: Test on multiple screen sizes
4. **Error Handling**: Test error scenarios
5. **Performance**: Profile and optimize

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create task with valid data
- [ ] Create task with invalid data (validation)
- [ ] Search tasks by title
- [ ] Filter tasks by status
- [ ] Toggle task completion
- [ ] Delete task with confirmation
- [ ] Responsive design on mobile
- [ ] API error handling
- [ ] Loading states

### Future Testing Setup
```bash
# Unit tests with Vitest
npm install --save-dev vitest @testing-library/react

# Component testing with React Testing Library
npm install --save-dev @testing-library/jest-dom

# E2E testing with Playwright
npm install --save-dev @playwright/test
```

## 🚀 Deployment

### Environment Variables

#### Development
```env
VITE_API_URL=http://localhost:8080
```

#### Production
```env
VITE_API_URL=https://your-api-domain.com
```

### Railway Deployment
```bash
# Build and deploy
railway up

# Set environment variables in Railway dashboard
VITE_API_URL=https://your-backend-url.railway.app
```

### Netlify/Vercel
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Static Hosting
```bash
# Build for production
npm run build

# Serve dist/ folder with any static host
# Examples: AWS S3, GitHub Pages, Surge.sh
```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors:**
   ```bash
   # Check backend CORS configuration
   # Verify VITE_API_URL in .env file
   # Ensure backend is running
   ```

2. **Build Failures:**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Check Node.js version
   node --version  # Should be 18+
   ```

3. **API Connection Issues:**
   ```bash
   # Check backend status
   curl http://localhost:8080/api/tasks
   
   # Verify environment variables
   echo $VITE_API_URL
   ```

4. **Styling Issues:**
   ```bash
   # Check CSS imports
   # Verify responsive breakpoints
   # Test in different browsers
   ```

### Development Debugging

```javascript
// Enable detailed logging
console.log('API Response:', response.data)

// Check environment variables
console.log('API URL:', import.meta.env.VITE_API_URL)

// Debug component re-renders
useEffect(() => {
  console.log('Component updated:', { tasks, filter, searchTerm })
}, [tasks, filter, searchTerm])
```

## 📈 Performance Monitoring

### Key Metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/
```

## 🤝 Contributing

### Code Style
- Use functional components with hooks
- Follow component naming conventions
- Implement proper error boundaries
- Add prop validation where needed
- Write meaningful commit messages

### Component Guidelines
1. **Single Responsibility**: One component, one purpose
2. **Prop Drilling**: Avoid deep prop passing
3. **State Management**: Keep state as local as possible
4. **Error Handling**: Handle errors gracefully
5. **Accessibility**: Use semantic HTML and ARIA labels

---

For more information, see the main [project README](../README.md).