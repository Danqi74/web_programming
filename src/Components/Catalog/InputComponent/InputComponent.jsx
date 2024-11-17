import React from 'react';

const InputComponent = ({ value, onChange, placeholder, className }) => {
    return (
        <input
        type="text"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        />
    );
};

export default InputComponent;