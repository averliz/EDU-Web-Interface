import React, { useRef, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import DataTable from "react-data-table-component";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// define a styled component
const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const TableWrapper = styled.div`
  margin: 20px 0 auto;
  border: 1px solid #c9c9c9;
  padding: 0 0.5rem;
`;

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Sentiment Analysis",
    },
  },
};

// const StyledHighlighter = styled.Highlighter`
//   background-color: ${(props) =>
//     props.sentiment === "positive"
//       ? "rgba(151, 227, 194)"
//       : props.sentiment === "positive"
//       ? "rgba(246, 156, 158)"
//       : props.sentiment === "positive"
//       ? "rgba(170, 210, 236)"
//       : "rgb(255, 243, 205)"};
// `;

const getBarColor = (label) => {
  switch (label) {
    case "positive":
      return "rgba(151, 227, 194, 0.7)";
    case "negative":
      return "rgba(246, 156, 158, 0.7)";
    case "neutral":
      return "rgba(170, 210, 236, 0.7)";
    default:
      return "rgba(170, 210, 236, 0.7)";
  }
};

// const transformData = (data) => {
//   // Extract all the unique values from the input data
//   const uniqueValues = new Set();
//   for (const key in data) {
//     data[key].forEach((value) => uniqueValues.add(value));
//   }

//   // Create the datasets array
//   const datasets = [];
//   uniqueValues.forEach((value) => {
//     const dataCounts = [];
//     for (const key in data) {
//       const count = data[key].filter((val) => val === value).length;
//       dataCounts.push(count);
//     }
//     datasets.push({
//       label: value,
//       data: dataCounts,
//       backgroundColor: getBarColor(value),
//     });
//   });

//   // Create the final object with the keys and datasets
//   const labels = Object.keys(data);
//   return { labels, datasets };
// };

const obtainEduByAspSentiment = (rawData, aspIndex) => {
  const filteredIndices = [];
  rawData.forEach((obj, outerIndex) => {
    const scores = obj.edu_score[aspIndex];
    const scoreIndices = [];
    scores.forEach((score, scoreIndex) => {
      if (score >= 0.5) {
        scoreIndices.push(scoreIndex);
      }
    });
    if (scoreIndices.length !== 0) {
      filteredIndices.push({ outerIndex, scoreIndices });
    }
  });
  return filteredIndices;
};

const highlightRawText = (
  rawData,
  indexOfHighlightedText,
  currAsp,
  currLabel
) => {
  const highlightedData = [];
  const colTitle = `Sentiment Analysis - ${currAsp}: ${currLabel}`;

  indexOfHighlightedText.forEach(({ outerIndex, scoreIndices }) => {
    const currRawText = rawData[outerIndex].raw_text;

    const highlightedTextArray = currRawText
      .filter((_, index) => scoreIndices.includes(index))
      .map((text) => `${text}`);

    highlightedData.push({
      text: rawData[outerIndex].text,
      textToHighlight: highlightedTextArray,
    });
  });

  return { colTitle, highlightedData };
};

const CustomCell = ({ row }) => (
  <div>
    <Highlighter
      highlightClassName="SentimentHighlighter"
      searchWords={row.textToHighlight}
      textToHighlight={row.text}
      autoEscape
    />
  </div>
);

const segmentHighlighter = {
  id: "segmentHighlighter",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const {
      data,
      ctx,
      tooltip,
      chartArea: { top, height },
      scales: { x, y },
    } = chart;

    ctx.save();
    const segmentWidth = x.width / data.labels.length;

    if (tooltip._active[0]) {
      const xCoor =
        x.getPixelForValue(tooltip._active[0].index) - segmentWidth / 2;
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(xCoor, top, segmentWidth, height);
    }
  },
};

const ChartComponent = ({ rawData, chartData, selectedOption }) => {
  const chartRef = useRef();
  // const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [colTitle, setColTitle] = useState("");
  const location = useLocation();


  // useEffect(() => {
  //   var chartData = transformData(aspectSentimentData);
  //   setChartData(chartData);
  // }, []);

  const onClick = (event) => {
    const elem = getElementAtEvent(chartRef.current, event);
    var aspIndex = elem[0].index;
    var sentimentIndex = elem[0].datasetIndex;

    var currAsp = chartData.labels[aspIndex];
    var currLabel = chartData.datasets[sentimentIndex].label;

    var filteredData = rawData.filter(
      (data) => data.labels[currAsp] === currLabel
    );

    let indexOfHighlightedText = obtainEduByAspSentiment(
      filteredData,
      aspIndex
    );

    let dataToHighlight = highlightRawText(
      filteredData,
      indexOfHighlightedText,
      currAsp,
      currLabel
    );

    setTableData(dataToHighlight.highlightedData);
    setColTitle(dataToHighlight.colTitle);
  };

  const columns = [
    {
      name: "Sentiment analysis",
      selector: (row) => row.text,
      wrap: true,
      center: false,
      cell: (row) => <CustomCell row={row} />,
    },
  ];

  if (colTitle.length !== 0) {
    columns[0].name = colTitle;
  }

  return (
    <SubWrapper>
      <div>
        {chartData ? (
          <Bar
            key={selectedOption}
            data={chartData}
            onClick={onClick}
            ref={chartRef}
            options={{ maintainAspectRatio: true }}
            // key={location.pathname}
            // plugins={[segmentHighlighter]}
          >
            {/* {" "} */}
          </Bar>
        ) : (
          "Loading..."
        )}
      </div>
      <div>
        {tableData ? (
          <TableWrapper>
            <DataTable columns={columns} data={tableData} pagination />
          </TableWrapper>
        ) : (
          ""
        )}
      </div>
    </SubWrapper>
  );
};

export default ChartComponent;
