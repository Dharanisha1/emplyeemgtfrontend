import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeManagementSystem from './EmployeeManagementSystem';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeManagementSystem />} />
      </Routes>
    </Router>
  );
};

export default App;
