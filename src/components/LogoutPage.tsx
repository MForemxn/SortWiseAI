// src/components/LogoutPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Here you would also handle clearing the authentication tokens or user session
        console.log("User logged out.");

        // Simulate a delay if necessary (e.g., for completing logout processes)
        setTimeout(() => {
            navigate('/signup');
        }, 1000); // Redirects to the signup page after 1 second
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Logging Out...</h1>
            <p>Please wait...</p>
        </div>
    );
};

export default LogoutPage;
