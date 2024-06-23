// ToggleButton.js

import React, { useState } from 'react';
import './ToggleButton.css'; // CSS for styling

const ToggleButton = () => {
    const [activeButton, setActiveButton] = useState('home'); // State to track active button

    const handleClick = (buttonId) => {
        setActiveButton(buttonId); // Set active button based on clicked button
    };

    return (
        <div className="button-container">
            <div
                className={`button ${activeButton === 'home' ? 'active' : ''}`}
                onClick={() => handleClick('home')}
            >
                Home
            </div>
            <div
                className={`button ${activeButton === 'work' ? 'active' : ''}`}
                onClick={() => handleClick('work')}
            >
                Work
            </div>
        </div>
    );
};

export default ToggleButton;
