import React, { useState } from "react";
import styled from "styled-components";
import { Button as BootstrapButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HighlightedText = styled.span`
  background-color: ${({ isHighlighted }) =>
    isHighlighted ? "yellow" : "inherit"};
`;

const LabelButton = styled(BootstrapButton)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
  width: 600px;
  margin-bottom: 1rem;
`;


const ReviewResult = ({ result }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const processEduScore = (eduScore, aspTrue) => {
    const threshold = 0.5;
    const relevantEduScores = aspTrue
      .map((value, index) => (value === 1 ? eduScore[index] : null))
      .filter((item) => item !== null);

    return relevantEduScores.map((scores) =>
      scores
        .map((score, index) => (score > threshold ? index : null))
        .filter((item) => item !== null)
    );
  };

  const handleClick = (index) => {
    setHighlightedIndex(index);
  };

  const eduScoreIndexes = processEduScore(result.edu_score, result.asp_true);
  const segments = result.raw_text;

  return (
    <Wrapper>
      <p>
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <HighlightedText isHighlighted={highlightedIndex === index}>
              {segment}
            </HighlightedText>
            {index < segments.length - 1 && " "}
          </React.Fragment>
        ))}
      </p>

      <div>
        {Object.entries(result.labels).map(([aspect, sentiment], index) => (
          <LabelButton
            key={index}
            variant={sentiment === "positive" ? "success" : "danger"}
            onClick={() => handleClick(eduScoreIndexes[index][0])}
            className="mx-1"
          >
            {`${aspect}: ${sentiment}`}
          </LabelButton>
        ))}
      </div>
    </Wrapper>
  );
};

export default ReviewResult;
