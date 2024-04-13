// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css'

const Navigation: React.FC = () => {
    return (
        <nav>
            <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-evenly' }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">Signup/Login</Link></li>
                <li><Link to="/upload">Upload</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
