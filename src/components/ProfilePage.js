import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import HomeTopBar from "./HomeTopBar";
import { Link } from "react-router-dom";
import { Insta_Context } from "./Context";
import * as Api from "./Api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Feed from "./Feed";
import Divider from "@material-ui/core/Divider";

const ProfilePage = () => {
  const {
    currentUser,
    userProfileDisplay,
    photos,
    follows,
    set_follows,
  } = useContext(Insta_Context);

  const [photosForFeed, set_photosForFeed] = useState([]);

  useEffect(() => {
    const getPhotosForFeed = () => {
      console.log("userDisplay from autoComplete from useEffect");
      console.log(userProfileDisplay);
      const result = photos.filter(
        (photo) => photo.user._id === userProfileDisplay._id
      );
      return result;
    };
    const filteredPhotos = getPhotosForFeed();
    set_photosForFeed(filteredPhotos);
    // set_userToShow(userProfileDisplay);
  }, [userProfileDisplay]);

  console.log("userDisplay from autoComplete");
  console.log(userProfileDisplay);

  const checkIfFollow = () => {
    const ifFollow = follows.filter(
      (follow) => follow.followingUser._id === currentUser._id
    );
    console.log("if follow array is");
    console.log(ifFollow);
    if (ifFollow.length === 0) return false;
    else return true;
  };

  const getFollowId = (followingUserId, userId) => {
    const follow = follows.filter(
      (follow) =>
        follow.followingUser._id === followingUserId &&
        follow.user._id === userId
    );
    return follow[0]._id;
  };

  const changeFollow = async () => {
    if (!checkIfFollow()) {
      await Api.postFollow(userProfileDisplay, currentUser);
      const newFollows = await Api.getFollows();
      set_follows(newFollows);
    } else {
      const follow = getFollowId(currentUser._id, userProfileDisplay._id);
      console.log("follow from changeFollow fn");
      console.log(follow);
      await Api.deleteFollow(follow);
      const newFollows = await Api.getFollows();
      set_follows(newFollows);
    }
  };

  const getFollowers = () => {
    const selectedFollows = follows.filter(
      (follow) => follow.user._id === userProfileDisplay._id
    );
    return selectedFollows.length;
  };

  const getFollowing = () => {
    const selectedFollows = follows.filter(
      (follow) => follow.followingUser._id === userProfileDisplay._id
    );
    return selectedFollows.length;
  };

  return (
    <Grid>
      <HomeTopBar />
      <Profile>
        <ProfilePic
          src={
            userProfileDisplay && userProfileDisplay.profilePhoto
              ? userProfileDisplay.profilePhoto
              : ""
          }
        />
        <ProfileStatsWrapper>
          <div>3</div>
          <div>Posts</div>
        </ProfileStatsWrapper>
        <ProfileStatsWrapper>
          <div>{getFollowers()}</div>
          <div>Followers</div>
        </ProfileStatsWrapper>
        <ProfileStatsWrapper>
          <div>{getFollowing()}</div>
          <div>Following</div>
        </ProfileStatsWrapper>
      </Profile>
      <Bio>
        <h2>{userProfileDisplay ? userProfileDisplay.userName : ""}</h2>
        {userProfileDisplay ? userProfileDisplay.bio : ""}
      </Bio>
      {currentUser &&
      userProfileDisplay &&
      currentUser._id !== userProfileDisplay._id ? (
        <Button
          variant="contained"
          // color={checkIfFollow() ? "primary" : "default"}
          color="primary"
          style={{ width: "23%", postion: "relative", left: "70%" }}
          onClick={() => changeFollow()}
        >
          {checkIfFollow() ? "Unfollow" : "follow"}
        </Button>
      ) : (
        ""
      )}
      {currentUser &&
      userProfileDisplay &&
      currentUser._id === userProfileDisplay._id ? (
        <EditProfile to="/edit-profile">Edit Profile</EditProfile>
      ) : (
        ""
      )}
      <Divider />
      <Feed photosForFeed={photosForFeed} />
    </Grid>
  );
};

export default ProfilePage;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 12vh 25vh;
  color: black;
  background: linear-gradient(#e0e0e0, #424242);
  grid-gap: 4vh;
`;

const Profile = styled.div`
  display: grid;
  justify-content: space-around;
  align-items: center;
  grid-template-columns: repeat(4, 20%);
`;

const ProfilePic = styled.img`
  border: 1px solid black;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

// const ProfileName = styled.h1`
//   /* color: black; */
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const ProfileStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bio = styled.div`
  padding-left: 10vh;
`;

const EditProfile = styled(Link)`
  text-decoration: none;
  color: black;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4vh;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
`;
