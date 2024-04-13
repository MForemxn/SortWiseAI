// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // Ensure these imports point to your .tsx files
import SignupPage from './components/SignupPage';
import UploadPage from './components/UploadPage';
import Navigation from './components/Navbar';

const App: React.FC = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/upload" element={<UploadPage />} />
            </Routes>
        </Router>
    );
}

export default App;
