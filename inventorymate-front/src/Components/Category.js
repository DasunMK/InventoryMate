import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // This is required to extend jsPDF with autoTable
import { CategoryContext } from './CategoryContext';
import './Category.css';

const Category = () => {
  const { categories, deleteCategory, updateCategory } = useContext(CategoryContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;
    if (!categoryName.trim()) {
      formErrors.categoryName = 'Category Name is required';
      isValid = false;
    }
    if (!categoryDescription.trim()) {
      formErrors.categoryDescription = 'Description is required';
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedCategory = {
      ...currentCategory,
      name: categoryName,
      description: categoryDescription
    };
    updateCategory(updatedCategory);
    setCurrentCategory(null);
    setCategoryName('');
    setCategoryDescription('');
    setErrors({});
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Safety check
    if (typeof doc.autoTable !== 'function') {
      alert('Error: jsPDF autoTable plugin not loaded');
      return;
    }

    doc.text("Category List", 14, 10);

    const rows = categories.map((cat) => [
      cat.id,
      cat.name,
      cat.description
    ]);

    doc.autoTable({
      startY: 20,
      head: [['ID', 'Name', 'Description']],
      body: rows,
    });

    doc.save('categories.pdf');
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="category-management">
      <h2>Category Management</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Category Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        <Link to="/AddCategory">
          <button className="addcat">Add Category</button>
        </Link>
        <button className="pdf" onClick={generatePDF} style={{ marginLeft: '10px' }}>
          Download PDF
        </button>
      </div>

      <div className="category-table">
        <h3>List of Categories</h3>
        <table>
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(cat)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteCategory(cat.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentCategory && (
        <form onSubmit={handleSubmit} className="edit-form">
          <h3>Edit Category</h3>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
          />
          {errors.categoryName && <span className="error">{errors.categoryName}</span>}
          <textarea
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Description"
          />
          {errors.categoryDescription && <span className="error">{errors.categoryDescription}</span>}
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default Category;
