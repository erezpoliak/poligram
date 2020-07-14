import React, { useState, useContext } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import fire from "./config/Fire";
import { Insta_Context } from "./Context";
import * as Api from "./Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { set_currentUser, set_userProfileDisplay } = useContext(Insta_Context);

  const login = async () => {
    try {
      await fire.auth().signInWithEmailAndPassword(email, password);
      const currentUser = await Api.getUserByEmail(email);
      set_currentUser(currentUser);
      set_userProfileDisplay(currentUser);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Grid>
      <TopBar>
        <Title>Poligram</Title>
        <About>About</About>
      </TopBar>
      <FlexWrapper>
        <Content>
          <FlexWrapper>
            <Logo
              src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/reproduction-of-van-goghs-starry-night-malgorzata-pieczonka-pseud-vangocha.jpg"
              alt="logo"
            />
          </FlexWrapper>
          <TextField
            label="Email*"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password*"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={login}>
            Sign in
          </Button>
          <SignUpLink to="/signup">Dont have an account? Sign up!</SignUpLink>
        </Content>
      </FlexWrapper>
    </Grid>
  );
};

export default Login;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 12vh 88vh;
  // justify-content: center;
  // width: 100vw;
  // align-items: center;
`;

const TopBar = styled.div`
  display: grid;
  // width: 100vw;
  grid-template-columns: 80% 20%;
  background-color: rgba(0, 0, 0, 0.87);
  //   border-radius: 6px;
`;

const Title = styled.h1`
  font-family: "Lobster", cursive;
  color: rgba(210, 225, 243, 1);
  display: flex;
  align-items: center;
  padding-left: 7%;
`;

const About = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
`;

const Content = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 11%;
  width: 100%;
  @media (min-width: 768px) {
    width: 40%;
  }
`;

const Logo = styled.img`
  width: 30%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 12%;
`;

const SignUpLink = styled(Link)`
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.1rem;
`;
