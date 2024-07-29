// src/pages/Home.js

import React, { useState, useEffect } from 'react';
import background from '../background.jpg'; // Ensure correct path to background.jpg
import apiService from '../apiService';

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async() => {
        try {
            const usersData = await apiService.getAllUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateUser = async(username, email, password) => {
        try {
            const newUser = await apiService.createUser(username, email, password);
            console.log('New user created:', newUser);
            // Optionally update state or show success message
            fetchUsers(); // Refresh users list after creation
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error (e.g., show error message)
        }
    };

    const handleUpdateUser = async(userId, username, email) => {
        try {
            const updatedUser = await apiService.updateUser(userId, username, email);
            console.log('User updated:', updatedUser);
            // Optionally update state or show success message
            fetchUsers(); // Refresh users list after update
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error (e.g., show error message)
        }
    };

    const handleDeleteUser = async(userId) => {
        try {
            const success = await apiService.deleteUser(userId);
            if (success) {
                console.log('User deleted successfully');
                // Optionally update state or show success message
                fetchUsers(); // Refresh users list after deletion
            } else {
                console.log('Failed to delete user');
                // Handle deletion failure (e.g., show error message)
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error (e.g., show error message)
        }
    };

    return ( <
        div className = "home-container" >
        <
        div className = "hero-section"
        style = {
            { backgroundImage: `url(${background})` } } >
        <
        div className = "hero-content" >
        <
        h2 > Welcome to HerVitals < /h2> <
        p > Empowering women to take control of their health. < /p> <
        p > Did you know that breast cancer is a leading cause of death among women worldwide ? HerVitals is here to help you detect breast cancer early and improve your health through lifestyle changes. < /p> <
        a href = "/about"
        className = "cta-button" > Learn More < /a> <
        /div> <
        /div>

        { /* Additional sections for statistics, information, etc. can be added */ }

        <
        div className = "user-management-section" >
        <
        h3 > User Management < /h3>

        { /* Example: Form to create a new user */ } <
        form onSubmit = {
            (e) => {
                e.preventDefault();
                const username = e.target.elements.username.value;
                const email = e.target.elements.email.value;
                const password = e.target.elements.password.value;
                handleCreateUser(username, email, password);
            }
        } >
        <
        input type = "text"
        name = "username"
        placeholder = "Username"
        required / >
        <
        input type = "email"
        name = "email"
        placeholder = "Email"
        required / >
        <
        input type = "password"
        name = "password"
        placeholder = "Password"
        required / >
        <
        button type = "submit" > Create User < /button> <
        /form>

        { /* Example: List all users */ } <
        div >
        <
        h4 > All Users : < /h4> <
        ul > {
            users.map(user => ( <
                li key = { user.id } > { user.username } - { user.email } < /li>
            ))
        } <
        /ul> <
        /div> <
        /div> <
        /div>
    );
}

export default Home;