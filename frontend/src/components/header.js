// Header.js

import React from 'react';
import '../static/css/header.css';


function Header() {
  return (
    <header>
        <nav>
        <div className='header-container'>
          <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">About</a></li>
              <li><a href="/">Contact</a></li>
          </ul>
        </div>
       
        </nav>
    </header>
  );
}

export default Header;
