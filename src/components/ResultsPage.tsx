// src/components/ResultsPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage: React.FC = () => {
    const location = useLocation();
    const { file, location: userLocation, response } = location.state;

    return (
        <div className="results-container">
            <h1>Analysis Results</h1>
            <p>Location: {userLocation}</p>
            <img src={URL.createObjectURL(file)} alt="Uploaded" style={{ maxWidth: '100%' }} />
            <p>{response || "Placeholder text while waiting for AI response"}</p>
        </div>
    );
};

export default ResultsPage;
