import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

export const Header = styled.header`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const Link = styled.a`
  color: #0366d6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HomePage = ({}) => {
  return (
    <Container>
      <Header>
        <Title>
          A Web Interface for Aspect-based Sentiment Analysis through EDU-level
          Attentions
        </Title>
      </Header>

      <div>
        <Paragraph>
          This is a demo accompanying the research -{" "}
          <b>Aspect-based Sentiment Analysis through EDU-level Attentions</b>.
          This paper has been accepted into the 26th Pacific-Asia Conference on
          Knowledge Discovery and Data Mining (PAKDD2022).
        </Paragraph>

        <LinkList className="links">
          <ListItem>
            <Link
              href={"https://arxiv.org/abs/2202.02535"}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Research Paper on Arxiv
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={"https://github.com/Ting005/EDU_Attentions"}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Repository
            </Link>
          </ListItem>
        </LinkList>

        <div>
          <Subtitle>Abstract</Subtitle>
          <Paragraph>This is a sample abstract</Paragraph>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
