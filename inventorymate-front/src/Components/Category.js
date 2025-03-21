import React, { useState } from 'react';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    setCategories([...categories, newCategory]);
    setNewCategory('');
  };

  return (
    <div>
      <h1>Category Page</h1>

      {/* Add Category Form */}
      <div>
        <h2>Add Category</h2>
        <input 
          type="text" 
          placeholder="Category Name" 
          value={newCategory} 
          onChange={handleInputChange}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {/* Category Table */}
      <div>
        <h2>Category Table</h2>
        <table>
          <thead>
            <tr>
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
