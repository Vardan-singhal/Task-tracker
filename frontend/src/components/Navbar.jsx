import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center gap-2" href="/">
          <FiCheckCircle size={32} className="text-primary" />
          <span className="fw-bold">TaskTracker Pro</span>
        </a>
        <span className="navbar-text text-muted">
          Professional Task Management
        </span>
      </div>
    </nav>
  );
}
