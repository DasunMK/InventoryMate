// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS for Navbar styling
import logo from '../assets/images/logo.png';  // Import your logo image

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="POS System Logo" className="logo-img" />
          
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/Items">Items</Link>
          </li>
          <li>
            <Link to="/grn">Add stock</Link>
          </li>
          <li>
            <Link to="/categories">Category</Link>
          </li>
          <li>
            <Link to="/usermanagement">Users</Link>
          </li>

        </ul>
        <div className="navbar-buttons">
          <Link to="/login">
            <button className="navbar-btn signup-btn">Log In</button>
          </Link>
          <Link to="/register">
          <button className="navbar-btn logout-btn">Sign up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
