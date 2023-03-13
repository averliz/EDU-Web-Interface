import React, { useState } from "react";

import styled from "styled-components";
import SubTable from "./SubTable";
import BarChartComponent from "./BarChartComponent";
import ChartComponent from "./ChartComponent";
import Card from "./Card";
import DataTable from "react-data-table-component";

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  // padding: 0rem 1rem 0rem 0rem;
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
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const getSubTableData = () => {
    if (selectedRow !== null) {
      const rowData = data[selectedRow];
      return (
        <SubTableWrapper>
          {Object.entries(rowData.labels).map(([key, value]) => (
            <Card title={key} text={value} />
          ))}
          {/* <SubTable rowData={rowData} /> */}
        </SubTableWrapper>
      );
    }
    return null;
  };

  return (
    <TableContainer>
      <TableWrapper>
        <DataTable columns={headers} data={data} customStyles={customStyles} pagination/>
      </TableWrapper>
      <ChartWrapper>
        <ChartComponent rawData={data} aspectSentimentData={labels} />
        {/* {getSubTableData()} */}
      </ChartWrapper>
    </TableContainer>
  );
};

export default Table;
