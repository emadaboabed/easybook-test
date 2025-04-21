"use client";

import React, { useEffect, useState } from "react";
import "devextreme/dist/css/dx.light.css";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Export,
  RequiredRule,
  SearchPanel,
} from "devextreme-react/data-grid";
import Image from "next/image";
import { Button, TextBox } from "devextreme-react";
import CustomDate from "@/components/customDate";
import { useStudents } from "@/context/student";
import { logout } from "@/services/auth";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import LogoutConfirmationModal from "@/components/LogoutConfirmationModal";
import Cookies from "js-cookie";
import notify from "devextreme/ui/notify";
import Router from "next/router";

export default function StudentPage() {
  const [language, setLanguage] = useState("English");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [userName, setUserName] = useState<string>("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteRowData, setDeleteRowData] = useState(null);
  const {
    students,
    grades,
    genders,
    loading,
    error,
    refreshData,
    addStudent,
    editStudent,
    deleteStudents,
  } = useStudents();

  const handleRowInserted = async (e) => {
    try {
      await addStudent({
        firstName: e.data.firstName,
        lastName: e.data.lastName,
        birthDate: e.data.birthDate,
        grade: e.data.grade?.id || e.data.grade,
        gender: e.data.gender?.id || e.data.gender,
        country: e.data.country,
        city: e.data.city,
        phone: e.data.phone,
        remarks: e.data.remarks,
      });
      notify("Student added successfully!", "success", 4000);
    } catch {
      notify("Failed to add student", "error", 4000);
    }
  };

  const handleRetry = () => {
    refreshData();
  };
  const handleRowUpdated = async (e) => {
    try {
      await editStudent({
        id: e.data.id,
        firstName: e.data.firstName,
        lastName: e.data.lastName,
        birthDate: e.data.birthDate,
        grade: e.data.grade?.id || e.data.grade,
        gender: e.data.gender?.id || e.data.gender,
        country: e.data.country,
        city: e.data.city,
        phone: e.data.phone,
        remarks: e.data.remarks,
      });
      notify("Student updated successfully!", "success", 4000);
    } catch {
      notify("Failed to update student", "error", 4000);
    }
  };

  useEffect(() => {
    setUserName(Cookies.get("user_name") || "");
  }, []);

  const handleRowRemoved = async (e) => {
    try {
      await deleteStudents([e.data.id]);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // filter logic...
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      !searchValue ||
      s.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchValue.toLowerCase());
    const matchesDate =
      !dateValue ||
      new Date(s.birthDate).toDateString() ===
        new Date(dateValue).toDateString();
    return matchesSearch && matchesDate;
  });

  // Lookup data for DataGrid
  const gradesLookup = grades.map((g) => ({
    value: g.id,
    displayValue: g.translations[0]?.name,
  }));

  const gendersLookup = genders.map((gender) => ({
    id: gender.id,
    value: gender.id,
    displayValue: gender.translations[0]?.name || "Unknown",
  }));

  const handleLogoutClick = () => {
    setLogoutModalVisible(true);
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    logout();
    notify("Logged out successfully", "success", 4000);
    setTimeout(() => Router.push("/login"), 4000);
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const onRowRemoving = (e) => {
    e.cancel = true;
    setDeleteRowData(e.data);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!deleteRowData) return;
    try {
      await deleteStudents([deleteRowData.id]);
      notify("Student deleted successfully!", "success", 4000);
    } catch {
      notify("Failed to delete student", "error", 4000);
    }
    setDeleteModalVisible(false);
    setDeleteRowData(null);
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setDeleteRowData(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 w-[250px] bg-white border-r border-[#e8e8e8] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-[250px] md:min-w-[250px] md:flex md:flex-col">
        <div className="p-6 border-b border-[#e8e8e8] flex items-center h-[14vh] gap-3">
          <Image
            className="ml-3"
            src="/logo.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span>Logo</span>
        </div>
        <nav className="flex-1 mt-5">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#edf4fe] text-blue-700 border-l-4 border-blue-500 h-14">
            <Image src="/student.svg" alt="Students" width={24} height={24} />
            <span>Students' Data</span>
          </div>
        </nav>

        <div className="p-4 border-t border-[#e8e8e8]">
          <Button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 hover:bg-gray-50"
            onClick={handleLogoutClick}
          >
            <Image src="/logout.svg" alt="Logout" width={24} height={24} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 w-full md:pl-0">
        <header className="w-full h-[72px] bg-white border-b border-[#e8e8e8] flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-end justify-end gap-4 me-7">
            <div className="flex items-end gap-2">
              <span className="text-gray-600 hidden sm:inline mb-2.5">
                {userName}
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
                className="!px-4"
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

        <main className="flex-1 bg-[#f3f6f9]">
          <span className="text-xl font-semibold h-4"></span>
          <div className="bg-white rounded-lg shadow-sm p-6 m-[20px]">
            <h1 className="text-2xl font-semibold mb-4">Students' Data</h1>
            <div className="flex flex-col gap-4">
              {/* Filter By Label */}
              <div className="flex items-center rounded-lg w-full">
                <div className="flex items-center text-blue-500 mr-4">
                  <Image
                    src="/filter.svg"
                    alt="Filter"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  <span className="font-medium">Filter By:</span>
                </div>

                {/* Search Input with Icon */}
                <div className="relative mr-4">
                  <TextBox
                    className="w-72 p-2 pl-10 !bg-[#ECECEC] !border-b-2 !border-[#8e8e8e]"
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
                  <CustomDate
                    value={dateValue}
                    onChange={(e) => setDateValue(e)}
                    placeholder="22/2/4000"
                  />
                </div>
              </div>
            </div>
            <hr className="border-t border-4 rounded-l-full rounded-r-full border-gray-200 my-6 print:hidden" />

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <span className="text-lg">Loading data...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center py-10 text-red-500">
                <span className="text-lg mb-4">{error}</span>
                <Button text="Retry" onClick={handleRetry} type="default" />
              </div>
            ) : (
              <DataGrid
                className="students-grid"
                dataSource={filteredStudents}
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
                onRowInserted={handleRowInserted}
                onRowUpdated={handleRowUpdated}
                onRowRemoving={onRowRemoving}
              >
                <Export enabled={true} />
                <Editing
                  mode="cell"
                  allowUpdating={true}
                  allowAdding={true}
                  allowDeleting={true}
                  useIcons={true}
                  confirmDelete={false}
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
                  dataField="birthDate"
                  caption="DATE OF BIRTH"
                  dataType="date"
                  format="MM/dd/yyyy"
                />
                <Column
                  allowFiltering={false}
                  dataField="grade.id"
                  caption="EDUCATIONAL LEVEL"
                  lookup={{
                    dataSource: gradesLookup,
                    valueExpr: "value",
                    displayExpr: "displayValue",
                  }}
                />
                <Column
                  allowFiltering={false}
                  dataField="gender.id"
                  caption="GENDER"
                  lookup={{
                    dataSource: gendersLookup,
                    valueExpr: "value",
                    displayExpr: "displayValue",
                  }}
                />
                <Column
                  allowFiltering={false}
                  dataField="country"
                  caption="COUNTRY"
                />
                <Column
                  allowFiltering={false}
                  dataField="city"
                  caption="CITY"
                />
                <Column
                  allowFiltering={false}
                  dataField="phone"
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
                  dataField="remarks"
                  caption="NOTES"
                  allowFiltering={false}
                />
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
            )}
          </div>
        </main>
      </div>
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
      />
      <LogoutConfirmationModal
        visible={logoutModalVisible}
        onHide={cancelLogout}
        onConfirm={handleLogout}
      />
    </div>
  );
}
