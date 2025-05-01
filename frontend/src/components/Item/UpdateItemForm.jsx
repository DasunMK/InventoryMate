import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [itemData, setItemData] = useState({
    name: '',
    manufacturedDate: '',
    foodCategory: '',
    quantity: '',
    expiryDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the current item data on component mount
  useEffect(() => {
    fetch(`http://localhost:3000/items/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch item data');
        }
        return response.json();
      })
      .then(data => {
        setItemData({
          name: data.name,
          manufacturedDate: new Date(data.manufacturedDate)
            .toISOString()
            .substring(0, 10),
          foodCategory: data.foodCategory,
          quantity: data.quantity,
          expiryDate: new Date(data.expiryDate)
            .toISOString()
            .substring(0, 10),
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...itemData,
          quantity: Number(itemData.quantity) // Ensure quantity is a number
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      const updatedItem = await response.json();
      console.log('Item updated:', updatedItem);
      navigate('/list'); // Redirect back to the items list after update
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading item data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={itemData.name} 
            onChange={handleChange}
            className="form-control"
            required 
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="manufacturedDate" className="form-label">Manufactured Date:</label>
          <input 
            type="date" 
            id="manufacturedDate" 
            name="manufacturedDate" 
            value={itemData.manufacturedDate} 
            onChange={handleChange}
            className="form-control"
            required 
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="foodCategory" className="form-label">Food Category:</label>
          <input 
            type="text" 
            id="foodCategory" 
            name="foodCategory" 
            value={itemData.foodCategory} 
            onChange={handleChange}
            className="form-control"
            required 
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity:</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            value={itemData.quantity} 
            onChange={handleChange}
            className="form-control"
            min="0"
            required 
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">Expiry Date:</label>
          <input 
            type="date" 
            id="expiryDate" 
            name="expiryDate" 
            value={itemData.expiryDate} 
            onChange={handleChange}
            className="form-control"
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-success">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItemForm;
