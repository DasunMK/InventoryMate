import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const API_URL = 'http://localhost:8080/categories'; // Adjust if needed

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newCategory = {
      name: categoryName,
      description: categoryDescription,
    };

    try {
      if (currentCategory) {
        await axios.put(`${API_URL}/${currentCategory.id}`, {
          ...newCategory,
          id: currentCategory.id,
        });
      } else {
        await axios.post(API_URL, newCategory);
      }
      fetchCategories();
      resetForm();
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setErrors({});
  };

  const resetForm = () => {
    setCurrentCategory(null);
    setCategoryName('');
    setCategoryDescription('');
    setErrors({});
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Category List', 14, 15);

    const tableRows = categories.map(cat => [cat.id, cat.name, cat.description]);

    doc.autoTable({
      head: [['Category ID', 'Name', 'Description']],
      body: tableRows,
      startY: 20,
    });

    doc.save('categories.pdf');
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="category-management">
      <h2>Category Management</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Category Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {errors.categoryName && <span className="error">{errors.categoryName}</span>}

        <textarea
          placeholder="Description"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
        {errors.categoryDescription && <span className="error">{errors.categoryDescription}</span>}

        <button type="submit" className="add-btn">
          {currentCategory ? 'Update Category' : 'Add Category'}
        </button>
        {currentCategory && (
          <button type="button" onClick={resetForm} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>

      {/* PDF Download */}
      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        <button className="pdf" onClick={generatePDF}>Download PDF</button>
      </div>

      {/* Table */}
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
                  <button className="delete-btn" onClick={() => handleDelete(cat.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
