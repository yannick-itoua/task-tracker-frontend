import React from 'react';
import { ListTodo, CheckCircle2, Clock } from 'lucide-react';

const TaskStats = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <div className="stat-number">-</div>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <div className="stat-number">-</div>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <div className="stat-number">-</div>
        </div>
      </div>
    );
  }

  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>
          <ListTodo size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Total Tasks
        </h3>
        <div className="stat-number">{stats.total}</div>
      </div>
      
      <div className="stat-card">
        <h3>
          <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Completed
        </h3>
        <div className="stat-number" style={{ color: '#28a745' }}>
          {stats.completed}
        </div>
        {stats.total > 0 && (
          <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
            {completionPercentage}% complete
          </div>
        )}
      </div>
      
      <div className="stat-card">
        <h3>
          <Clock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Pending
        </h3>
        <div className="stat-number" style={{ color: '#ffc107' }}>
          {stats.pending}
        </div>
      </div>
    </div>
  );
};

export default TaskStats;