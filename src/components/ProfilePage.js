import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import HomeTopBar from "./HomeTopBar";
import { Link } from "react-router-dom";
import { Insta_Context } from "./Context";
import * as Api from "./Api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const ProfilePage = () => {
  const { currentUser } = useContext(Insta_Context);
  const [photos, set_photos] = useState([]);
  const [comments, set_comments] = useState([]);
  const [newComment, set_newComment] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPhotos = await Api.getPhotosByUserId(currentUser._id);
      set_photos(fetchedPhotos);
      const fetchedComments = await Api.getComments();
      set_comments(fetchedComments);
    };
    fetchPosts();
  }, [comments]);

  const getCommentsForPhoto = (photoId) => {
    const allComments = comments;
    const commentsForPhoto = allComments.filter(
      (comment) => comment.photoId === photoId
    );
    // console.log(commentsForPhoto);
    return commentsForPhoto.map((comment) => {
      return (
        <>
          <div>{comment.comment}</div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => deleteComment(comment._id)}
          >
            x
          </Button>
        </>
      );
    });
  };

  const deleteComment = async (commentId) => {
    const requestOptions = { method: "DELETE" };
    try {
      await fetch(
        `http://localhost:8080/comments/${commentId}`,
        requestOptions
      );
    } catch (err) {
      console.log(err);
    }
  };

  const uploadNewComment = (photo) => async (e) => {
    e.preventDefault();
    console.log("newComment" + newComment);
    console.log("submit clicked");
    if (newComment) {
      console.log("new Comment is true");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: photo.userId,
          commentedUserId: currentUser._id,
          photoId: photo._id,
          comment: newComment,
        }),
      };
      try {
        const response = await fetch(
          "http://localhost:8080/comments",
          requestOptions
        );
        console.log("uploaded comment");
        inputRef.current.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  };

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
      <Feed>
        {photos && currentUser
          ? photos.map((photo) => {
              return (
                <Card
                  style={{ height: "60vh", width: "20vw", overflow: "scroll" }}
                  variant="outlined"
                  id={photo._id}
                >
                  <CardContent>
                    <h1 style={{ textAlign: "center" }}>{photo.title}</h1>
                    <FlexWrapper>
                      <img src={photo.url} width="60%" alt={photo.title} />
                    </FlexWrapper>
                    {comments ? getCommentsForPhoto(photo._id) : ""}
                    <br />
                    <br />
                    <form>
                      <label>Add a comment</label>
                      <input
                        type="text"
                        onChange={(e) => set_newComment(e.target.value)}
                        ref={inputRef}
                      />
                      <input type="submit" onClick={uploadNewComment(photo)} />
                    </form>
                  </CardContent>
                </Card>
              );
            })
          : ""}
      </Feed>
    </Grid>
  );
};

export default ProfilePage;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 12vh 25vh;
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

const Feed = styled.div``;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
`;
