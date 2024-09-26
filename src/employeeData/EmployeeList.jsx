import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://interviewtesting.onrender.com/v1/users/employee/list"
        );
        const result = await response.json();
        console.log(result.data);
        if (Array.isArray(result.data)) {
          setEmployees(result.data);
        } else {
          console.error("Data is not an array:", result.data);
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);
  const handleDelete = async (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://interviewtesting.onrender.com/v1/users/employee-remove/${employeeId}`,
          {
            method: "DELETE",
          }
        );
        const result = await response.json();
        
        if (response.ok) {
          // Filter out the deleted employee from the state
          setEmployees(employees.filter((employee) => employee._id !== employeeId));
          console.log(result.message);
        } else {
          console.error("Failed to delete employee:", result.message);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <>
      <section className="table-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="head-title py-3">
                <h2 className="text-center">Employee List</h2>
              </div>
              <div className="col-lg-12">
                 <div className="add-employee">
                    <Link to='/EmployeePostForm'>Add Employee</Link>
                 </div>
              </div>
              <table className="table table-bordered table-hover table-striped table-success">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Full Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Salary</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees.map((employee) => (
                      <tr key={employee._id}>
                        <td>
                          <img
                            src={employee.image}
                            alt={employee.fullName}
                            width="50"
                            height="50"
                          />
                        </td>
                        <td>{employee.fullName}</td>
                        <td>{employee.age}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.salary}</td>
                        <td>
                         <div className="table-edit">
                         <Link to={`/EmployeeUpdate/${employee._id}`}>Edit</Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(employee._id)}
                          >
                            Delete
                          </button>
                         </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No employees found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default EmployeeList;
