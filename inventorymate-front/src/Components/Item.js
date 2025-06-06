import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API requests
import { Link } from 'react-router-dom';
import './Item.css';

const Item = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [barcode, setBarcode] = useState('');
  const [brand, setBrand] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [minStockLevel, setMinStockLevel] = useState(0);
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [expireDate, setExpireDate] = useState('');
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  
  useEffect(() => {
    axios.get('/items') 
      .then((res) => {
        setItems(res.data); 
      })
      .catch((err) => {
        console.error('Error fetching items:', err);
      });
  }, []);

  // Validation function for the form
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
    const barcodeRegex = /^[0-9]+$/;
    if (!barcode.trim()) {
      formErrors.barcode = 'Barcode is required';
      isValid = false;
    } else if (!barcodeRegex.test(barcode)) {
      formErrors.barcode = 'Barcode must only contain numbers';
      isValid = false;
    }
    if (!brand.trim()) {
      formErrors.brand = 'Brand is required';
      isValid = false;
    }
    if (!unitOfMeasure.trim()) {
      formErrors.unitOfMeasure = 'Unit of Measure is required';
      isValid = false;
    }
    if (!minStockLevel || minStockLevel <= 0) {
      formErrors.minStockLevel = 'Minimum Stock Level must be greater than 0';
      isValid = false;
    }
    if (!price || price <= 0) {
      formErrors.price = 'Price must be greater than 0';
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
      id: `I${String(items.length + 1).padStart(2, '0')}`, // Format the ID as I01, I02, etc.
      name: itemName,
      category,
      barcode,
      brand,
      unitOfMeasure,
      minStockLevel,
      price,
      image,
      stock: 0, 
      expireDate,
    };

    if (currentItem) {
      // Update item if it's an existing item
      axios.put(`/items/${currentItem.id}`, newItem)
        .then((res) => {
          setItems(items.map((item) => (item.id === currentItem.id ? res.data : item)));
          clearForm();
        });
    } else {
      // Create new item
      axios.post('/items', newItem)
        .then((res) => {
          setItems([...items, res.data]);
          clearForm();
        });
    }
  };

  // Handle Delete Item
  const handleDelete = (id) => {
    axios.delete(`/items/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error('Error deleting item:', err);
      });
  };

  // Handle Edit Item
  const handleEdit = (item) => {
    setCurrentItem(item);
    setItemName(item.name);
    setCategory(item.category);
    setBarcode(item.barcode);
    setBrand(item.brand);
    setUnitOfMeasure(item.unitOfMeasure);
    setMinStockLevel(item.minStockLevel);
    setPrice(item.price);
    setExpireDate(item.expireDate);
    setImage(item.image);
    setErrors({});
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Convert the file to a URL for preview
    }
  };

  // Clear form fields after submitting or editing
  const clearForm = () => {
    setItemName('');
    setCategory('');
    setBarcode('');
    setBrand('');
    setUnitOfMeasure('');
    setMinStockLevel(0);
    setPrice('');
    setExpireDate('');
    setImage(null);
    setCurrentItem(null);
    setErrors({});
  };

  // Filter items based on search query and selected category
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || item.category === selectedCategory)
  );

  // Calculate days until expiration
  const calculateExpirationDays = (expireDate) => {
    const today = new Date();
    const expiration = new Date(expireDate);
    const diffTime = expiration - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Days difference
  };

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

      {/* Form to Add / Update Item */}
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
          <label>Barcode:</label>
          <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} required />
          {errors.barcode && <p className="error">{errors.barcode}</p>}
        </div>
        <div>
          <label>Brand:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
          {errors.brand && <p className="error">{errors.brand}</p>}
        </div>
        <div>
          <label>Unit of Measure:</label>
          <select value={unitOfMeasure} onChange={(e) => setUnitOfMeasure(e.target.value)} required>
            <option value="">Select Measure</option>
            <option value="kg">kg</option>
            <option value="L">L</option>
            <option value="Pack">Pack</option>
            <option value="Bottles">Bottles</option>
          </select>
          {errors.unitOfMeasure && <p className="error">{errors.unitOfMeasure}</p>}
        </div>
        <div>
          <label>Minimum Stock Level:</label>
          <input type="number" value={minStockLevel} onChange={(e) => setMinStockLevel(e.target.value)} required />
          {errors.minStockLevel && <p className="error">{errors.minStockLevel}</p>}
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          {errors.price && <p className="error">{errors.price}</p>}
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
              <th>Barcode</th>
              <th>Brand</th>
              <th>Unit of Measure</th>
              <th>Stock</th>
              <th>Min Stock Level</th>
              <th>Price</th>
              <th>Item Image</th>
              <th>Expire Date</th>
              <th>Expiration Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.barcode}</td>
                <td>{item.brand}</td>
                <td>{item.unitOfMeasure}</td>
                <td>{item.stock}</td>
                <td>{item.minStockLevel}</td>
                <td>{item.price}</td>
                <td>{item.image ? <img src={item.image} alt="Item" className="item-table-image" /> : 'No Image'}</td>
                <td>{item.expireDate}</td>
                <td>{calculateExpirationDays(item.expireDate)} days</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Item;
