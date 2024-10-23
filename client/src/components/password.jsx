// PasswordInput.js
import React, { useState } from 'react';

const PasswordInput = ({ value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <div className="relative">
            <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder='Password'
                id='password'
                value={value}
                className='bg-slate-100 p-3 rounded-lg w-full'
                onChange={onChange}
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2 text-gray-600 focus:outline-none"
            >
                {isPasswordVisible ? (
                    <span role="img" aria-label="Hide password">🙈</span> // Icon for hiding
                ) : (
                    <span role="img" aria-label="Show password">👁️</span> // Icon for showing
                )}
            </button>
        </div>
    );
};

export default PasswordInput;
