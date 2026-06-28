import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const priorityColors = {
    Low: 'badge-info',
    Medium: 'badge-warning',
    High: 'badge-danger'
  };

  const statusColors = {
    Pending: 'badge-secondary',
    'In Progress': 'badge-primary',
    Completed: 'badge-success'
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      onDelete(task._id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <div className="card h-100 shadow-sm hover-shadow transition">
      <div className="card-body d-flex flex-column">
        {/* Title */}
        <h5 className="card-title mb-2 text-truncate" title={task.title}>
          {task.title}
        </h5>

        {/* Description */}
        {task.description && (
          <p className="card-text text-muted small mb-3" style={{ minHeight: '2rem' }}>
            {task.description.length > 100 
              ? task.description.substring(0, 100) + '...' 
              : task.description
            }
          </p>
        )}

        {/* Status and Priority Badges */}
        <div className="mb-3 d-flex gap-2 flex-wrap">
          <span className={`badge ${statusColors[task.status]}`}>
            {task.status}
          </span>
          <span className={`badge ${priorityColors[task.priority]}`}>
            {task.priority} Priority
          </span>
          {isOverdue && (
            <span className="badge bg-danger">Overdue</span>
          )}
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="mb-3 d-flex align-items-center gap-2 text-muted small">
            <FiCalendar size={16} />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary flex-grow-1"
            onClick={() => onEdit(task)}
            disabled={isDeleting}
            title="Edit task"
          >
            <FiEdit2 size={16} className="me-1" />
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger flex-grow-1"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete task"
          >
            {isDeleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" />
                Deleting...
              </>
            ) : (
              <>
                <FiTrash2 size={16} className="me-1" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Custom styles (add to main CSS)
const styles = `
.hover-shadow {
  transition: box-shadow 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-2px);
}

.transition {
  transition: transform 0.3s ease;
}
`;
