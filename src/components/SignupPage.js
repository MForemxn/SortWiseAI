import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'

const SignupPage = () => {
    const [isSignUp, setIsSignUp] = useState(true); // State to toggle between signup and login
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        location: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
        // Implement authentication logic here
        // After successful login/signup, navigate to the homepage
        navigate('/upload'); // Redirects user to homepage
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp); // Toggle between signup and login
    };

    return (
        <div className="signup-container">
            <h1>{isSignUp ? 'Sign Up' : 'Log In'}</h1>
            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                    </div>
                )}
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
                {isSignUp && (
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
                    </div>
                )}
                <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
                <button type="button" onClick={toggleForm}>
                    {isSignUp ? 'Already have an account? Log In' : 'Need to create an account? Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
