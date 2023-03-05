import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import styled from "styled-components";

const BarChartContainer = styled.div`
  width: 50%;
  margin: 1rem;
`;

const ChartWrapper = styled.div`
  position: relative;
`;

const HighlightBar = styled.div`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const convertData = (data) => {
  const keys = Object.keys(data);
  const result = [];
  for (const key of keys) {
    const values = data[key];
    const count = { positive: 0, neutral: 0, negative: 0 };
    for (const value of values) {
      count[value]++;
    }
    result.push({ aspect: key, ...count });
  }
  return result;
};

const BarChartComponent = ({ data }) => {
  let selectedRow = true;
  const handleClick = (dataPoint) => {
    // Do something when a bar is clicked
    // console.log(dataPoint);
  };

  const chartData = convertData(data)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartWrapper>
        {selectedRow !== null && (
          <HighlightBar
            left={(data.length - selectedRow - 1) * 40 + 35}
            top={0}
            width={40}
            height={200}
          />
        )}
        <BarChart
          width={500}
          height={200}
          data={chartData}
          onClick={handleClick}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="aspect" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="positive" stackId="a" fill="#82ca9d" />
          <Bar dataKey="neutral" stackId="a" fill="#ffc658" />
          <Bar dataKey="negative" stackId="a" fill="#8884d8" />
        </BarChart>
      </ChartWrapper>
    </ResponsiveContainer>
  );
};

BarChartComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOf(["Positive", "Neutral", "Negative"]).isRequired,
    })
  ).isRequired,
  selectedRow: PropTypes.number,
};

BarChartComponent.defaultProps = {
  selectedRow: null,
};

export default BarChartComponent;
