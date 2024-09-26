// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './employeeData/EmployeeList';
import EmployeePostForm from './employeeData/EmployeePostForm';
import EmployeeUpdate from './employeeData/EmployeeUpdate';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/EmployeePostForm" element={<EmployeePostForm />} />
          <Route path="/EmployeeUpdate/:id" element={<EmployeeUpdate />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
