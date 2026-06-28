import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';

export default function FilterBar({
  onSearch,
  onFilterStatus,
  onSort,
  onAddClick,
  isLoading
}) {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortValue, setSortValue] = useState('newest');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    onFilterStatus(value);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortValue(value);
    onSort(value);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="row g-3">

          {/* Search */}
          <div className="col-12 col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <FiSearch className="text-muted" />
              </span>

              <input
                type="text"
                className="form-control border-0"
                placeholder="Search tasks..."
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-12 col-sm-6 col-md-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={handleStatusFilter}
              disabled={isLoading}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Sort */}
          <div className="col-12 col-sm-6 col-md-3">
            <select
              className="form-select"
              value={sortValue}
              onChange={handleSort}
              disabled={isLoading}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">High Priority</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>

          {/* Add Button */}
          <div className="col-12 col-md-2 d-flex">
            <button
              className="btn btn-primary w-100"
              onClick={onAddClick}
              disabled={isLoading}
            >
              <FiPlus className="me-2" />
              <span className="d-none d-sm-inline">Add Task</span>
              <span className="d-inline d-sm-none">Add</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}