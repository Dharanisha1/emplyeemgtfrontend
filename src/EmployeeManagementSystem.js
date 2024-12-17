import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './App.css';

const EmployeeManagementSystem = () => {
  const [employees, setEmployees] = useState([]);
  
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    employee_id: '',
    manager_id: '',
    department_name: ''  
  });
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  useEffect(() => {
    fetchEmployees();
   
    fetchManagers();  
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/employees/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

 

  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/employees/');
      setManagers(response.data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post(`http://localhost:3001/api/employees/`, formData);
      fetchEmployees();
      resetForm();
    } catch (error) {
      console.error('Error adding employee:', error.response.data);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      await axios.put(`http://localhost:3001/api/employees/${editingEmployeeId}`, formData);
      fetchEmployees();
      resetForm();
    } catch (error) {
      console.error('Error updating employee:', error.response.data);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
        try {
            await axios.delete(`http://localhost:3001/api/employees/${id}`);
            fetchEmployees(); // Refresh the employee list
        } catch (error) {
            console.error('Error deleting employee:', error.response?.data || error.message);
        }
    }
};


  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone_number: '',
      employee_id: '',
      manager_id: '',
      department_name: ''  // Resetting department_name
    });
    setEditingEmployeeId(null);
  };

  const startEditEmployee = (employee) => {
    setFormData(employee);
    setEditingEmployeeId(employee.id);
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>
      <div>
        <h2>{editingEmployeeId ? 'Edit Employee' : 'Add Employee'}</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="employee_id"
            placeholder="Employee ID"
            value={formData.employee_id}
            onChange={handleInputChange}
            required
          />
          <select
            name="manager_id"
            value={formData.manager_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Manager</option>
            {managers.map(manager => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
          <select
            name="department_name"
            value={formData.department_name}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Department</option>
            {/* 5 specific department names added here */}
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
          </select>
          <button
            type="button"
            onClick={editingEmployeeId ? handleUpdateEmployee : handleAddEmployee}
          >
            {editingEmployeeId ? 'Update Employee' : 'Add Employee'}
          </button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      </div>
      <div>
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Manager</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone_number}</td>
                <td>{managers.find(m => m.id === employee.manager_id)?.name || 'N/A'}</td>
                <td>{employee.department_name}</td>
                <td>
                  <button className="edit" onClick={() => startEditEmployee(employee)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => handleDeleteEmployee(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagementSystem;