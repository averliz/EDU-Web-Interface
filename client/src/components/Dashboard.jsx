import React, { useState, useEffect } from "react";
import { FormHelperText, MenuItem, Select, FormControl } from "@mui/material";
import Table from "./Table";
import apiService from "../api/apiService";
import styled from "styled-components";
import ChartComponent from "./ChartComponent";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  > div:first-child {
    width: 40%;
  }

  > div:last-child {
    width: 60%;
  }
`;

const DropdownGroupWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;
  padding-left: 10px;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .MuiFormHelperText-root {
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
  }

  .MuiSelect-root {
    font-size: 1rem;
    font-weight: 400;
    color: #333;
  }

  .MuiSelect-selectMenu {
    padding: 10px 24px 10px 16px;
  }

  .MuiMenuItem-root {
    font-size: 1rem;
    font-weight: 400;
    color: #333;
  }
`;

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

const transformToChartData = (data) => {
  const uniqueValues = new Set();
  for (const key in data) {
    data[key].forEach((value) => uniqueValues.add(value));
  }

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

const Dashboard = ({}) => {
  const [data, setData] = useState(null);
  const [dataLabels, setDataLabels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("hard");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resData = await apiService.getResData(selectedOption);
      const { data, dataLabels } = processRawData(resData);
      setData(data);
      setDataLabels(dataLabels);
      setIsLoading(false);

      const newChartData = transformToChartData(dataLabels);
      setChartData(newChartData);
    };

    fetchData();
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const headers = [
    {
      name: "Reviews",
      selector: (row) => row.text,
      wrap: true,
      center: false,
    },
  ];

  const processRawData = (rawData) => {
    const dataLabels = {};

    const data = rawData.map((obj) => ({
      raw_text: obj.text,
      text: obj.text.join(" "),
      word_score: obj.word_score,
      edu_score: obj.edu_score,
      labels: obj.labels.reduce((asp, label) => {
        const [key, value] = label.split(":");
        asp[key] = value;
        dataLabels[key] = dataLabels[key] || [];
        dataLabels[key].push(value);
        return asp;
      }, {}),
      sem_true: obj.sem_true,
      asp_true: obj.asp_true,
    }));

    return { data, dataLabels };
  };

  return (
    <div>
      <DropdownGroupWrapper>
        <StyledFormControl>
          <FormHelperText id="choose-dataset-label">
            Choose Dataset:
          </FormHelperText>
          <Select
            labelId="choose-dataset-label"
            id="choose-dataset"
            value={selectedOption}
            onChange={handleChange}
          >
            <MenuItem value="hard">Rest14 - Hard</MenuItem>
            <MenuItem value="test">Rest14 - Test</MenuItem>
          </Select>
        </StyledFormControl>
      </DropdownGroupWrapper>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Wrapper>
          <Table headers={headers} data={data} labels={dataLabels} />

          <ChartComponent
            key={selectedOption}
            rawData={data}
            chartData={chartData}
            selectedOption={selectedOption}
          />
        </Wrapper>
      )}
    </div>
  );
};

export default Dashboard;
