import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const CreateItemForm = () => {
  const [itemData, setItemData] = useState({
    name: '',
    manufacturedDate: '',
    foodCategory: '',
    quantity: '',
    expiryDate: ''
  });
  // Alert state: message and variant ('success' or 'danger')
  const [alert, setAlert] = useState({ message: '', variant: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...itemData,
          quantity: Number(itemData.quantity) // Convert quantity to number
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create item');
      }

      const data = await response.json();
      console.log('Item created:', data);
      
      // Show success alert
      setAlert({ message: 'Item created successfully!', variant: 'success' });

      // Optionally reset the form after successful submission
      setItemData({
        name: '',
        manufacturedDate: '',
        foodCategory: '',
        quantity: '',
        expiryDate: ''
      });
    } catch (error) {
      console.error('Error:', error);
      // Show error alert
      setAlert({ message: 'Error: Failed to create item', variant: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <h3 className="mb-4">Create Item</h3>

        {/* Bootstrap Alert */}
        {alert.message && (
          <div className={`alert alert-${alert.variant} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="alert" 
              aria-label="Close"
              onClick={() => setAlert({ message: '', variant: '' })}
            ></button>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={itemData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="manufacturedDate" className="form-label">Manufactured Date:</label>
          <input
            type="date"
            id="manufacturedDate"
            name="manufacturedDate"
            className="form-control"
            value={itemData.manufacturedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="foodCategory" className="form-label">Food Category:</label>
          <input
            type="text"
            id="foodCategory"
            name="foodCategory"
            className="form-control"
            value={itemData.foodCategory}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="form-control"
            value={itemData.quantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">Expiry Date:</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            className="form-control"
            value={itemData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Item</button>
      </form>
    </div>
  );
}

export default CreateItemForm;
