// // src/DatasourceGrid.js

// import React, { useEffect, useState } from "react";
// import { DataGrid, Column, Editing } from "devextreme-react/data-grid";
// import { getDatasourceDetails, addValues } from "../../../apiService";

// const DatasourceGrid = ({ datasourceId }) => {
//   const [columns, setColumns] = useState([]);
//   const [values, setValues] = useState([]);

//   useEffect(() => {
//     if (datasourceId) {
//       const fetchDatasourceDetails = async () => {
//         const data = await getDatasourceDetails(datasourceId);
//         setColumns(data.columns);
//         setValues(data.values);
//       };
//       fetchDatasourceDetails();
//     }
//   }, [datasourceId]);

//   const onRowInserted = async (e) => {
//     const newValue = e.data;
//     const formattedValues = [newValue];

//     try {
//       await addValues(datasourceId, formattedValues);
//       const updatedValues = await getDatasourceDetails(datasourceId);
//       setValues(updatedValues.values);
//     } catch (error) {
//       console.error("Error adding value:", error);
//     }
//   };

//   return (
//     <DataGrid
//       dataSource={values}
//       onRowInserted={onRowInserted}
//       allowAdding={true}
//       showBorders={true}
//     >
//       <Editing mode="row" allowAdding={true} />
//       {columns.map((col) => (
//         <Column
//           key={col.columnName}
//           dataField={col.columnName}
//           dataType={col.dataType.toLowerCase()}
//           caption={col.columnName}
//         />
//       ))}
//     </DataGrid>
//   );
// };

// export default DatasourceGrid;

// src/DatasourceGrid.js

// import React, { useEffect, useState } from "react";
// import { DataGrid, Column, Editing } from "devextreme-react/data-grid";
// import { getDatasourceDetails, addValues } from "../../../apiService";

// const DatasourceGrid = ({ datasourceId }) => {
//   const [columns, setColumns] = useState([]);
//   const [values, setValues] = useState([]);

//   useEffect(() => {
//     if (datasourceId) {
//       const fetchDatasourceDetails = async () => {
//         const data = await getDatasourceDetails(datasourceId);
//         console.log("Columns:", data.columns);
//         console.log("Values:", data.values);
//         setColumns(data.columns);
//         setValues(data.values);
//       };
//       fetchDatasourceDetails();
//     }
//   }, [datasourceId]);

//   const onRowInserted = async (e) => {
//     const newValue = e.data;
//     const formattedValues = [newValue];

//     try {
//       await addValues(datasourceId, formattedValues);
//       const updatedValues = await getDatasourceDetails(datasourceId);
//       setValues(updatedValues.values);
//     } catch (error) {
//       console.error("Error adding value:", error);
//     }
//   };

//   return (
//     <DataGrid
//       dataSource={values}
//       onRowInserted={onRowInserted}
//       allowAdding={true}
//       showBorders={true}
//       keyExpr="RowId" // Assuming there is a unique identifier for each row
//     >
//       <Editing mode="row" allowAdding={true} />
//       {columns.map((col) => (
//         <Column
//           key={col.columnName}
//           dataField={col.columnName}
//           caption={col.columnName} // Use the columnName as the caption
//           dataType={col.dataType.toLowerCase()}
//         />
//       ))}
//     </DataGrid>
//   );
// };

// export default DatasourceGrid;

// src/DatasourceGrid.js

// import React, { useEffect, useState } from "react";
// import { DataGrid, Column, Editing } from "devextreme-react/data-grid";
// import { getDatasourceDetails, addValues } from "../../../apiService";

// const DatasourceGrid = ({ datasourceId }) => {
//   const [columns, setColumns] = useState([]);
//   const [values, setValues] = useState([]);
//   const [nextRowId, setNextRowId] = useState(1); // Initialize unique identifier

//   useEffect(() => {
//     if (datasourceId) {
//       const fetchDatasourceDetails = async () => {
//         try {
//           const data = await getDatasourceDetails(datasourceId);
//           console.log("Columns from API:", data.columns);
//           setColumns(data.columns);
//           setValues(data.values);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
//       fetchDatasourceDetails();
//     }
//   }, [datasourceId]);

//   const onRowInserted = async (e) => {
//     const newValue = e.data;
//     const formattedValues = [newValue];

//     try {
//       await addValues(datasourceId, formattedValues);
//       const updatedValues = await getDatasourceDetails(datasourceId);
//       setValues(updatedValues.values);
//     } catch (error) {
//       console.error("Error adding value:", error);
//     }
//   };

//   const generateRowId = () => {
//     const id = nextRowId;
//     setNextRowId(id + 1); // Increment for the next row
//     return id;
//   };

//   return (
//     <div>
//       {/* <h2>Columns:</h2>
//       <pre>{JSON.stringify(columns, null, 2)}</pre>
//       <h2>DataGrid:</h2> */}
//       <DataGrid
//         dataSource={values.map((row, index) => ({
//           ...row,
//           __rowId: index + 1,
//         }))}
//         onRowInserted={onRowInserted}
//         allowAdding={true}
//         showBorders={true}
//         keyExpr="__rowId" // Using custom __rowId as the keyExpr
//       >
//         <Editing mode="row" allowAdding={true} />
//         {columns.map((col) => (
//           <Column
//             key={col.columnName}
//             dataField={col.columnName}
//             caption={col.columnName}
//             dataType={col.dataType.toLowerCase()}
//           />
//         ))}
//       </DataGrid>
//     </div>
//   );
// };

// export default DatasourceGrid;

// src/DatasourceGrid.js
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  Column,
  Editing,
  ColumnChooser,
  ColumnFixing,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Sorting,
  Summary,
} from "devextreme-react/data-grid";
import { getDatasourceDetails, addValues } from "../../../apiService";
import "./DatasourceGrid.css"; // Import custom CSS file
const DatasourceGrid = ({ datasourceId }) => {
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([]);
  const [nextRowId, setNextRowId] = useState(1); // Initialize unique identifier
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatasourceDetails = async () => {
      try {
        const data = await getDatasourceDetails(datasourceId);
        console.log("Columns from API:", data.columns);
        setColumns(data.columns);
        setValues(data.values);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred while fetching data.");
        setLoading(false);
      }
    };

    if (datasourceId) {
      setLoading(true);
      fetchDatasourceDetails();
    }
  }, [datasourceId]);

  const onRowInserted = async (e) => {
    const newValue = e.data;
    const formattedValues = [newValue];

    try {
      await addValues(datasourceId, formattedValues);
      const updatedValues = await getDatasourceDetails(datasourceId);
      setValues(updatedValues.values);
    } catch (error) {
      console.error("Error adding value:", error);
      setError(error.message || "An error occurred while adding value.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <DataGrid
        dataSource={values.map((row, index) => ({
          ...row,
          __rowId: index + 1,
        }))}
        onRowInserted={onRowInserted}
        allowAdding={true}
        showBorders={true}
        keyExpr="__rowId" // Using custom __rowId as the keyExpr
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        wordWrapEnabled={true}
      >
        <Editing mode="row" allowAdding={true} />
        <ColumnChooser enabled={true} />
        <ColumnFixing enabled={true} />
        <Grouping />
        <GroupPanel visible={true} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10, 20]}
          showInfo={true}
        />
        <Paging defaultPageSize={10} />
        <SearchPanel visible={true} />
        <Sorting mode="multiple" />

        {columns.map((col) => (
          <Column
            key={col.columnName}
            dataField={col.columnName}
            caption={col.columnName}
            dataType={col.dataType.toLowerCase()}
          />
        ))}
      </DataGrid>
    </div>
  );
};

export default DatasourceGrid;
