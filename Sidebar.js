import React from 'react';
import './styles/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <h3>Categories</h3>
                <ul>
                    <li>Technology</li>
                    <li>Health</li>
                    <li>Science</li>
                    <li>Education</li>
                </ul>
            </div>
            <div className="sidebar-item">
                <h3>Popular Posts</h3>
                <ul>
                    <li>Understanding React Hooks</li>
                    <li>Advances in AI Technology</li>
                    <li>Future of Renewable Energy</li>
                    <li>Impact of Education on Society</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;