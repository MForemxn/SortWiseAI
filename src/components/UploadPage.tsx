// src/components/UploadPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/global.css';

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [location, setLocation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const handleSubmit = async () => {
        if (file && location) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('location', location);
            setIsLoading(true);  // Set loading true to show loading screen

            try {
                const res = await axios.post('http://localhost:3001/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // After the response or a set timeout, navigate to results
                setTimeout(() => {
                    navigate('/results', { state: { file, location, response: res.data.message } });
                }, 2000);  // Simulate loading for 2 seconds
            } catch (error) {
                console.error('Error uploading file:', error);
                setIsLoading(false);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <p>Making Magic Happen...</p>
                {/* Add any visual loading indicators here */}
            </div>
        );
    }

    return (
        <div className="upload-container">
            <h1>Upload an item for recycling information</h1>
            <input type="file" onChange={handleFileChange} />
            <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter your location" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default UploadPage;
