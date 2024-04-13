import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();  // Use navigate to go back to upload
    const { file, location: userLocation, response } = location.state || {}; // Default to an empty object if state is undefined

    const handleTryAgain = () => {
        navigate('/upload');  // Navigate back to the UploadPage
    };

    // Handling the case where the file or other data might not be available
    if (!file || !response) {
        return (
            <div className="results-container">
                <h1>Error</h1>
                <p>No data available. Please try uploading again.</p>
                <button onClick={handleTryAgain}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="results-container">
            <h1>Analysis Results</h1>
            <p><strong>Location:</strong> {userLocation}</p>
            <img src={URL.createObjectURL(file)} alt="Uploaded" style={{ maxWidth: '100%' }} />
            <p><strong>AI Response:</strong> {response}</p>
            <button onClick={handleTryAgain} style={{ marginTop: '20px' }}>Try Another Upload</button>
        </div>
    );
};

export default ResultsPage;
