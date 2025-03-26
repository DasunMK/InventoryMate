import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import ItemPage from './Components/Item';
import UserPage from './Components/User';
import CategoryPage from './Components/Category';
import GRNPage from './Components/GRNPage';

import axios from 'axios';

// ✅ Set default base URL for all API requests
axios.defaults.baseURL = 'http://localhost:8080'; // Adjust if your backend runs elsewhere

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/grn" element={<GRNPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
