import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GRNPage.css';

const GRNPage = () => {
  const [items, setItems] = useState([]); // Items list
  const [barcode, setBarcode] = useState(''); // Barcode input
  const [stockReceived, setStockReceived] = useState(''); // Received stock input
  const [grnNumber, setGrnNumber] = useState(''); // GRN number input
  const [expireDate, setExpireDate] = useState(''); // Expire date input
  const [manufactureDate, setManufactureDate] = useState(''); // Manufacture date input
  const [temporaryItems, setTemporaryItems] = useState([]); // Temporary storage of received items
  const [errors, setErrors] = useState({}); // Form errors
  const [grnHistory, setGrnHistory] = useState([]); // History of generated GRNs
  const [searchQuery, setSearchQuery] = useState(''); // Search query for GRN number

  // Fetch items from the backend API when the component is mounted
  useEffect(() => {
    axios.get('http://localhost:8080/grn/items')
      .then((response) => {
        setItems(response.data); // Set items from the response data
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  // Handle adding item to the temporary table
  const handleAddItem = () => {
    if (!barcode || !stockReceived || !grnNumber) {
      setErrors({ ...errors, barcode: 'Please fill all fields' });
      return;
    }

    const item = items.find((item) => item.barcode === barcode);
    if (!item) {
      setErrors({ ...errors, barcode: 'Item not found for the entered barcode' });
      return;
    }

    const newItem = {
      ...item,
      receivedStock: stockReceived,
      expireDate,
      manufactureDate
    };
    setTemporaryItems([...temporaryItems, newItem]);

    // Reset form fields
    setBarcode('');
    setStockReceived('');
    setExpireDate('');
    setManufactureDate('');
    setErrors({});
  };

  // Handle saving the GRN to the backend
  const handleSaveGRN = () => {
    if (temporaryItems.length === 0) {
      setErrors({ ...errors, stockReceived: 'Please add at least one item to the list' });
      return;
    }

    const grn = {
      grnNumber,
      date: new Date().toLocaleDateString(),
      items: temporaryItems,
    };

    axios.post('http://localhost:8080/grn', grn)
      .then((response) => {
        setGrnHistory([response.data, ...grnHistory]);
        setTemporaryItems([]); // Clear temporary items after saving
        setGrnNumber('');
      })
      .catch((error) => {
        console.error('Error saving GRN:', error);
      });
  };

  // Handle updating an item in the temporary table
  const handleUpdateItem = (itemId) => {
    const itemToUpdate = temporaryItems.find((item) => item.id === itemId);
    setBarcode(itemToUpdate.barcode);
    setStockReceived(itemToUpdate.receivedStock);
    setExpireDate(itemToUpdate.expireDate);
    setManufactureDate(itemToUpdate.manufactureDate);
    setTemporaryItems(temporaryItems.filter((item) => item.id !== itemId));
  };

  // Handle deleting an item from the temporary table
  const handleDeleteItem = (itemId) => {
    setTemporaryItems(temporaryItems.filter((item) => item.id !== itemId));
  };

  // Filter GRN history based on the search query
  const filteredGrnHistory = grnHistory.filter(
    (grn) =>
      grn.grnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grn.date.includes(searchQuery)
  );

  return (
    <div className="grn-page">
      <h2>Goods Receipt Note</h2>

      {/* Form to input GRN number, barcode, and received stock */}
      <div className="form">
        <label>GRN Number:</label>
        <input
          type="text"
          value={grnNumber}
          onChange={(e) => setGrnNumber(e.target.value)}
        />
        {errors.grnNumber && <p className="error">{errors.grnNumber}</p>}

        <label>Barcode:</label>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        {errors.barcode && <p className="error">{errors.barcode}</p>}

        <label>Received Stock:</label>
        <input
          type="number"
          value={stockReceived}
          onChange={(e) => setStockReceived(e.target.value)}
        />
        {errors.stockReceived && <p className="error">{errors.stockReceived}</p>}

        <label>Expire Date:</label>
        <input
          type="date"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
        />
        {errors.expireDate && <p className="error">{errors.expireDate}</p>}

        <label>Manufacture Date:</label>
        <input
          type="date"
          value={manufactureDate}
          onChange={(e) => setManufactureDate(e.target.value)}
        />
        {errors.manufactureDate && <p className="error">{errors.manufactureDate}</p>}

        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* Temporary Table to display items before saving */}
      <div className="temporary-table">
        <h3>Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Barcode</th>
              <th>Received Stock</th>
              <th>Expire Date</th>
              <th>Manufacture Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {temporaryItems.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.barcode}</td>
                <td>{item.receivedStock}</td>
                <td>{item.expireDate}</td>
                <td>{item.manufactureDate}</td>
                <td>
                  <button className="update-btn" onClick={() => handleUpdateItem(item.id)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {temporaryItems.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>
                  No items added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Button to save */}
      <button className="save-btn" onClick={handleSaveGRN}>Save</button>

      {/* Search functionality for GRN history */}
      <div className="search-grn">
        <input
          type="text"
          placeholder="Search GRN by Number or Date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display GRN history */}
      <div className="grn-history">
        <h3>GRN History</h3>
        <table>
          <thead>
            <tr>
              <th>GRN Number</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrnHistory.map((grn, index) => (
              <tr key={index}>
                <td>{grn.grnNumber}</td>
                <td>{grn.date}</td>
              </tr>
            ))}
            {filteredGrnHistory.length === 0 && (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', color: 'red' }} >
                  No matching GRNs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GRNPage;
