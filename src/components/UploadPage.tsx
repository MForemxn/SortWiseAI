import React, { useState } from 'react';
import '../styles/global.css'; // Make sure the path is correct

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <div className="upload-container">
            <h1>Upload an item for recycling information</h1>
            <input type="file" onChange={handleFileChange} />
            {file && <p className="file-info">File uploaded: {file.name}</p>}
        </div>
    );
};

export default UploadPage;
