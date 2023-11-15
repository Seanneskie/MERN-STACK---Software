import React, { useState } from 'react';
import '../static/css/register.css'
import Header from '../components/header';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Registration was successful
        const data = await response.json();
        console.log('Registration successful', data);
  
        // Optionally, reset the form data after successful registration
        setFormData({
          username: '',
          email: '',
          password: '',
          role: '',
        });
      } else {
        // Registration failed
        const errorData = await response.json();
        console.error('Registration failed', errorData);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error', error);
    }
  };
  

  return (
    <div> 
        <Header /> 
        <div className='main'>
        <form onSubmit={handleSubmit}>
            <div className="registration-container">
            <h2>Registration Form</h2>
            <label>Username:</label>

            <input
                className="registration-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <label>Email:</label>

            <input
                className="registration-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <label>Password:</label>

            <input
                className="registration-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <label>Role: </label> 
            <br />
            <select
                className="registration-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
            >
                <option value="">Select Role</option>
                <option value="user">User</option>
            </select>
            <button type="submit" className="registration-button">
                Register
            </button>
    
            </div>
        </form>
        </div>  
    </div>

  );
}

export default RegistrationForm;
