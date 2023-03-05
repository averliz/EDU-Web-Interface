import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

function ApiData() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/raw-data")
      .then((res) => {
        setData(JSON.parse(res.data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const headers = ["Reviews"];

  const hardLabels = {};

  const hardData = data
    ? data.hard.map((obj) => ({
        text: obj.text.join(" "),
        word_score: obj.word_score,
        edu_score: obj.edu_score,
        labels: obj.labels.reduce((asp, label) => {
          const [key, value] = label.split(":");
          asp[key] = value;
          hardLabels[key] = hardLabels[key] || [];
          hardLabels[key].push(value);
          // hardLabels[key] = value;
          return asp;
        }, {}),
        sem_true: obj.sem_true,
        asp_true: obj.asp_true,
      }))
    : [];

  //   const testData = data ? data.test.map((obj) => ({
  //     text: obj.text.join(' '),
  //     word_score: obj.word_score,
  //     edu_score: obj.edu_score,
  //     labels: obj.labels,
  //     sem_true: obj.sem_true,
  //     asp_true: obj.asp_true
  //   })) : [];

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Table headers={headers} data={hardData} labels={hardLabels} />
          {/* <Table headers={headers} data={testData} /> */}
        </div>
      )}
    </div>
  );
}

export default ApiData;
