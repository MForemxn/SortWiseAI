import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [location, setLocation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            setError('');
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
        setError('');
    };

    const encodeImageFileAsURL = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        if (!file || !location) {
            setError('Please provide both an image and location information.');
            return;
        }

        setIsLoading(true);
        setProgress(10);

        try {
            const base64Image = await encodeImageFileAsURL(file);
            setProgress(30);

            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4-turbo",
                messages: [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": `What’s in this image? Describe considering the context: ${location}`},
                            {"type": "image_url", "image_url": {"url": base64Image}}
                        ]
                    }
                ],
                max_tokens: 300
            }, {
                headers: {
                    'Authorization': `Bearer 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`,
                    'Content-Type': 'application/json'
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
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default UploadPage;
