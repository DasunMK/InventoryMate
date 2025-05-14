import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import ItemPage from './Components/Item';
import UserPage from './Components/User';
import CategoryPage from './Components/Category';
import GRNPage from './Components/GRNPage';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import UserManagementPage from './Components/UserManagement';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/usermanagement" element={<UserManagementPage />} />
        </Routes>

      
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
};

export default App;
