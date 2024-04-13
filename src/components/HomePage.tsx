import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css'

const HomeScreen = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Sort Wise AI</h1>
                <p>Join our journey towards a sustainable future.</p>
            </header>
            <div className="main-content">
                <Link to="/learn-more">
                    <button className="action-button">Learn More</button>
                </Link>
                <Link to="/get-involved">
                    <button className="action-button">Get Involved</button>
                </Link>
                <Link to="/signup">
                    <button className="action-button">Get Started</button>
                </Link>
            </div>
            <footer className="home-footer">
                <p>© 2024 Sort Wise AI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomeScreen;
