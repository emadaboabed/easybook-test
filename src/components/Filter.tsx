"use client";

import React, { useState } from "react";
import { TextBox, DateBox } from "devextreme-react";
import { Search, Filter, Calendar } from "lucide-react";

export default function FilterComponent() {
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState(null);

  return (
    <div className="flex items-center bg-gray-50 p-4 rounded-lg w-full max-w-3xl">
      {/* Filter By Label */}
      <div className="flex items-center text-blue-500 mr-4">
        <FiFilter className="mr-2" size={18} />
        <span className="font-medium">Filter By :</span>
      </div>

      {/* Search Input */}
      <div className="relative flex-grow mr-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="text-gray-400" size={16} />
        </div>
        <TextBox
          className="w-full p-2 pl-10 bg-white border-b border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Search by first name, last name"
          value={searchValue}
          onValueChanged={(e) => setSearchValue(e.value)}
        />
      </div>

      {/* Equal to Dropdown */}
      <div className="relative mr-4">
        <select className="appearance-none bg-white border-b border-gray-300 py-2 px-4 pr-8 focus:outline-none focus:border-blue-500">
          <option>Equal to</option>
          <option>Contains</option>
          <option>Starts with</option>
          <option>Ends with</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {/* Date Picker */}
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Calendar className="text-gray-400" size={16} />
        </div>
        <DateBox
          className="bg-white border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-blue-500"
          placeholder="22/2/2000"
          displayFormat="dd/M/yyyy"
          value={dateValue}
          onValueChanged={(e) => setDateValue(e.value)}
        />
      </div>
    </div>
  );
}
