// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import UploadPage from './UploadPage';
import ResultsPage from './ResultsPage';
import LearnMore from './LearnMore';
import GetInvolved from "./GetInvolved";
import SignupPage from "./SignupPage";
import LogoutPage from "./LogoutPage";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/learn-more" element={<LearnMore />} />
                    <Route path="/get-involved" element={<GetInvolved />} />
                    <Route path="/sign-up" element={<SignupPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
