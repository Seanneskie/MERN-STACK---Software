import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch users from the API endpoint
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to ensure the effect runs only once

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the users list after successful deletion
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        console.log('User deleted successfully!');
      } else {
        console.error('Failed to delete the user.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (userId) => {
    // Set the user ID being edited and populate the form with its data
    const userToEdit = users.find((user) => user.id === userId);
    setEditUserId(userId);
    setEditedUserData(userToEdit);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    // Cancel the edit mode and reset the form
    setEditUserId(null);
    setEditedUserData({
      username: '',
      email: '',
      role: '',
    });
    setIsModalOpen(false);
  };

  const handleUpdate = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(editedUserData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the users list after successful update
        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, ...editedUserData } : user
        );
        setUsers(updatedUsers);
        // Reset the edit mode and form data
        setEditUserId(null);
        setEditedUserData({
          username: '',
          email: '',
          role: '',
        });
        setIsModalOpen(false);
        console.log('User updated successfully!');
      } else {
        console.error('Failed to update the user.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
              <button onClick={() => handleEdit(user.id)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <input
              type="text"
              name="username"
              value={editedUserData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="text"
              name="email"
              value={editedUserData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="role"
              value={editedUserData.role}
              onChange={handleChange}
              placeholder="Role"
            />
            <button onClick={() => handleUpdate(editUserId)}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
