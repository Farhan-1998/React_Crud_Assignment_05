import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const EmployeePostForm = () => {
  const initialData = {
    fullName: '',
    email: '',
    phone: '',
    image: '',
    age: '',
    salary: '',
  };

  const [data, setData] = useState(initialData);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.email || !data.phone || !data.age || !data.salary) {
      setError("All fields are required.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const res = await fetch('https://interviewtesting.onrender.com/v1/users/employee/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
       console.log(data)
      if (!res.ok) {
        throw new Error('This is Already Exist');
      }

      const jsonResponse = await res.json();
      setResponse(jsonResponse);
      setError(null); 
      setData(initialData);
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <>
      <section className="postform">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <form onSubmit={handleSubmit} className='my-5'>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        placeholder="Full Name"
                        value={data.fullName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        placeholder="Phone"
                        value={data.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="text"
                        className="form-control"
                        name="image"
                        placeholder="Image URL"
                        value={data.image}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="number"
                        className="form-control"
                        name="age"
                        placeholder="Age"
                        value={data.age}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Salary</label>
                      <input
                        type="number"
                        className="form-control"
                        name="salary"
                        placeholder="Salary"
                        value={data.salary}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <button className="btn btn-primary mt-3 w-100" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>

              <div className="row">
                <div className="col-lg-12">
                  {/* Success/Failure Messages */}
              {response && <div className="alert alert-success mt-3">Employee created successfully!</div>}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
            <div className="add-employee">
                    <Link to='/'>Employee List</Link>
                 </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployeePostForm;
