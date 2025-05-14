import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        toast.success('User deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user');
      });
  };

  const handleUpdate = () => {
    axios.put(`/api/users/${selectedUser.id}`, selectedUser)
      .then(() => {
        setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
        setOpenDialog(false);
        toast.success('User updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        toast.error('Error updating user');
      });
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Gender</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.gender}</TableCell>
                
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleOpenDialog(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box mt={2}>
              <TextField
                label="Name"
                name="name"
                value={selectedUser.name}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Email"
                name="email"
                value={selectedUser.email}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Phone"
                name="phone"
                value={selectedUser.phone}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              
              <TextField
                label="Gender"
                name="gender"
                value={selectedUser.gender}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
