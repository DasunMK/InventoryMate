import React, { useState, useEffect } from 'react';
import './GRNPage.css';  // Optional CSS styling

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

  // Sample items list (you could fetch this from an API or database)
  useEffect(() => {
    const initialItems = [
      { id: 'I01', name: 'Item A', category: 'Category A', stock: 20, barcode: '123456', expireDate: '2023-12-31', manufactureDate: '2022-01-15' },
      { id: 'I02', name: 'Item B', category: 'Category B', stock: 50, barcode: '654321', expireDate: '2024-06-30', manufactureDate: '2023-02-10' },
    ];
    setItems(initialItems);
  }, []);

  // Function to validate the form
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!barcode.trim()) {
      formErrors.barcode = 'Barcode is required';
      isValid = false;
    }

    if (!stockReceived || stockReceived <= 0) {
      formErrors.stockReceived = 'Received stock must be greater than 0';
      isValid = false;
    }

    if (!grnNumber.trim()) {
      formErrors.grnNumber = 'GRN Number is required';
      isValid = false;
    }

    if (!expireDate.trim()) {
      formErrors.expireDate = 'Expire Date is required';
      isValid = false;
    }

    if (!manufactureDate.trim()) {
      formErrors.manufactureDate = 'Manufacture Date is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle adding item to the temporary table
  const handleAddItem = () => {
    if (!validateForm()) return;

    const item = items.find((item) => item.barcode === barcode);
    if (!item) {
      setErrors({ ...errors, barcode: 'Item not found for the entered barcode' });
      return;
    }

    const newTemporaryItem = {
      id: item.id,
      name: item.name,
      barcode: item.barcode,
      receivedStock: parseInt(stockReceived), // Add received stock to the temporary list
      expireDate, // Add expire date to temporary item
      manufactureDate, // Add manufacture date to temporary item
    };

    setTemporaryItems([...temporaryItems, newTemporaryItem]);

    // Reset the form
    setBarcode('');
    setStockReceived('');
    setExpireDate('');
    setManufactureDate('');
    setErrors({});
  };

  // Handle deleting an item from the temporary table
  const handleDeleteItem = (itemId) => {
    setTemporaryItems(temporaryItems.filter((item) => item.id !== itemId));
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

  // Handle saving the GRN
  const handleSaveGRN = () => {
    if (temporaryItems.length === 0) {
      setErrors({ ...errors, stockReceived: 'Please add at least one item to the list' });
      return;
    }

    // Save the GRN history
    const grn = {
      grnNumber: grnNumber,
      date: new Date().toLocaleDateString(),
      items: temporaryItems,
    };
    setGrnHistory([grn, ...grnHistory]);

    // Reset form after saving
    setGrnNumber('');
    setTemporaryItems([]);
  };

  // Filter GRN history based on the search query
  const filteredGrnHistory = grnHistory.filter(
    (grn) =>
      grn.grnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grn.date.includes(searchQuery)
  );

  return (
    <div className="grn-page">
      <h2>Goods Receipt Note (GRN)</h2>

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
                  <button onClick={() => handleUpdateItem(item.id)}>Update</button>
                  <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
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
