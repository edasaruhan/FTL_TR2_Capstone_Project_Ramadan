// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.jpg'; // Ensure correct path to logo.jpg

function Header() {
    return ( <
        header className = "header" >
        <
        div className = "logo" >
        <
        img src = { logo }
        alt = "HerVitals Logo" / >
        <
        h1 > HerVitals < /h1> <
        /div> <
        nav >
        <
        ul >
        <
        li > < NavLink exact to = "/"
        activeClassName = "active-link" > Home < /NavLink></li >
        <
        li > < NavLink to = "/about"
        activeClassName = "active-link" > About < /NavLink></li >
        <
        li > < NavLink to = "/predict"
        activeClassName = "active-link" > Predict < /NavLink></li >
        <
        li > < NavLink to = "/recommendations"
        activeClassName = "active-link" > Recommendations < /NavLink></li >
        <
        /ul> <
        /nav> <
        /header>
    );
}

export default Header;