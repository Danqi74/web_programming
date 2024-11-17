import React from 'react';
import './ViewMoreButton.css';

const ViewMoreButton = ({ onClick }) => {
    return (
        <button className="view_more_button" onClick={onClick}>
            View More
        </button>
    );
};

export default ViewMoreButton;