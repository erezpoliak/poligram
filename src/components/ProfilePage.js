import React, { useContext } from "react";
import styled from "styled-components";
import HomeTopBar from "./HomeTopBar";
import { Link } from "react-router-dom";
import { Insta_Context } from "./Context";

const ProfilePage = () => {
  const { currentUser } = useContext(Insta_Context);

  return (
    <Grid>
      <HomeTopBar />
      {/* <ProfileName>Erez Poliak</ProfileName> */}
      <Profile>
        <ProfilePic src={currentUser ? currentUser.profilePhoto : ""} />
        <ProfileStatsWrapper>
          <div>3</div>
          <div>Posts</div>
        </ProfileStatsWrapper>
        <ProfileStatsWrapper>
          <div>3</div>
          <div>Followers</div>
        </ProfileStatsWrapper>
        <ProfileStatsWrapper>
          <div>3</div>
          <div>Following</div>
        </ProfileStatsWrapper>
      </Profile>
      <Bio>
        <h2>Erez Poliak</h2>
        {currentUser ? currentUser.bio : ""}
      </Bio>
      <EditProfile to="/edit-profile">Edit Profile</EditProfile>
    </Grid>
  );
};

export default ProfilePage;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 12vh 30vh;
  color: black;
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
