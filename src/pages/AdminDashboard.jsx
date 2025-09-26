import React, { useState, useEffect, useMemo } from 'react';
// Import the new components for the Admin view
import AdminNavigation from './AdminNavigation'; 
import KpiCards from './KpiCards'; 

// Import the shared CSS file which contains:
// .employee-main-content, .dashboard-split-screen, .dashboard-column, etc.
import './Dashboard.css'; 
// Note: Unique Admin component styles are imported directly in AdminNavigation.jsx and KpiCards.jsx

// --- Sample Data and Initialization ---
function Dashboard({ onLogout }) {
    // State for navigation/content switching
    const [activeView, setActiveView] = useState('overview'); 

    // State for data and filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [filteredEmployee, setFilteredEmployee] = useState(null);
    const [message, setMessage] = useState('');
    
    // MOCK KPI DATA - Dynamic count for totalEmployees
    const kpiData = {
        totalEmployees: employees.length,
        activeGates: 12, 
        accessViolations: 3, 
        pendingTasks: 4, 
    };
    
    // 1. Fetch all employees on mount
    useEffect(() => {
        // NOTE: No need to check localStorage/navigate here, as parent AdminDashboard handles it.
        fetch('https://localhost:7215/api/User/AllUsers')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch employee data');
                return response.json();
            })
            .then(data => {
                // Mock status/dept for display consistency
                const mockedData = data.map((emp, index) => ({
                    ...emp,
                    access_status: index % 5 === 0 ? 'suspended' : 'active', 
                    department: emp.department || 'Production',
                    role: emp.role || 'Operator'
                }));
                setEmployees(mockedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    // Enhanced Search/Filter logic for the Employee Management Table
    const filteredEmployeesList = useMemo(() => {
        if (!searchTerm) return employees;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return employees.filter(emp =>
            (emp.full_name && emp.full_name.toLowerCase().includes(lowerCaseSearch)) ||
            (emp.employee_id && emp.employee_id.toString().includes(lowerCaseSearch))
        );
    }, [employees, searchTerm]);
    
    // Search employee by name (for the single employee view in 'overview' mode)
    const handleSearch = () => {
        const result = employees.find(emp =>
            emp.full_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployee(result || null);
        setMessage('');
    };
    
    // Delete employee access logs (retained)
    const handleDelete = async () => {
        if (!filteredEmployee) return;
        
        if (!window.confirm(`Are you sure you want to delete ALL access logs for Employee ID: ${filteredEmployee.employee_id}?`)) return;

        try {
            const response = await fetch(`https://localhost:7215/api/Delete/users/employee/${filteredEmployee.employee_id}`, {
                method: 'DELETE'
            });
    
            const result = await response.json();
            if (result.success) {
                setMessage('✅ Access logs deleted successfully.');
                setFilteredEmployee(null);
                setSearchTerm('');
            } else {
                setMessage(result.message || '❌ Failed to delete access logs.');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            setMessage('❌ Error deleting access logs.');
        }
    };
 
    // 4. Content Renderer for the Right Column
    const renderRightColumnContent = () => {
        switch (activeView) {
            case 'employees':
                // Renders the full Employee Management Table
                return (
                    <>
                        <div className="admin-section-header">
                            <h2 className="admin-content-title">Employee Management</h2>
                            <button className="admin-add-btn">➕ Add New Employee</button>
                        </div>
                        
                        <input
                            type="text"
                            placeholder="Search by Name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="admin-table-search-input"
                        />
                        <p className="admin-results-count">{filteredEmployeesList.length} Employees Found</p>

                        <table className="admin-employee-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployeesList.map(emp => (
                                    <tr key={emp.employee_id}>
                                        <td>{emp.employee_id}</td>
                                        <td>{emp.full_name}</td>
                                        <td>{emp.department}</td>
                                        <td><span className={`admin-status-tag admin-status-${emp.access_status}`}>{emp.access_status}</span></td>
                                        <td>
                                            <button className="admin-action-btn admin-view-btn">View</button>
                                            <button className="admin-action-btn admin-delete-btn" onClick={() => handleDelete(emp.employee_id)}>Delete Logs</button> 
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                );

            case 'access':
                return <h2 className="admin-content-title">Access Control & Gate Settings</h2>;
            case 'reports':
                return <h2 className="admin-content-title">Reports & Analytics</h2>;
            
            case 'overview':
            default:
                // Default View: KPIs and Quick Lookup
                return (
                    <>
                        <h2 className="admin-content-title">Dashboard Overview</h2>
                        <KpiCards {...kpiData} />
                        
                        <div className="admin-search-summary-section">
                            <h3>Quick Employee Lookup</h3>
                            <div className="admin-search-section-mini">
                                <input
                                    type="text"
                                    placeholder="Search employee by name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button onClick={handleSearch}>Search</button>
                            </div>
                            
                            {/* Employee Details Card (Original Functionality) */}
                            {filteredEmployee ? (
                                <div className="admin-employee-details-card">
                                    <div className='admin-details-text'>
                                        <h3>{filteredEmployee.full_name}</h3>
                                        <p><strong>ID:</strong> {filteredEmployee.employee_id}</p>
                                        <p><strong>Department:</strong> {filteredEmployee.department}</p>
                                        <button onClick={handleDelete} className="admin-delete-logs-btn">
                                            Delete Access Logs
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                searchTerm && <p className="admin-no-results">No employee found with that name.</p>
                            )}
                        </div>
                    </>
                );
        }
    };
 
    // Main Admin Dashboard Structure (Split Screen)
    return (
        // Reusing .employee-main-content (max-width + margin: auto) for centering
        <div className="employee-main-content"> 
            <div className="dashboard-split-screen">
                
                {/* LEFT COLUMN: Fixed Navigation Card */}
                <div className="dashboard-column dashboard-left-column">
                    {/* Replaced Employee content with Admin Navigation */}
                    <AdminNavigation 
                        setActiveView={setActiveView} 
                        activeView={activeView} 
                        onLogout={onLogout} 
                    /> 
                </div>

                {/* RIGHT COLUMN: Dynamic Content */}
                <div className="dashboard-column dashboard-right-column">
                    {/* Message display for success/error */}
                    {message && <p className="admin-system-message">{message}</p>}
                    {renderRightColumnContent()}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;