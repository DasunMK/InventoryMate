import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { id: 'C01', name: 'Food', description: 'Items like snacks, beverages' },
    { id: 'C02', name: 'Cleaning', description: 'Cleaning supplies like detergent' },
  ]);

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (updatedCategory) => {
    setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, updateCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
