import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../hook/useOnclickOutside";

const SearchBar = ({
  searchValue,
  setSearchValue,
  dropDownOptions,
  dropDownClickAction,
}) => {
  const ref = useRef();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    if (dropDownOptions && dropDownOptions.length) {
      setShowDropdown(true);
      setSearchValue(e.target.value);
    }
  };

  const filteredOptions = dropDownOptions?.filter((option) =>
    option.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOptionClick = (option) => {
    setSearchValue(option.title);
    setShowDropdown(false);
    dropDownClickAction(option.id);
  };

  const handleClickOutsideDropdown = () => {
    setShowDropdown(false);
    setSearchValue("");
  };

  useOnClickOutside(ref, handleClickOutsideDropdown);

  return (
    <div ref={ref} className="flex py-3 relative">
      <input
        type="text"
        placeholder="Search photos by Album"
        value={searchValue}
        onChange={handleSearch}
        className="shadow-sm block w-full sm:text-sm rounded-md focus:ring-white focus:border-white"
      />
      {showDropdown && dropDownOptions && dropDownOptions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-md rounded-md mt-1 top-14 w-80 py-2 px-2 max-h-72 overflow-y-scroll sm:right-0">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-300 rounded-lg"
              onClick={() => handleOptionClick(option)}
            >
              {option.title}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <div className="px-4 py-2 rounded-lg text-gray-400">
              No options available
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
