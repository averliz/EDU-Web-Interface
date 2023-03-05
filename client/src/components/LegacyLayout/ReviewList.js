import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ReviewList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/raw-data")
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <h2 className="mb-3">Reviews</h2>
        <ul className="list-group">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {/* {reviews.map((review) => (
                  <li key={review._id} className="list-group-item">
                    {review}
                  </li>
                ))} */}
                {reviews}
              </div>
            )}
          </ul>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={6}>
          <h2 className="mb-3">Extractive Summarization</h2>
          <p>{/* Extractive summarization result */}</p>
        </Col>
        <Col lg={6}>
          <h2 className="mb-3">Abstractive Summarization</h2>
          <p>{/* Abstractive summarization result */}</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={12}>
          <h2 className="mb-3">Sentiment Analysis</h2>
          <p>{/* Sentiment analysis result */}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewList;  
