import React, { useState, useEffect, useRef } from 'react';

const Skirmish = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const selectRef = useRef(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.style.width = 'auto';
      selectRef.current.style.width = `${selectRef.current.scrollWidth}px`;
    }
  }, [selectedOption]);

  return (
    <div className="inline-block relative">
      <select
        ref={selectRef}
        className="block appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">Please select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        {/* Add more options as needed */}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M6 8l4 4 4-4" />
        </svg>
      </div>
    </div>
  );
};

export default Skirmish;
