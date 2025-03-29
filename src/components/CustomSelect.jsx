import React, { useState, useRef, useEffect } from 'react';

function CustomSelect({ options, value, onChange, setInOut,setFilter, currentDay }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue) => {
        onChange(optionValue);
        setInOut(optionValue);
        optionValue === '' ? setFilter(false) : setFilter(true);
        setIsOpen(false);
    };
    currentDay ? value = currentDay : '';
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="custom-select" ref={dropdownRef}>
            <div className={`select-header ${value !== '' ? 'selected' : ''}`} onClick={handleToggle}>
                {value
                    ? options.find(option => option.value === value)?.label
                    : options.length > 0
                        ? options[0].label
                        : options[0].label }
                <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
            </div>
            {isOpen && (
                <ul className="select-dropdown">
                    {options.map(option => (
                        <li
                            key={option.value}
                            className={`select-option ${value === option.value ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomSelect;