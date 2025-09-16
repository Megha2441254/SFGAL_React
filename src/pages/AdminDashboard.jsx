import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setUserData(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!userData) {
    return null; // or a loading spinner
  }

  return (
    <div className="main-content">
      <div className="container dashboard-page-container">
        <h2>Welcome Admin</h2>
        <p>Logged in as: <span id="user-full-name">{userData.fullName}</span></p>
        <p>Employee ID: <span id="user-employee-id">{userData.employeeId}</span></p>
        <p>Manage employee access logs and settings here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;