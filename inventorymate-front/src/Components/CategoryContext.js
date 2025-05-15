// CategoryContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const CategoryContext = createContext();

// Create the provider component
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { id: 'C01', name: 'Food', description: 'Items like snacks, beverages' },
    { id: 'C02', name: 'Cleaning', description: 'Cleaning supplies like detergent' },
  ]);

  // Add a new category
  const addCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  // Update an existing category
  const updateCategory = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
    );
  };

  // Delete a category
  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, updateCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Optional: Export default for convenience
export default CategoryProvider;
