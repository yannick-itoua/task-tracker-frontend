import React from 'react';
import { Search, Filter } from 'lucide-react';

const TaskFilters = ({ 
  searchTerm, 
  onSearchChange, 
  filter, 
  onFilterChange,
  isLoading 
}) => {
  return (
    <div className="filters">
      <div className="search-box form-group" style={{ margin: 0 }}>
        <div style={{ position: 'relative' }}>
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#999'
            }} 
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={isLoading}
            style={{ 
              paddingLeft: '2.5rem',
              margin: 0
            }}
          />
        </div>
      </div>

      <div className="filter-buttons">
        <button
          onClick={() => onFilterChange('all')}
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          disabled={isLoading}
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          <Filter size={14} />
          All
        </button>
        
        <button
          onClick={() => onFilterChange('pending')}
          className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
          disabled={isLoading}
        >
          Pending
        </button>
        
        <button
          onClick={() => onFilterChange('completed')}
          className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          disabled={isLoading}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;