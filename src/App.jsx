import React, { useState, useEffect, useCallback } from 'react';
import { taskService } from './services/taskService';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import TaskFilters from './components/TaskFilters';
import { CheckSquare } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

  // Load tasks with current filters
  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const filters = {};
      
      if (filter === 'pending') filters.done = false;
      if (filter === 'completed') filters.done = true;
      if (searchTerm.trim()) filters.search = searchTerm.trim();
      
      const tasksData = await taskService.getAllTasks(filters);
      setTasks(tasksData);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filter, searchTerm]);

  // Load task statistics
  const loadStats = useCallback(async () => {
    try {
      const statsData = await taskService.getTaskStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  }, []);

  // Load data on component mount and when filters change
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Create new task
  const handleCreateTask = async (taskData) => {
    setIsLoading(true);
    try {
      await taskService.createTask(taskData);
      await Promise.all([loadTasks(), loadStats()]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle task completion
  const handleToggleTask = async (taskId) => {
    setIsLoading(true);
    try {
      await taskService.toggleTask(taskId);
      await Promise.all([loadTasks(), loadStats()]);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error toggling task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsLoading(true);
    try {
      await taskService.deleteTask(taskId);
      await Promise.all([loadTasks(), loadStats()]);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadTasks();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, loadTasks]);

  return (
    <div className="container">
      <header className="header">
        <h1>
          <CheckSquare 
            size={40} 
            style={{ 
              display: 'inline', 
              marginRight: '0.5rem', 
              color: '#007bff' 
            }} 
          />
          Task Tracker
        </h1>
        <p>Stay organized and get things done!</p>
      </header>

      {error && (
        <div className="error">
          {error}
          <button 
            onClick={() => setError(null)}
            style={{ 
              float: 'right', 
              background: 'none', 
              border: 'none', 
              color: 'inherit',
              cursor: 'pointer',
              padding: 0,
              fontWeight: 'bold'
            }}
          >
            ×
          </button>
        </div>
      )}

      <TaskStats stats={stats} isLoading={isLoading} />

      <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />

      <TaskFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
        isLoading={isLoading}
      />

      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        isLoading={isLoading}
        filter={filter}
      />
    </div>
  );
}

export default App;