import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import '../styles/global.css';

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [location, setLocation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setError('');  // Clear any previous error
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
        setError('');  // Clear any previous error
    };

    const handleSubmit = async () => {
        if (!file || !location) {
            setError('Please provide both a file and a location.');
            return;
        }
        setIsLoading(true);
        setProgress(10); // Start progress at 10%

        // Simulate API call delay and response
        setTimeout(() => {
            setProgress(50); // Midway through loading, update progress
            setTimeout(() => {
                // Simulated positive response for debugging
                const simulatedResponse = {
                    data: {
                        message: "File successfully uploaded. Here's a placeholder response."
                    }
                };
                setProgress(100); // Complete the loading bar
                setTimeout(() => {
                    navigate('/results', { state: { file, location, response: simulatedResponse.data.message } });
                    setProgress(0); // Reset progress for next time page is loaded
                }, 500); // Short delay to see complete bar before navigating
            }, 1500); // Second part of the simulated delay
        }, 500); // Initial simulated delay
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <LoadingBar
                    color='#f11946'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                />
                <p>Making Magic Happen...</p>
            </div>
        );
    }

    return (
        <div className="upload-container">
            <h1>Upload an item for recycling information</h1>
            {error && <p className="error">{error}</p>}
            <input type="file" onChange={handleFileChange} />
            <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter your location" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default UploadPage;
