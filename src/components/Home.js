import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import HomeTopBar from "./HomeTopBar";
// import UploadBtn from "./UploadBtn";
import Button from "@material-ui/core/Button";
import Feed from "./Feed";
import { Link } from "react-router-dom";
import { Insta_Context } from "./Context";
import fire from "./config/Fire";

const Home = () => {
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState("");
  const { currentUser, set_currentUser } = useContext(Insta_Context);
  const [answered, set_answered] = useState(false);

  const fetchMsgs = async () => {
    const msgs = await fetch("http://localhost:8080/messages");
    const result = await msgs.json();
    setMsgs(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchMsgs();
    };
    fetchData();
    // if (!currentUser) set_currentUser(fire.auth().currentUser);
  }, []);

  const uploadMsg = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: msg }),
    };
    const response = await fetch(
      "http://localhost:8080/messages",
      requestOptions
    );
    const jsoned = await response.json();
    console.log("response");
    console.log(jsoned);
    await fetchMsgs();
  };

  console.log("current user from home");
  console.log(currentUser);

  const uploadProfilePic = () => {
    const answer = window.confirm(
      "u seem to have no profile pic, wanna upload one"
    );
    if (!answer) set_answered(true);
  };

  return (
    <>
      {/* {currentUser && currentUser.profilePhoto && !answered ? ( */}
      <Grid>
        <HomeTopBar />
        <Description>
          <Title>Poligram</Title>A social network to explore and share your art
          and creative ideas
          <PostLink to="/upload">
            <Button variant="contained" color="primary" component="span">
              Upload a post
            </Button>
          </PostLink>
        </Description>
        <Feed />
      </Grid>
      {/* // ) : ( // window.confirm("upload a profile photo?") // )} */}
    </>
  );
};

export default Home;

const Grid = styled.div`
  grid-template-rows: 12vh 30vh 1fr;
  display: grid;
`;

const Description = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-auto-flow: row;
  grid-gap: 8%;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.1rem;
  // margin-top: 2%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url("/imgs/starry_night.jpg") center center no-repeat;
  background-size: cover;
`;

const Title = styled.h1`
  font-family: "Lobster", cursive;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
