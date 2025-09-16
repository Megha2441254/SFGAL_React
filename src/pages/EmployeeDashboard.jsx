import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'employee') {
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
        <h2>Welcome Employee</h2>
        <p>Logged in as: <span id="user-full-name">{userData.fullName}</span></p>
        <p>Employee ID: <span id="user-employee-id">{userData.employeeId}</span></p>
        <p>Your access logs will appear here.</p>
      </div>
    </div>
  );
};

export default EmployeeDashboard;