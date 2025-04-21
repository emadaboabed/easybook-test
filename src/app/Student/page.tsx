"use client";

import React, { useState } from "react";
import "devextreme/dist/css/dx.light.css";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Export,
  RequiredRule,
  SearchPanel,
  Item,
} from "devextreme-react/data-grid";
import Image from "next/image";
import { Button, DateBox, List, TextBox, Toolbar } from "devextreme-react";
import FilterComponent from "@/components/Filter";
import CustomDate from "@/components/customDate";

const mockStudents = [
  {
    id: 1,
    firstName: "Aisha",
    lastName: "Doe",
    dob: "1998-05-15",
    education: "University",
    gender: "male",
    country: "Egypt",
    city: "Cairo",
    mobile: "",
    notes: "Very active...",
  },
  {
    id: 2,
    firstName: "Aisha",
    lastName: "Mohamed",
    dob: "1996-05-15",
    education: "High School",
    gender: "male",
    country: "Egypt",
    city: "Cairo",
    mobile: "+20-111-987-6543",
    notes: "Very active...",
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 3,
    firstName: "Aisha",
    lastName: i % 2 === 0 ? "Doe" : "Mohamed",
    dob: "1996-05-15",
    education: i % 2 === 0 ? "University" : "High School",
    gender: "male",
    country: "Egypt",
    city: "Cairo",
    mobile: "+20-111-987-6543",
    notes: "Very active...",
  })),
];
const customizePages = (pages) => {
  const startPage = pages[0];
  const endPage = pages[pages.length - 1];

  if (startPage.value > 1) {
    pages.unshift({
      text: "<",
      value: startPage.value - 1,
      className: "custom-nav-button",
    });
  }

  if (endPage.value < pages[pages.length - 1].pageCount) {
    pages.push({
      text: ">",
      value: endPage.value + 1,
      className: "custom-nav-button",
    });
  }

  return pages;
};
const educationLevels = [
  { id: 1, value: "University" },
  { id: 2, value: "High School" },
];

const genders = [
  { id: 1, value: "male", text: "Male" },
  { id: 2, value: "female", text: "Female" },
];

function App() {
  const [language, setLanguage] = useState("English");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 w-[250px] bg-white border-r border-[#e8e8e8] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-[250px] md:min-w-[250px] md:flex md:flex-col">
        <div className="p-6 border-b  border-[#e8e8e8] flex items-center h-[14vh] gap-3">
          <Image
            className="ml-3"
            src="/logo.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span>Logo</span>
        </div>
        <nav className="flex-1  mt-5">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#edf4fe] text-blue-700 border-l-4 border-blue-500 h-14  ">
            <Image src="/student.svg" alt="Students" width={24} height={24} />
            <span>Students' Data</span>
          </div>
        </nav>

        <div className="p-4 border-t  border-[#e8e8e8] ">
          <Button className="w-full flex items-center justify-center gap-3 px-4 py-3  hover:bg-gray-50 ">
            <Image src="/logout.svg" alt="Logout" width={24} height={24} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 w-full md:pl-0">
        <header className="w-full h-[72px] bg-white border-b border-[#e8e8e8] flex items-center justify-end px-8 sticky top-0 z-10 ">
          <div className="flex items-end justify-end gap-4 me-7">
            <div className="flex items-end gap-2">
              <span className="text-gray-600 hidden sm:inline mb-2.5">
                William Jacob
              </span>
              <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                <Image
                  src="/avatar.svg"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </div>
              <Button
                className="!px-4  "
                onClick={() =>
                  setLanguage(language === "English" ? "Arabic" : "English")
                }
              >
                <Image
                  src="/language.svg"
                  alt="Language"
                  width={24}
                  height={24}
                />
                <span>{language}</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-[#f3f6f9] ">
          <span className="text-xl font-semibold h-4"></span>
          <div className="bg-white rounded-lg shadow-sm p-6 m-[20px] ">
            <h1 className="text-2xl font-semibold mb-4">Students' Data</h1>
            <div className="flex flex-col gap-4">
              {/* Filter By Label */}
              <div className="flex items-center   rounded-lg w-full">
                <div className="flex items-center text-blue-500 mr-4">
                  <Image
                    src="/filter.svg"
                    alt="Filter"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  <span className="font-medium">Filter By :</span>
                </div>

                {/* Search Input with Icon */}
                <div className="relative mr-4">
                  <TextBox
                    className="w-72 p-2 pl-10 !bg-[#ECECEC] !border-b-2 !border-[#8e8e8e] "
                    placeholder="Search by first name, last name"
                    value={searchValue}
                    onValueChanged={(e) => setSearchValue(e.value)}
                    showClearButton={true}
                    mode="search"
                    valueChangeEvent="input"
                    stylingMode="underlined"
                  />
                </div>

                {/* Date Input with Calendar Icon */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {/* <Image
                      src="/calendar.svg"
                      alt="Calendar"
                      width={16}
                      height={16}
                    /> */}
                  </div>
                  <CustomDate
                    value={dateValue}
                    onChange={(e) => setDateValue(e)}
                    placeholder="22/2/2000"
                  />
                </div>
              </div>

              {/* DataGrid component */}
            </div>
            <hr className="border-t border-4 rounded-l-full rounded-r-full border-gray-200 my-6 print:hidden" />
            <DataGrid
              className="students-grid"
              dataSource={mockStudents}
              width="100%"
              height="calc(100% - 120px)"
              columnAutoWidth={false}
              allowColumnResizing={true}
              columnResizingMode="nextColumn"
              errorRowEnabled
              showBorders
              showColumnLines={false}
              showRowLines={true}
              rowAlternationEnabled={false}
              allowPaging={true}
              wordWrapEnabled={true}
            >
              <Export enabled={true} />
              <Editing
                mode="cell"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
                useIcons={true}
              />

              <Column
                dataField="firstName"
                caption="FIRST NAME"
                alignment="left"
                allowFiltering={false}
              />
              <Column
                allowFiltering={false}
                dataField="lastName"
                caption="LAST NAME"
                alignment="left"
              />
              <Column
                allowFiltering={false}
                dataField="dob"
                caption="DATE OF BIRTH"
                dataType="date"
                format="MM/dd/yyyy"
              />
              <Column
                allowFiltering={false}
                dataField="education"
                caption="EDUCATIONAL LEVEL"
                lookup={{
                  dataSource: educationLevels,
                  valueExpr: "value",
                  displayExpr: "value",
                }}
              />
              <Column
                allowFiltering={false}
                dataField="gender"
                caption="GENDER"
                lookup={{
                  dataSource: genders,
                  valueExpr: "value",
                  displayExpr: "text",
                }}
              />
              <Column
                allowFiltering={false}
                dataField="country"
                caption="COUNTRY"
              />
              <Column allowFiltering={false} dataField="city" caption="CITY" />
              <Column
                allowFiltering={false}
                dataField="mobile"
                caption="MOBILE"
                cellRender={(cellData) => {
                  return cellData.value ? (
                    <span>{cellData.value}</span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-2 py-0 rounded text-xs font-medium">
                      MOBILE IS required
                    </span>
                  );
                }}
              >
                <RequiredRule message="Mobile is required" />
              </Column>
              <Column
                dataField="notes"
                caption="NOTES"
                allowFiltering={false}
              />
              <hr className="border-t border-4 rounded-l-full rounded-r-full border-gray-200 my-6 print:hidden" />
              <Paging defaultPageSize={10} />
              <Pager
                visible={true}
                showPageSizeSelector={true}
                allowedPageSizes={[5, 10, 25]}
                showInfo={false}
                showNavigationButtons={false}
                displayMode="compact"
                label="Rows per page"
                infoText="Page {0} of {1} ({2} items)"
                needed
                cssClass="custom-pager"
              />
            </DataGrid>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
