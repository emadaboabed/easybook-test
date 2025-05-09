import React, { useState } from "react";
import { SelectBox, DateBox } from "devextreme-react";

export default function FilterComponent() {
  const [filterOperator, setFilterOperator] = useState("equal");
  const [dateValue, setDateValue] = useState(new Date(2000, 1, 22)); // Feb 22, 2000

  const operators = [
    { id: "equal", text: "Equal to" },
    { id: "contains", text: "Contains" },
    { id: "startswith", text: "Starts with" },
    { id: "endswith", text: "Ends with" },
  ];

  return (
    <div className="flex items-center w-fit !bg-[#f5f5f5] !border-b-2 !border-[#8e8e8e]">
      {/* Equal to dropdown */}
      <div className="  border-r border-gray-300">
        <SelectBox
          items={operators}
          valueExpr="id"
          displayExpr="text"
          value={filterOperator}
          className="w-28"
          onValueChanged={(e) => setFilterOperator(e.value)}
          dropDownButtonRender={() => (
            <div className="text-gray-600">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          stylingMode="filled"
        />
      </div>

      {/* Date picker */}

      <DateBox
        value={dateValue}
        onValueChanged={(e) => setDateValue(e.value)}
        displayFormat="dd/M/yyyy"
        stylingMode="filled"
        className="w-36"
        openOnFieldClick={true}
        showClearButton={false}
      />
    </div>
  );
}
// "use client";

// import React from "react";
// import { DateBox } from "devextreme-react";
// import Image from "next/image";

// interface CustomDateProps {
//   value: string | Date | null;
//   onChange: (date: Date | null) => void;
//   placeholder?: string;
//   className?: string;
//   disabled?: boolean;
// }

// const CustomDate: React.FC<CustomDateProps> = ({
//   value,
//   onChange,
//   placeholder = "dd/mm/yyyy",
//   className = "",
//   disabled = false,
// }) => {
//   return (
//     <div className="relative">
//       <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
//         <Image src="/calendar.svg" alt="Calendar" width={16} height={16} />
//       </div>
//       <DateBox
//         value={value}
//         onValueChanged={(e) => onChange(e.value)}
//         displayFormat="dd/MM/yyyy"
//         placeholder={placeholder}
//         openOnFieldClick={true}
//         showClearButton={true}
//         disabled={disabled}
//         className={`w-56 p-2 !bg-[#ECECEC] !border-b-2 !border-[#8e8e8e] pr-8 ${className}`}
//         stylingMode="underlined"
//         calendarOptions={{
//           maxZoomLevel: "month",
//           minZoomLevel: "century",
//         }}
//       />
//     </div>
//   );
// };

// export default CustomDate;
