import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('user'); // Set the default role (you can modify this as needed)
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Example: Send a POST request to your authentication endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }), // Include role in the request body
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.token);

        // Store the user's authentication token in state or a cookie (if needed)
        console.log(data);

        // Check the user's role and redirect based on the role
        if (data.role === 'admin') {
          navigate('/admin'); // Redirect admin to their page
        } else if (data.role === 'user') {
          navigate('/home'); // Redirect user to their page
        } else {
          // Handle unknown roles or any other redirection logic
          navigate('/'); // Redirect to the home page by default
        }

        // Optionally, you can also refresh the page to ensure that the user's data is updated

      } else {
        // Handle login failure, show an error message, etc.
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='main'>
      <div className="login-container">
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='button-container'> 
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <button type="button" >
            <a href='/register'>Register</a>
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
