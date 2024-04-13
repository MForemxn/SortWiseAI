// src/components/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        // Redirect user to the Signup page
        navigate('/signup');
    };

    return (
        <div className="home-container">
            <h1>Welcome to Our Application!</h1>
            <p>Discover the features and enhancements we offer.</p>
            <button onClick={handleGetStartedClick} className="get-started-btn">
                Get Started
            </button>
        </div>
    );
};

export default HomePage;
