// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UploadPage from './components/UploadPage';
import ResultsPage from './components/ResultsPage';
import LearnMore from './components/LearnMore';
import GetInvolved from "./components/GetInvolved";
import SignupPage from "./components/SignupPage";
import LogoutPage from "./components/LogoutPage";

const App: React.FC = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/learn-more" element={<LearnMore />} />
                    <Route path={"/get-involved"} element={<GetInvolved />} />
                    <Route path={"/signup"} element={<SignupPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                </Routes>
        </Router>
    );
};

export default App;