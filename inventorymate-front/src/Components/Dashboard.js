import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the updated stylesheet
import { FaBox, FaShoppingCart, FaBell, FaCog } from 'react-icons/fa'; // Importing some icons

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Home Inventory Dashboard</h1>
      
      <div className="overview-section">
        <h2>Inventory Overview</h2>
        <div className="overview-card">
          <FaBox className="icon" />
          <p><strong>Total Items in Stock:</strong> 150</p>
          <p><strong>Items Running Low:</strong> 10</p>
          <p><strong>Categories:</strong> Food, Beverages, Toiletries</p>
        </div>
      </div>

      <div className="quick-add">
        <button className="quick-add-btn">Quick Add New Item</button>
      </div>

      <div className="alerts-section">
        <h2>Low Stock Alert</h2>
        <div className="alert-card">
          <FaBell className="icon" />
          <p><strong>Item:</strong> Milk</p>
          <p><strong>Quantity:</strong> 2 units left</p>
          <p><strong>Expiration Date:</strong> 2023-12-01</p>
        </div>
      </div>

      <div className="activity-section">
        <h2>Recent Activity</h2>
        <ul>
          <li>Added: Milk - 2 units</li>
          <li>Updated: Shampoo - Price change</li>
          <li>Deleted: Rice - Expired</li>
        </ul>
      </div>

      <div className="cost-overview">
        <h2>Cost Overview</h2>
        <div className="cost-card">
          <FaShoppingCart className="icon" />
          <p><strong>Total Cost of Inventory:</strong> $350</p>
          <p><strong>Food:</strong> $120</p>
          <p><strong>Beverages:</strong> $80</p>
          <p><strong>Toiletries:</strong> $150</p>
        </div>
      </div>

      {/* <nav className="dashboard-nav">
        <ul>
          <li><Link to="/items">Item Page</Link></li>
          <li><Link to="/users">User Page</Link></li>
          <li><Link to="/categories">Category Page</Link></li>
        </ul>
      </nav> */}
    </div>
  );
};

export default Dashboard;
