import React from 'react';
import './loader.css';

const Loader = ({ size = 48 }) => (
    <div className="loader-wrap" style={{ height: size }}>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
);

export default Loader;
