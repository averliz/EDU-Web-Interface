import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SubTable from "./SubTable";
import BarChartComponent from "./BarChartComponent";

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
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
  &:hover {
    background-color: #105b72c2;
  }
`;

const TableData = styled.td`
  padding: 0.75rem;
  // white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-right: 1px solid #ddd;
  &:last-child {
    border-right: none;
  }
`;

const SubTableWrapper = styled.div`
  width: 50%;
  position: sticky;
  top: 0;
  padding: 0 0.5rem;
`;

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
          <SubTable rowData={rowData} />
        </SubTableWrapper>
      );
    }
    return null;
  };

  return (
    <TableContainer>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <TableHeader key={header}>{header}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <TableRow key={index} onClick={() => handleRowClick(index)}>
                {/* {Object.values(row).map((cell, index) => (
                  <TableData key={index}>{cell}</TableData>
                ))} */}
                <TableData>{row.text}</TableData>
              </TableRow>
            ))}
          </tbody>
        </table>
      </TableWrapper>
      {getSubTableData()}
      <BarChartComponent data={labels}/>

    </TableContainer>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.arrayOf(PropTypes.string).isRequired,
      word_score: PropTypes.arrayOf(PropTypes.number).isRequired,
      edu_score: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
};

export default Table;
