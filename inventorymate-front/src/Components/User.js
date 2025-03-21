import React, { useState } from 'react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: '', email: '' });
  };

  return (
    <div>
      <h1>User Page</h1>

      {/* Add User Form */}
      <div>
        <h2>Add User</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="User Name" 
          value={newUser.name} 
          onChange={handleInputChange}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="User Email" 
          value={newUser.email} 
          onChange={handleInputChange}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* User Table */}
      <div>
        <h2>User Table</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
