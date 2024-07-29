// src/apiService.js

const BASE_URL = 'http://127.0.0.1:5000'; // Replace with your Flask server address

const apiService = {
    getAllUsers: async() => {
        try {
            const response = await fetch(`${BASE_URL}/all_users`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    createUser: async(username, email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        };

        try {
            const response = await fetch(`${BASE_URL}/users`, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    updateUser: async(userId, username, email) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
        };

        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    deleteUser: async(userId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            return true; // Successful deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
};

export default apiService;