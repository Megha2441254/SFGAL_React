import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
 
function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
 
  const handleLogin = (username, password) => {
    // Sample admin credentials
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };
 
  return (
    <div className='dash'>
      {isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />}
    </div>
  );
}
 
export default AdminDashboard;