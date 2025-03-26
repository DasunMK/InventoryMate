import axios from 'axios';

const API_URL = 'http://localhost:8080/items';  // Backend API endpoint

// Get all items
export const getItems = () => {
  return axios.get(API_URL);
};

// Create a new item
export const createItem = (item) => {
  return axios.post(API_URL, item);
};

// Update an item
export const updateItem = (id, item) => {
  return axios.put(`${API_URL}/${id}`, item);
};

// Delete an item
export const deleteItem = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
