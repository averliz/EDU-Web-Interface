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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const transformData = (data) => {
  // Extract all the unique values from the input data
  const uniqueValues = new Set();
  for (const key in data) {
    data[key].forEach((value) => uniqueValues.add(value));
  }

  // Create the datasets array
  const datasets = [];
  uniqueValues.forEach((value) => {
    const dataCounts = [];
    for (const key in data) {
      const count = data[key].filter((val) => val === value).length;
      dataCounts.push(count);
    }
    datasets.push({
      label: value,
      data: dataCounts,
      backgroundColor: getBarColor(value),
    });
  });

  // Create the final object with the keys and datasets
  const labels = Object.keys(data);
  return { labels, datasets };
};

function obtainEduByAspSentiment(rawData, aspIndex) {
  const filteredIndices = [];
  rawData.forEach((obj, outerIndex) => {
    const scores = obj.edu_score[aspIndex];
    const scoreIndices = [];
    scores.forEach((score, scoreIndex) => {
      if (score > 0.5) {
        scoreIndices.push(scoreIndex);
      }
    });
    if (scoreIndices.length !== 0) {
      filteredIndices.push({ outerIndex, scoreIndices });
    }
  });
  return filteredIndices;
}

function highlightRawText(rawData, indexOfHighlightedText) {
  const highlightedData = [];

  indexOfHighlightedText.forEach(({ outerIndex, scoreIndices }) => {
    const currRawText = rawData[outerIndex].raw_text;
    const highlightedTextArray = currRawText.map((text, index) => {
      return scoreIndices.includes(index) ? `<strong>${text}</strong>` : text;
    });

    highlightedData.push({ text: highlightedTextArray.join(" ") });
  });

  return highlightedData;
}

const headers = [
  {
    name: "Reviews",
    selector: (row) => row.text,
    wrap: true,
    center: false,
  },
];

const ChartComponent = ({ rawData, aspectSentimentData }) => {
  const chartRef = useRef();
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    var chartData = transformData(aspectSentimentData);
    setChartData(chartData);
  }, []);

  const onClick = (event) => {
    const elem = getElementAtEvent(chartRef.current, event);
    var aspIndex = elem[0].index;
    var sentimentIndex = elem[0].datasetIndex;

    var filteredData = rawData.filter(
      (data) =>
        data.labels[chartData.labels[aspIndex]] ===
        chartData.datasets[sentimentIndex].label
    );

    let indexOfHighlightedText = obtainEduByAspSentiment(
      filteredData,
      aspIndex
    );

    let highlightedData = highlightRawText(
      filteredData,
      indexOfHighlightedText
    );

    setTableData(highlightedData);
  };

  // const chartData = transformData(aspectSentimentData);

  return (
    <div>
      <div>
        {chartData ? (
          <Bar
            data={chartData}
            onClick={onClick}
            ref={chartRef}
            options={{ maintainAspectRatio: true }}
          >
            {" "}
          </Bar>
        ) : (
          "Loading..."
        )}
      </div>
      <div>
        {tableData ? <DataTable columns={headers} data={tableData} /> : ""}
      </div>
    </div>
  );
};

export default ChartComponent;
