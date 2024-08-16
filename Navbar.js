/* src/components/Navbar.js */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <h1 className='logo'>Reddit Post Analyzer</h1>
            <div className='links'>
                <NavLink to='/' className={({ isActive }) => isActive ? 'active' : ''}>
                    Home
                </NavLink>
                <NavLink to='/dashboard' className={({ isActive })=> isActive ? 'active' : ''}>
                    Dashboard 
                </NavLink>
                <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : ''}>
                    Login
                </NavLink> 
            </div>
        </nav>
    );
};

export default Navbar;