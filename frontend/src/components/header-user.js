// HeaderUser.js
import { useNavigate } from 'react-router-dom'; // Import useNavigate from your router library
import React from 'react';
import '../static/css/header.css';


function HeaderUser() {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogout = () => {
        try {
        // Remove the user's authentication token from local storage or cookies
        localStorage.removeItem('userToken');

        // Redirect the user to the login page or the home page, depending on your application's requirements
        navigate('/'); // Redirect to the login page

        // Optionally, you can perform other cleanup tasks, such as clearing user data from state
        } catch (error) {
        console.error('Logout error:', error);
        }
    };
  return ( 
    <header>
        <div className='title-container'>
            <h1> Go Green Cafe</h1>
        
        </div>
        
        <div className='navigation'>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
    </header>
       
  )
    

}

export default HeaderUser;
    
    
