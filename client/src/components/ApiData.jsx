import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import apiService from "../api/apiService";

function ApiData({ test }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/raw-data")
  //     .then((res) => {
  //       setData(JSON.parse(res.data));
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiService.getResData();
      setData(res);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const headers = [
    {
      name: "Reviews",
      selector: (row) => row.text,
      wrap: true,
      center: false,
    },
  ];

  const dataLabels = {};

  let tableData = null;

  if (test) {
    tableData = data
      ? data.test.map((obj) => ({
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
        }))
      : [];
  } else {
    tableData = data
      ? data.hard.map((obj) => ({
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
        }))
      : [];
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Table headers={headers} data={tableData} labels={dataLabels} />
        </div>
      )}
    </div>
  );
}

export default ApiData;
