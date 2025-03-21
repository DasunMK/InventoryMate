import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './Item.css';


const Item = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [barcode, setBarcode] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const initialItems = [
      { id: 'I01', name: 'Item A', category: 'Category A', stock: 20, barcode: '123456', expireDate: '2023-12-31', image: null },
      { id: 'I02', name: 'Item B', category: 'Category B', stock: 50, barcode: '654321', expireDate: '2024-06-30', image: null },
    ];
    setItems(initialItems);
  }, []);

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!itemName.trim()) {
      formErrors.itemName = 'Item Name is required';
      isValid = false;
    }

    if (!category.trim()) {
      formErrors.category = 'Category is required';
      isValid = false;
    }

    if (!stock || stock <= 0) {
      formErrors.stock = 'Stock must be greater than 0';
      isValid = false;
    }

    const barcodeRegex = /^[0-9]+$/;
    if (!barcode.trim()) {
      formErrors.barcode = 'Barcode is required';
      isValid = false;
    } else if (!barcodeRegex.test(barcode)) {
      formErrors.barcode = 'Barcode must only contain numbers';
      isValid = false;
    }

    if (!expireDate) {
      formErrors.expireDate = 'Expire Date is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle Add / Update Item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newItem = {
      id: `I${String(items.length + 1).padStart(2, '0')}`, // Generate ID in format I01, I02, etc.
      name: itemName,
      category,
      stock,
      barcode,
      expireDate,
      image, // Add image to item
    };

    if (currentItem) {
      setItems(items.map((item) => (item.id === currentItem.id ? newItem : item)));
    } else {
      setItems([...items, newItem]);
    }

    setItemName('');
    setCategory('');
    setStock(0);
    setBarcode('');
    setExpireDate('');
    setImage(null); // Reset image after adding/updating
    setCurrentItem(null);
    setErrors({});
  };

  // Handle Delete
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Handle Edit
  const handleEdit = (item) => {
    setCurrentItem(item);
    setItemName(item.name);
    setCategory(item.category);
    setStock(item.stock);
    setBarcode(item.barcode);
    setExpireDate(item.expireDate);
    setImage(item.image); // Set image when editing
    setErrors({});
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Convert the file to a URL to preview
    }
  };

  // **🔍 Filtering Logic**
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || item.category === selectedCategory)
  );

  return (
    <div className="item-management">
      <h2>Item Management</h2>

      {/* Button to navigate to GRN Page */}
      <div className="grn-button-container">
        <Link to="/grn" className="grn-button">Go to GRN Page</Link>
      </div>

      {/* Search & Filter Inputs */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by Item Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {[...new Set(items.map((item) => item.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Name:</label>
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
          {errors.itemName && <p className="error">{errors.itemName}</p>}
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          {errors.stock && <p className="error">{errors.stock}</p>}
        </div>
        <div>
          <label>Barcode:</label>
          <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} required />
          {errors.barcode && <p className="error">{errors.barcode}</p>}
        </div>
        <div>
          <label>Expire Date:</label>
          <input type="date" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} required />
          {errors.expireDate && <p className="error">{errors.expireDate}</p>}
        </div>
        <div>
          <label>Item Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="Item Preview" className="item-image-preview" />}
        </div>
        <button type="submit">{currentItem ? 'Update' : 'Add'} Item</button>
      </form>

      {/* Table */}
      <div className="item-table">
        <h3>List of Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Barcode</th>
              <th>Expire Date</th>
              <th>Item Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td> {/* Display Item ID */}
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>{item.barcode}</td>
                <td>{item.expireDate}</td>
                <td>
                  {item.image ? (
                    <img src={item.image} alt="Item" className="item-table-image" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: 'red' }}>
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Item;
