import React from 'react';

const PrimaryButton = ({ children, onClick, disabled = false, type = 'button' }) => (
    <button className="primary-button" type={type} onClick={onClick} disabled={disabled}>
        {children}
    </button>
);

export default PrimaryButton;
