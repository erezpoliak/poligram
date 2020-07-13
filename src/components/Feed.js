import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as Api from "./Api";
import { Insta_Context } from "./Context";
import Button from "@material-ui/core/Button";
import { ThumbsUp } from "@styled-icons/fa-solid/ThumbsUp";
import CommentSection from "./CommentSection";
import { makeStyles } from "@material-ui/core/styles";

const Feed = ({ photosForFeed }) => {
  const {
    currentUser,
    photos,
    comments,
    set_photos,
    set_comments,
    likes,
    set_likes,
  } = useContext(Insta_Context);

  const classes = useStyles();

  const deletePhoto = async (photoId) => {
    await Api.deletePhotoByPhotoId(photoId);
    const newPhotos = await Api.getPhotos();
    set_photos(newPhotos);
  };

  const checkIfLiked = (photo) => {
    const like = likes.filter(
      (like) =>
        like.photo._id === photo._id &&
        like.userWhoLikedIt._id === currentUser._id
    );
    console.log("is array of likes is array");
    console.log(Array.isArray(like));
    if (like.length === 0) {
      console.log("it is false");
      return false;
    } else {
      console.log("it is true");
      return true;
    }
  };

  const getLikedByPhotoAndUserId = (photoId, userId) => {
    const result = likes.filter(
      (like) => like.user._id === userId && like.photo._id === photoId
    );
    return result;
  };

  const changeLike = async (photo) => {
    console.log("went inside changeLike fn");
    const isLiked = checkIfLiked(photo);
    if (isLiked) {
      console.log("fn changelike got true from isliked fn");
      const like = await Api.getLikeByPhotoAndUserId(
        currentUser._id,
        photo._id
      );
      // const like = getLikedByPhotoAndUserId(photo._id, currentUser._id);
      const likeId = like[0]._id;
      await Api.deleteLike(likeId);
      const newLikes = await Api.getLikes();
      set_likes(newLikes);
    } else {
      console.log("fn changelike got false from isliked fn");
      await Api.postLike(photo.user, photo, currentUser);
      const newLikes = await Api.getLikes();
      set_likes(newLikes);
    }
  };

  const getLikedBy = (photo) => {
    const likeArr = likes.filter((like) => like.photo._id === photo._id);
    const lastLike = likeArr[likeArr.length - 1];
    return (
      <LikedByGrid>
        <div>Liked By:</div>
        <div style={{ wordBreak: "break-word" }}>
          {lastLike && lastLike.userWhoLikedIt
            ? lastLike.userWhoLikedIt.userName
            : ""}
        </div>
        <div>
          {likeArr.length > 1 ? `and ${likeArr.length - 1} others` : ""}
        </div>
      </LikedByGrid>
    );
  };

  return (
    <Container>
      {photos && currentUser && photosForFeed
        ? photosForFeed.map((photo) => {
            return (
              <Card className={classes.card} variant="outlined" id={photo._id}>
                <CardContent>
                  {photo.user._id === currentUser._id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => deletePhoto(photo._id)}
                      // style={{ postion: "relative", left: "70%" }}
                      className={classes.btn}
                    >
                      x
                    </Button>
                  ) : (
                    ""
                  )}
                  <h1 style={{ textAlign: "center" }}>{photo.title}</h1>
                  <FlexWrapper>
                    <img src={photo.url} width="60%" alt={photo.title} />
                  </FlexWrapper>
                  {likes.length > 0 ? getLikedBy(photo) : ""}
                  {comments ? <CommentSection photo={photo} /> : ""}
                  <LikeBtn
                    onClick={() => changeLike(photo)}
                    liked={checkIfLiked(photo)}
                  >
                    <LikeIcon />
                  </LikeBtn>
                </CardContent>
              </Card>
            );
          })
        : ""}
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 4vh;
  /* background: #37474f;
   */
  background: linear-gradient(#546e7a, #37474f);
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
`;

const CommentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 20%);
  justify-content: space-around;
  align-items: center;
  padding-top: 2.5vh;
`;

const ProfilePhoto = styled.img`
  /* height: 100%; */
  width: 60%;
  border: 1px solid black;
  border-radius: 50%;
`;

const LikeIcon = styled(ThumbsUp)`
  height: 100%;
  width: 100%;
`;

const LikeBtn = styled.div`
  color: ${(props) => (props.liked ? "blue" : "rgba(210, 225, 243, 1)")};
  height: 18%;
  width: 18%;
  position: relative;
  left: 70%;
  cursor: pointer;
`;

const LikedByGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 25%);
  justify-content: center;
  align-items: center;
  font-weight: 900;
  grid-gap: 6.5%;
`;

const useStyles = makeStyles((theme) => ({
  card: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(0,0,0,0.9)",
    color: "white",
    height: "60vh",
    width: "20vw",
    overflow: "scroll",
    [theme.breakpoints.down(750)]: {
      height: "40vh",
      width: "40vw",
    },
  },
  btn: {
    position: "relative",
    left: "70%",
    height: "100%",
    width: "30%",
  },
}));
