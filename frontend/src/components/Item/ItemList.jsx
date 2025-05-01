import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch items when component mounts
  useEffect(() => {
    fetch('http://localhost:3000/items/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Handler for deleting an item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      // Remove deleted item from state
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handler for updating an item (navigates to the update form)
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  // Sorting functions
  const sortByManufacturedDate = () => {
    const sorted = [...items].sort((a, b) => new Date(a.manufacturedDate) - new Date(b.manufacturedDate));
    setItems(sorted);
  };

  const sortByExpiryDate = () => {
    const sorted = [...items].sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    setItems(sorted);
  };

  const sortByCategory = () => {
    const sorted = [...items].sort((a, b) => {
      // Compare strings case-insensitively
      return a.foodCategory.toLowerCase().localeCompare(b.foodCategory.toLowerCase());
    });
    setItems(sorted);
  };

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Items List</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <>
          <div className="mb-3">
            <button className="btn btn-primary me-2" onClick={sortByManufacturedDate}>
              Sort by Manufactured Date
            </button>
            <button className="btn btn-primary me-2" onClick={sortByExpiryDate}>
              Sort by Expiry Date
            </button>
            <button className="btn btn-primary" onClick={sortByCategory}>
              Sort by Category
            </button>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Food Category</th>
                <th>Quantity</th>
                <th>Manufactured</th>
                <th>Expiry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.foodCategory}</td>
                  <td>{item.quantity}</td>
                  <td>{new Date(item.manufacturedDate).toLocaleDateString()}</td>
                  <td>{new Date(item.expiryDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ItemsList;
