// src/components/ResultsPage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate

const ResultsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();  // Hook to programmatically navigate
    const { file, location: userLocation, response } = location.state;

    const handleTryAgain = () => {
        navigate('/upload');  // Navigate back to the UploadPage
    };

    return (
        <div className="results-container">
            <h1>Analysis Results</h1>
            <p>Location: {userLocation}</p>
            <img src={URL.createObjectURL(file)} alt="Uploaded" style={{ maxWidth: '100%' }} />
            <p>{response || "Placeholder text while waiting for AI response"}</p>
            <button onClick={handleTryAgain} style={{ marginTop: '20px' }}>Try Another Upload</button>
        </div>
    );
};

export default ResultsPage;
