import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [location, setLocation] = useState<string>('');
    const [apiKey, setApiKey] = useState<string>('');  // State to store the API key
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setError('');
        }
    };

    const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(event.target.value);  // Update API key from user input
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
        setError('');
    };

    const handleSubmit = async () => {
        if (!file || !location || !apiKey) {
            setError('Please provide an image, location, and your OpenAI API key.');
            return;
        }
        setIsLoading(true);
        setProgress(10);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // Assume you have a server endpoint that handles the file upload and returns a URL
            const uploadResponse = await axios.post('https://your-server.com/upload', formData);
            const imageUrl = uploadResponse.data.url; // This URL is used in the OpenAI API request

            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4-turbo",
                messages: [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": `What’s in this image? Describe considering the context: ${location}`},
                            {"type": "image_url", "image_url": {"url": imageUrl}}
                        ]
                    }
                ],
                max_tokens: 300
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            setProgress(100);
            setTimeout(() => {
                navigate('/results', { state: { image: file, location, response: response.data.choices[0].message.content[0].text } });
                setProgress(0);
            }, 500);
        } catch (error) {
            console.error('Failed to process the image with OpenAI:', error);
            setError('Failed to process the image. Please try again.');
            setIsLoading(false);
            setProgress(0);
        }
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
            <h1>Upload an image for analysis</h1>
            {error && <p className="error">{error}</p>}
            <input type="file" onChange={handleFileChange} />
            <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter your location" />
            <input type="text" value={apiKey} onChange={handleApiKeyChange} placeholder="Enter your OpenAI API key" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default UploadPage;
