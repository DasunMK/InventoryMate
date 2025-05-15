import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import ItemPage from './Components/Item';
import UserPage from './Components/User';
import CategoryPage from './Components/Category';
import GRNPage from './Components/GRNPage';
import AddCategoryPage from './Components/AddCategory';


import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080'; 





const App = () => {

  
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/grn" element={<GRNPage />} />
          <Route path="/AddCategory" element={<AddCategoryPage onAddCategory={handleAddCategory} />} />
        </Routes>

      
       
      </div>
    </Router>
  );
};

const handleAddCategory = (newCategory) => {
    console.log("New category added:", newCategory);}

export default App;