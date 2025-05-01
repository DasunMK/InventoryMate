import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import CreateItemForm from './components/Item/CreateItemForm';
import ItemsList from './components/Item/ItemList';
import UpdateItemForm from './components/Item/UpdateItemForm';
import AIBasedSuggestions from './components/Ai/AIBasedSuggestions';

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Routes>
          <Route path="/create" element={<CreateItemForm />} />
          <Route path="/list" element={<ItemsList />} />
          <Route path="/update/:id" element={<UpdateItemForm />} />
          <Route path="/ai" element={<AIBasedSuggestions />} />
          {/* Default route: redirect to list */}
          <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
