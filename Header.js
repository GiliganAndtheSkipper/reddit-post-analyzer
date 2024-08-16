// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import logo from '../images/logo192.png';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="App Logo" className="logo" />
      <h1>Reddit Post Analyzer</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
