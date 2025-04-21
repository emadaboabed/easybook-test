// components/StudentsFilter.tsx
"use client";

import { TextBox } from "devextreme-react";
import CustomDate from "@/components/customDate";
import Image from "next/image";

interface StudentsFilterProps {
  searchValue: string;
  dateValue: string;
  onSearchChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

const StudentsFilter: React.FC<StudentsFilterProps> = ({
  searchValue,
  dateValue,
  onSearchChange,
  onDateChange,
}) => (
  <div className="flex items-center rounded-lg w-full">
    <div className="flex items-center text-blue-500 mr-4">
      <Image
        src="/filter.svg"
        alt="Filter"
        width={24}
        height={24}
        className="mr-2"
      />
      <span className="font-medium">Filter By:</span>
    </div>

    <div className="relative mr-4">
      <TextBox
        className="w-72 p-2 pl-10 !bg-[#ECECEC] !border-b-2 !border-[#8e8e8e]"
        placeholder="Search by first name, last name"
        value={searchValue}
        onValueChanged={(e) => onSearchChange(e.value)}
        showClearButton
        mode="search"
      />
    </div>

    <div className="relative">
      <CustomDate
        value={dateValue}
        onChange={onDateChange}
        placeholder="22/2/2000"
      />
    </div>
  </div>
);

export default StudentsFilter;
