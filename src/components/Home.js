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
  const { currentUser, set_currentUser, follows, photos } = useContext(
    Insta_Context
  );

  const [photosForFeed, set_photosForFeed] = useState([]);

  useEffect(() => {
    const getPhotosForFeed = () => {
      const selectedFollows = follows.filter(
        (follow) => follow.followingUser._id === currentUser._id
      );
      console.log("users u currently follow");
      console.log(selectedFollows);
      const usersYouFollow = selectedFollows.map((follow) => follow.user);
      const result = [];
      usersYouFollow.map((user) => {
        photos
          .filter((photo) => photo.user._id === user._id)
          .map((photo) => result.push(photo));
      });
      return result;
    };

    const selectedPhotos = getPhotosForFeed();
    set_photosForFeed(selectedPhotos);
  }, []);

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
        <Feed photosForFeed={photosForFeed} />
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
