import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    salary: '',
    image: ''
  });
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://interviewtesting.onrender.com/v1/users/employee/${id}`);
        const result = await response.json();
        setEmployee(result.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, [id]);
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://interviewtesting.onrender.com/v1/users/employee-update/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Employee updated successfully:", result.message);
        navigate('/');
      } else {
        console.error("Failed to update employee:", result.message);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  return (
    <section className="edit-employee-section">
      <div className="container">
        <h2>Update Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={employee.fullName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={employee.age}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={employee.image}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn">Update Employee</button>
        </form>
      </div>
    </section>
  );
};

export default EmployeeUpdate;
