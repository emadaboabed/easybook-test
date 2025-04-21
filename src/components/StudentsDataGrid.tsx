// components/StudentsDataGrid.tsx
"use client";

import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Export,
  RequiredRule,
  SearchPanel,
} from "devextreme-react/data-grid";
import { useStudents } from "@/context/student";

const StudentsDataGrid = () => {
  const { students, grades, genders } = useStudents();

  const gradesLookup = grades.map((grade) => ({
    value: grade.id,
    displayValue: grade.translations[0]?.name || "Unknown",
  }));

  const gendersLookup = genders.map((gender) => ({
    value: gender.id,
    displayValue: gender.translations[0]?.name || "Unknown",
  }));

  return (
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
      <Column allowFiltering={false} dataField="country" caption="COUNTRY" />
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
      <Column dataField="notes" caption="NOTES" allowFiltering={false} />
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
  );
};

export default StudentsDataGrid;
