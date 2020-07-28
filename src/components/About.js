import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  return (
    <Grid>
      <TopBar>
        <BackToLoginLink to="/login">
          <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: "4.3vh" }} />
        </BackToLoginLink>
        <Title>Poligram</Title>
      </TopBar>
      <Links>
        <LinkWrapper href="https://www.linkedin.com/in/erez-poliak-9552091b3/">
          <FontAwesomeIcon
            icon={faLinkedin}
            style={{ fontSize: "9.5vh", margin: "2vw", color: "#0e76a8" }}
          />
        </LinkWrapper>
        <LinkWrapper href="mailto:poliakerez@gmail.com">
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{ fontSize: "9.5vh", margin: "2vw", color: "F4CBB2" }}
          />
        </LinkWrapper>
        <LinkWrapper href="https://www.github.com/erezpoliak">
          <FontAwesomeIcon
            icon={faGithubSquare}
            style={{ fontSize: "9.5vh", margin: "2vw", color: "211F1F" }}
          />
        </LinkWrapper>
      </Links>
    </Grid>
  );
};

export default About;

const TopBar = styled.div`
  background-color: rgba(0, 0, 0, 0.87);
  display: flex;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 12vh 88vh;
`;

const Title = styled.h1`
  font-family: "Lobster", cursive;
  color: rgba(210, 225, 243, 1);
  height: 100%;
  margin: 0;
  flex-basis: 88%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 12%;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackToLoginLink = styled(Link)`
  flex-basis: 12%;
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkWrapper = styled.a`
  text-decoration: none;
  color: inherit;
`;
