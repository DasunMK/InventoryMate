import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // this makes the function work
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryID, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const initialCategories = [
      { id: 'C01', name: 'Food', description: 'Items like snacks, beverages' },
      { id: 'C02', name: 'Cleaning', description: 'Cleaning supplies like detergent' },
    ];
    setCategories(initialCategories);
  }, []);

  const validateForm = () => {
    let formErrors = {};
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newCategory = {
      id: currentCategory
        ? currentCategory.id
        : `C${String(categories.length + 1).padStart(2, '0')}`,
      name: categoryName,
      description: categoryDescription,
    };

    if (currentCategory) {
      setCategories(categories.map((cat) => (cat.id === currentCategory.id ? newCategory : cat)));
    } else {
      setCategories([...categories, newCategory]);
    }

    setCategoryId('');
    setCategoryName('');
    setCategoryDescription('');
    setCurrentCategory(null);
    setErrors({});
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setErrors({});
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    doc.text('Category List', 14, 15);
    const tableColumn = ['Category ID', 'Name', 'Description'];
    const tableRows = [];
  
    categories.forEach(cat => {
      const rowData = [cat.id, cat.name, cat.description];
      tableRows.push(rowData);
    });
  
    doc.autoTable({
      head: [tableColumn],
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

      {/* Add Category Button */}
<div style={{ textAlign: 'left', marginBottom: '20px'}}>
  <Link to="/AddCategory">
    <button className="add-btn">Add Category</button>
  </Link>
</div>
    
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