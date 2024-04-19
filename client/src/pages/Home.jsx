import React, { useState } from 'react';

const ValidatedInput = () => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    // Example validation logic - You can replace this with your own validation logic
    if (inputValue.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
console.log(isValid)
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{
          border: isValid !== null ? (isValid ? "1px solid green" : "1px solid red") : "1px solid gray",
        }}
      />
    </div>
  );
};

export default ValidatedInput;