import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";

// const FormContainer = styled.div`
//   margin-top: 2rem;
// `;

// const ResultContainer = styled.div`
//   margin-top: 2rem;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   padding: 1rem;
// `;

// const HighlightedText = styled.span`
//   background-color: yellow;
// `;

const FormContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HighlightedText = styled.span`
  background-color: yellow;
`;

const SubmitForm = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/analyze", { text: inputText });
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <FormContainer>
      <h3>Enter your review for sentiment analysis:</h3>
      <br/>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Review"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={inputText}
          onChange={handleChange}
          sx={{
            minWidth: '600px', // Set the minimum width for the TextField
            marginBottom: '1rem', // Add some margin to separate the TextField from the Button
          }}
        />
        <br />
        <br/>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!inputText || loading}
          sx={{ marginTop: 1 }}
        >
          Analyze
        </Button>
      </form>

      {loading && (
        <ThreeDots color="#00BFFF" height={80} width={80} />
      )}

      {result && (
        <ResultContainer>
          <h4>Results:</h4>
          <p>Sentiment: {result.sentiment}</p>
          <p>
            Processed Text:{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: result.highlightedText
                  .replace(/<highlight>/g, "<HighlightedText>")
                  .replace(/<\/highlight>/g, "</HighlightedText>"),
              }}
            />
          </p>
        </ResultContainer>
      )}
    </FormContainer>
  );
};

export default SubmitForm;
