import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    done: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    try {
      await onSubmit(formData);
      setFormData({ title: '', description: '', done: false });
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>Add New Task</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title..."
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)..."
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            name="done"
            checked={formData.done}
            onChange={handleChange}
            disabled={isLoading}
          />
          Mark as completed
        </label>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isLoading || !formData.title.trim()}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <Plus size={16} />
        {isLoading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;