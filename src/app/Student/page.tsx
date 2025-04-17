// // pages/students/index.js
// import { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import { Button } from "devextreme-react";
// import DataGrid, {
//   Column,
//   FilterRow,
//   HeaderFilter,
//   Paging,
//   Pager,
//   Editing,
//   RequiredRule,
//   Lookup,
// } from "devextreme-react/data-grid";
// import DateBox from "devextreme-react/date-box";
// import { logout, getAuthToken } from "../../services/auth";
// import Cookies from "js-cookie";

// const mockStudents = [
//   {
//     id: 1,
//     firstName: "Aisha",
//     lastName: "Doe",
//     dob: "1998-05-15",
//     education: "University",
//     gender: "male",
//     country: "Egypt",
//     city: "Cairo",
//     mobile: "",
//     notes: "Very active...",
//   },
//   {
//     id: 2,
//     firstName: "Aisha",
//     lastName: "Mohamed",
//     dob: "1996-05-15",
//     education: "High School",
//     gender: "male",
//     country: "Egypt",
//     city: "Cairo",
//     mobile: "+20-111-987-6543",
//     notes: "Very active...",
//   },
//   // ... more mock data as needed
// ];

// const educationLevels = [
//   { value: "University", text: "University" },
//   { value: "High School", text: "High School" },
// ];

// const genders = [
//   { value: "male", text: "Male" },
//   { value: "female", text: "Female" },
// ];

// export default function StudentsPage() {
//   const router = useRouter();
//   const [userName, setUserName] = useState("");
//   const [students, setStudents] = useState(mockStudents);
//   const [search, setSearch] = useState("");
//   const [language, setLanguage] = useState("English");

//   useEffect(() => {
//     const token = getAuthToken();
//     const storedUserName = Cookies.get("user_name");
//     if (!token) {
//       router.push("/Login");
//     } else {
//       setUserName(storedUserName || "User");
//     }
//   }, [router]);

//   // Filter logic (simple client-side for mock data)
//   const filteredStudents = students.filter((s) => {
//     const q = search.toLowerCase();
//     return (
//       s.firstName.toLowerCase().includes(q) ||
//       s.lastName.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r flex flex-col justify-between min-h-screen">
//         <div>
//           <div className="flex items-center gap-2 px-6 py-6 border-b">
//             <span className="font-bold text-lg">Logo</span>
//           </div>
//           <nav className="mt-4">
//             <ul>
//               <li className="px-6 py-3 bg-blue-50 text-blue-700 rounded-r-full font-semibold flex items-center gap-2">
//                 <span className="material-icons">table_chart</span>
//                 Students' Data
//               </li>
//             </ul>
//           </nav>
//         </div>
//         <div className="px-6 py-4 border-t">
//           <Button
//             text="Logout"
//             onClick={logout}
//             stylingMode="outlined"
//             className="!border-gray-300 !text-gray-600 hover:!bg-gray-100 w-full"
//           />
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="flex justify-between items-center px-8 py-4 border-b bg-white">
//           <h1 className="text-xl font-semibold">Students' Data</h1>
//           <div className="flex items-center gap-4">
//             <Button
//               text={language}
//               stylingMode="outlined"
//               icon="globe"
//               onClick={() =>
//                 setLanguage(language === "English" ? "Arabic" : "English")
//               }
//               className="!border-gray-300 !text-gray-600 hover:!bg-gray-100"
//             />
//             <span className="text-gray-600 font-medium">{userName}</span>
//             <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//               <span className="material-icons text-gray-500">person</span>
//             </div>
//           </div>
//         </header>

//         {/* Filter/Search Bar */}
//         <div className="flex items-center gap-4 px-8 py-4 bg-gray-50 border-b">
//           <span className="font-medium text-gray-700">Filter By :</span>
//           <input
//             type="text"
//             placeholder="Search by first name, last name"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border rounded px-3 py-2 w-72 focus:outline-none focus:ring"
//           />
//         </div>

//         {/* DataGrid Section */}
//         <main className="flex-1 p-8 bg-gray-50 overflow-auto">
//           <div className="bg-white rounded-lg shadow p-4">
//             <DataGrid
//               dataSource={filteredStudents}
//               keyExpr="id"
//               showBorders={true}
//               columnAutoWidth={true}
//               allowColumnResizing={true}
//               rowAlternationEnabled={true}
//               focusedRowEnabled={true}
//               height={500}
//               wordWrapEnabled={true}
//               hoverStateEnabled={true}
//               showColumnLines={true}
//               showRowLines={true}
//               repaintChangesOnly={true}
//               allowColumnReordering={true}
//             >
//               <FilterRow visible={true} />
//               <HeaderFilter visible={true} />
//               <Paging defaultPageSize={5} />
//               <Pager
//                 showPageSizeSelector={true}
//                 allowedPageSizes={[5, 10, 25]}
//                 showNavigationButtons={true}
//                 showInfo={true}
//               />
//               <Editing
//                 mode="cell"
//                 allowUpdating={true}
//                 allowAdding={true}
//                 allowDeleting={true}
//                 useIcons={true}
//               />
//               <Column dataField="firstName" caption="First Name" />
//               <Column dataField="lastName" caption="Last Name" />
//               <Column
//                 dataField="dob"
//                 caption="Date of Birth"
//                 dataType="date"
//                 editCellComponent={DateBox}
//               />
//               <Column
//                 dataField="education"
//                 caption="Educational level"
//                 cellRender={({ value }) => value}
//                 editCellRender={({ value, setValue }) => (
//                   <select
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     className="border rounded px-2 py-1"
//                   >
//                     {educationLevels.map((lvl) => (
//                       <option key={lvl.value} value={lvl.value}>
//                         {lvl.text}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               />
//               <Column
//                 dataField="gender"
//                 caption="Gender"
//                 cellRender={({ value }) => value}
//                 editCellRender={({ value, setValue }) => (
//                   <select
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     className="border rounded px-2 py-1"
//                   >
//                     {genders.map((g) => (
//                       <option key={g.value} value={g.value}>
//                         {g.text}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               />
//               <Column dataField="country" caption="Country" />
//               <Column dataField="city" caption="City" />
//               <Column
//                 dataField="mobile"
//                 caption="Mobile"
//                 cellRender={({ value }) =>
//                   value ? (
//                     value
//                   ) : (
//                     <span className="bg-red-200 text-red-700 px-2 py-1 rounded text-xs font-semibold">
//                       MOBILE IS required
//                     </span>
//                   )
//                 }
//                 editCellRender={({ value, setValue }) => (
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     className="border rounded px-2 py-1"
//                   />
//                 )}
//               >
//                 <RequiredRule message="Mobile is required" />
//               </Column>
//               <Column dataField="notes" caption="Notes" />
//             </DataGrid>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Button } from "devextreme-react";
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  Paging,
  Pager,
  Editing,
  RequiredRule,
} from "devextreme-react/data-grid";
import DateBox from "devextreme-react/date-box";
import { logout, getAuthToken } from "@/services/api"; // Ensure correct path
import Cookies from "js-cookie";

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
];

const educationLevels = [
  { value: "University", text: "University" },
  { value: "High School", text: "High School" },
];

const genders = [
  { value: "male", text: "Male" },
  { value: "female", text: "Female" },
];

export default function StudentsPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const token = getAuthToken();
    const storedUserName = Cookies.get("user_name");
    if (!token) {
      router.push("/login");
    } else {
      setUserName(storedUserName || "User");
    }
  }, [router]);

  const filteredStudents = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.firstName.toLowerCase().includes(q) ||
      s.lastName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col justify-between min-h-screen">
        <div>
          <div className="flex items-center gap-2 px-6 py-6 border-b">
            <span className="font-bold text-lg">Logo</span>
          </div>
          <nav className="mt-4">
            <ul>
              <li className="px-6 py-3 bg-blue-50 text-blue-700 rounded-r-full font-semibold flex items-center gap-2">
                <span className="material-icons">table_chart</span>
                Students' Data
              </li>
            </ul>
          </nav>
        </div>
        <div className="px-6 py-4 border-t">
          <Button
            text="Logout"
            onClick={logout}
            stylingMode="outlined"
            className="!border-gray-300 !text-gray-600 hover:!bg-gray-100 w-full"
          />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center px-8 py-4 border-b bg-white">
          <h1 className="text-xl font-semibold">Students' Data</h1>
          <div className="flex items-center gap-4">
            <Button
              text={language}
              stylingMode="outlined"
              icon="globe"
              onClick={() =>
                setLanguage(language === "English" ? "Arabic" : "English")
              }
              className="!border-gray-300 !text-gray-600 hover:!bg-gray-100"
            />
            <span className="text-gray-600 font-medium">{userName}</span>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="material-icons text-gray-500">person</span>
            </div>
          </div>
        </header>

        <div className="flex items-center gap-4 px-8 py-4 bg-gray-50 border-b">
          <span className="font-medium text-gray-700">Filter By :</span>
          <input
            type="text"
            placeholder="Search by first name, last name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-72 focus:outline-none focus:ring"
          />
        </div>

        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
          <div className="bg-white rounded-lg shadow p-4">
            <DataGrid
              dataSource={filteredStudents}
              keyExpr="id"
              showBorders={true}
              columnAutoWidth={true}
              allowColumnResizing={true}
              rowAlternationEnabled={true}
              focusedRowEnabled={true}
              height={500}
              wordWrapEnabled={true}
              hoverStateEnabled={true}
              showColumnLines={true}
              showRowLines={true}
              repaintChangesOnly={true}
              allowColumnReordering={true}
            >
              <FilterRow visible={true} />
              <HeaderFilter visible={true} />
              <Paging defaultPageSize={5} />
              <Pager
                showPageSizeSelector={true}
                allowedPageSizes={[5, 10, 25]}
                showNavigationButtons={true}
                showInfo={true}
              />
              <Editing
                mode="cell"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
                useIcons={true}
              />
              <Column dataField="firstName" caption="First Name" />
              <Column dataField="lastName" caption="Last Name" />
              <Column
                dataField="dob"
                caption="Date of Birth"
                dataType="date"
                editCellComponent={DateBox}
              />
              <Column
                dataField="education"
                caption="Educational level"
                cellRender={({ value }) => value}
                editCellRender={({ value, setValue }) => (
                  <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {educationLevels.map((lvl) => (
                      <option key={lvl.value} value={lvl.value}>
                        {lvl.text}
                      </option>
                    ))}
                  </select>
                )}
              />
              <Column
                dataField="gender"
                caption="Gender"
                cellRender={({ value }) => value}
                editCellRender={({ value, setValue }) => (
                  <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    ascendants=
                    {genders.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.text}
                      </option>
                    ))}
                  </select>
                )}
              />
              <Column dataField="country" caption="Country" />
              <Column dataField="city" caption="City" />
              <Column
                dataField="mobile"
                caption="Mobile"
                cellRender={({ value }) =>
                  value ? (
                    value
                  ) : (
                    <span className="bg-red-200 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                      MOBILE IS required
                    </span>
                  )
                }
                editCellRender={({ value, setValue }) => (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                )}
              >
                <RequiredRule message="Mobile is required" />
              </Column>
              <Column dataField="notes" caption="Notes" />
            </DataGrid>
          </div>
        </main>
      </div>
    </div>
  );
}
