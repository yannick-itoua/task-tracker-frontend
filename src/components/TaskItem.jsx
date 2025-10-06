import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete, isLoading }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`task-item ${task.done ? 'completed' : ''}`}>
      <button
        onClick={() => onToggle(task.id)}
        disabled={isLoading}
        className="task-checkbox"
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          padding: 0,
          color: task.done ? '#28a745' : '#6c757d'
        }}
      >
        {task.done ? <CheckCircle size={20} /> : <Circle size={20} />}
      </button>

      <div className="task-content">
        <h3 className={`task-title ${task.done ? 'completed' : ''}`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          Created: {formatDate(task.createdAt)}
          {task.updatedAt && (
            <span> • Updated: {formatDate(task.updatedAt)}</span>
          )}
        </div>

        <div className="task-actions">
          <button
            onClick={() => onToggle(task.id)}
            disabled={isLoading}
            className={`btn btn-sm ${task.done ? 'btn-secondary' : 'btn-success'}`}
          >
            {task.done ? 'Mark Pending' : 'Mark Complete'}
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            disabled={isLoading}
            className="btn btn-sm btn-danger"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;