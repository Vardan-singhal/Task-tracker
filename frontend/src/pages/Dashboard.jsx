import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiCheckCircle, FiAlertCircle, FiClock, FiFlag, FiPlus } from 'react-icons/fi';
import taskApi from '../services/taskApi';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    sortBy: 'newest'
  });

 // Initial page load
useEffect(() => {
  fetchTasks(true);
}, []);

// Search / Filter / Sort
useEffect(() => {
  fetchTasks(false);
}, [filters]);

  const fetchTasks = async (showLoader = true) => {
  if (showLoader) {
    setIsLoading(true);
  }

  try {
    const response = await taskApi.getAllTasks(filters);
    setTasks(response.data.data);
    setStats(response.data.stats);
  } catch (error) {
    toast.error(error.message || 'Failed to load tasks');
    console.error(error);
  } finally {
    if (showLoader) {
      setIsLoading(false);
    }
  }
};

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsFormLoading(true);
    try {
      if (editingTask) {
        // Update existing task
        await taskApi.updateTask(editingTask._id, formData);
        toast.success('Task updated successfully');
      } else {
        // Create new task
        await taskApi.createTask(formData);
        toast.success('Task created successfully');
      }
      setShowForm(false);
      setEditingTask(null);
      await fetchTasks(true);
    } catch (error) {
      const errorMsg = error.response?.data?.errors?.[0]?.msg || 
                      error.message || 
                      'Failed to save task';
      toast.error(errorMsg);
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskApi.deleteTask(taskId);
      toast.success('Task deleted successfully');
      await fetchTasks(true);
    } catch (error) {
      toast.error(error.message || 'Failed to delete task');
    }
  };

const handleSearch = useCallback((searchValue) => {
  setFilters(prev => {
    if (prev.search === searchValue) return prev;
    return { ...prev, search: searchValue };
  });
}, []);

const handleFilterStatus = useCallback((status) => {
  setFilters(prev => {
    if (prev.status === status) return prev;
    return { ...prev, status };
  });
}, []);

const handleSort = useCallback((sortBy) => {
  setFilters(prev => {
    if (prev.sortBy === sortBy) return prev;
    return { ...prev, sortBy };
  });
}, []);


  const statCards = [
    {
      id: 1,
      title: 'Total Tasks',
      value: stats.total,
      icon: <FiCheckCircle size={28} />,
      bgClass: 'bg-primary'
    },
    {
      id: 2,
      title: 'Completed',
      value: stats.completed,
      icon: <FiCheckCircle size={28} />,
      bgClass: 'bg-success'
    },
    {
      id: 3,
      title: 'Pending',
      value: stats.pending,
      icon: <FiClock size={28} />,
      bgClass: 'bg-warning'
    },
    {
      id: 4,
      title: 'High Priority',
      value: stats.highPriority,
      icon: <FiFlag size={28} />,
      bgClass: 'bg-danger'
    }
  ];

  return (
    <div className="container-fluid py-4">
      {/* Stats Cards */}
      <div className="row mb-4 g-3">
        {statCards.map(card => (
          <div key={card.id} className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted small mb-1">{card.title}</p>
                    <h3 className="mb-0">{card.value}</h3>
                  </div>
                  <div className={`text-white p-3 rounded ${card.bgClass}`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <FilterBar
        onSearch={handleSearch}
        onFilterStatus={handleFilterStatus}
        onSort={handleSort}
        onAddClick={handleAddTask}
        isLoading={isLoading}
      />

      {/* Tasks Grid */}
      {isLoading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <div className="text-center py-5">
          <FiAlertCircle size={64} className="text-muted mb-3" />
          <h4 className="text-muted">No Tasks Found</h4>
          <p className="text-muted">Create your first task to get started!</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={handleAddTask}
          >
            <FiPlus className="me-2" />
            Create New Task
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {tasks.map(task => (
            <div key={task._id} className="col-12 col-md-6 col-lg-4">
              <TaskCard
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </div>
          ))}
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          isLoading={isFormLoading}
        />
      )}
    </div>
  );
}

