import React from 'react';

const Select = ({ options = [], value, onChange }) => (
    <select className="custom-select" value={value} onChange={onChange}>
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
    </select>
);

export default Select;
