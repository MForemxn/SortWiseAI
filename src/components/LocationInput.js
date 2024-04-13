import React, { useState } from 'react';
import '../styles/global.css'

const LocationInput = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState('');

    const handleInputChange = async (event) => {
        const query = event.target.value;
        setInput(query);
        if (query.length > 3) {  // Trigger API calls only if the query length is more than 3 characters
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setSuggestions(data.map(item => ({ label: item.display_name, value: item.place_id })));
            } catch (error) {
                console.error('Failed to fetch location suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion.label);
        setSuggestions([]);
        // Here you can handle other actions upon selection, e.g., storing the selected location
    };

    return (
        <div>
            <input type="text" value={input} onChange={handleInputChange} placeholder="Enter location" />
            {suggestions.length > 0 && (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {suggestions.map(suggestion => (
                        <li key={suggestion.value} onClick={() => handleSuggestionClick(suggestion)} style={{ cursor: 'pointer' }}>
                            {suggestion.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocationInput;
