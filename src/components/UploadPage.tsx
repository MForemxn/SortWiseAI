// src/components/UploadPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/global.css'

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [location, setLocation] = useState<string>('');
    const [response, setResponse] = useState<string>('');

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

            try {
                const res = await axios.post('http://localhost:3001/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setResponse(res.data.message);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div className="upload-container">
            <h1>Upload an item for recycling information</h1>
            <input type="file" onChange={handleFileChange} />
            <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter your location" />
            <button onClick={handleSubmit}>Submit</button>
            {response && <p>{response}</p>}
        </div>
    );
};

export default UploadPage;
