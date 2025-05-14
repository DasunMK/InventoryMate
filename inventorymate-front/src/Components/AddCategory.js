import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryContext } from './CategoryContext';
import './AddCategory.css';

const AddCategory = () => {
  const [categoryID, setCategoryID] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [errors, setErrors] = useState({});
  const { addCategory } = useContext(CategoryContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    if (!categoryID.trim()) {
      formErrors.categoryID = 'Category ID is required';
      isValid = false;
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newCategory = {
      id: categoryID,
      name: categoryName,
      description: categoryDescription,
    };

    addCategory(newCategory);
    navigate('/');
  };

  return (
    <div className="add-category-form">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category ID:</label>
          <input
            type="text"
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
          />
          {errors.categoryID && <span className="error">{errors.categoryID}</span>}
        </div>

        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {errors.categoryName && <span className="error">{errors.categoryName}</span>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
          {errors.categoryDescription && (
            <span className="error">{errors.categoryDescription}</span>
          )}
        </div>

        <button className="add-btn" type="submit">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
