// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Predict from './pages/Predict';
import Recommendations from './pages/Recommendations';
import './App.css';

function App() {
    const [isNightMode, setIsNightMode] = useState(false);

    const toggleTheme = () => {
        setIsNightMode(prevMode => !prevMode);
    };

    return ( <
        div className = { `App ${isNightMode ? 'night-mode' : 'day-mode'}` } >
        <
        Router >
        <
        Header toggleTheme = { toggleTheme }
        /> <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/about"
        element = { < About / > }
        /> <
        Route path = "/predict"
        element = { < Predict / > }
        /> <
        Route path = "/recommendations"
        element = { < Recommendations / > }
        /> < /
        Routes > <
        /Router> < /
        div >
    );
}

export default App;