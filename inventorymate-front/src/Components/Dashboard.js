import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/items">Item Page</Link></li>
          <li><Link to="/users">User Page</Link></li>
          <li><Link to="/categories">Category Page</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
