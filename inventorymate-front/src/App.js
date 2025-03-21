import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import ItemPage from './Components/Item';
import UserPage from './Components/User';
import CategoryPage from './Components/Category';
import GRNPage from './Components/GRNPage';
 

const App = () => {
  return (
    <Router>
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
