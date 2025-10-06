import React from 'react';
import TaskItem from './TaskItem';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

const TaskList = ({ tasks, onToggle, onDelete, isLoading, filter }) => {
  if (isLoading) {
    return (
      <div className="loading">
        <div>Loading tasks...</div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    const getEmptyMessage = () => {
      switch (filter) {
        case 'completed':
          return {
            icon: <CheckCircle2 size={48} />,
            title: 'No completed tasks',
            message: 'Complete some tasks to see them here.'
          };
        case 'pending':
          return {
            icon: <Clock size={48} />,
            title: 'No pending tasks',
            message: 'Great job! All tasks are completed.'
          };
        default:
          return {
            icon: <ListTodo size={48} />,
            title: 'No tasks yet',
            message: 'Add your first task to get started!'
          };
      }
    };

    const { icon, title, message } = getEmptyMessage();

    return (
      <div className="empty-state">
        <div style={{ marginBottom: '1rem', opacity: 0.5 }}>
          {icon}
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default TaskList;