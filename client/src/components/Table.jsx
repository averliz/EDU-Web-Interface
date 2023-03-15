import React from "react";

import styled from "styled-components";
import ChartComponent from "./ChartComponent";
import DataTable from "react-data-table-component";

const TableContainer = styled.div`
  width: 50%;
  // display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  border: 1px solid #c9c9c9;
`;

const TableWrapper = styled.div`
  width: 50%;
  padding: 0 0.5rem;
  border: 1px solid #c9c9c9;
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  cursor: pointer;
  &:focus {
    background-color: #105b72c2;
  }
  &:hover {
    background-color: rgba(170, 210, 236, 0.6);
  }
`;

const TableData = styled.td`
  padding: 0.75rem;
  overflow: clip;
  text-overflow: ellipsis;
  border-right: 1px solid #ddd;
  &:last-child {
    border-right: none;
  }
`;

const SubTableWrapper = styled.div`
  // margin: 1rem;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: sticky;
`;

const ChartWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const Table = ({ headers, data, labels }) => {
  // const [selectedRow, setSelectedRow] = useState(null);

  // const handleRowClick = (index) => {
  //   setSelectedRow(index);
  // };

  return (
    <TableContainer>
      <DataTable
        columns={headers}
        data={data}
        customStyles={customStyles}
        pagination
      />
      {/* <TableWrapper>
      </TableWrapper> */}
    </TableContainer>
  );
};

export default Table;
