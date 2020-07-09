import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as Api from "./Api";
import { Insta_Context } from "./Context";
import Button from "@material-ui/core/Button";
import { ThumbsUp } from "@styled-icons/fa-solid/ThumbsUp";
import { TruckMonster } from "styled-icons/fa-solid";
// import Async from 'react-async';

const Feed = () => {
  const {
    currentUser,
    photos,
    comments,
    set_photos,
    set_comments,
    likes,
    set_likes,
  } = useContext(Insta_Context);
  const [commentsForRender, set_commentsForRender] = useState();
  const [newComment, set_newComment] = useState("");
  const inputRef = useRef();

  // useEffect(() => {
  //   const buildRenderedComments = async () => {
  //     const commentsForPhoto = [...comments];
  //     const commentsArr = await Promise.all(
  //       commentsForPhoto.map(async (comment) => {
  //         const CommentedUser = await Api.getUserById(comment.commentedUserId);
  //         const user = await Api.getUserById(comment.userId);
  //         return {
  //           CommentedUser,
  //           comment: comment.comment,
  //           photoId: comment.photoId,
  //           id: comment._id,
  //           user,
  //         };
  //       })
  //     );
  //     set_commentsForRender(commentsArr);
  //   };
  //   buildRenderedComments();
  // }, [comments]);

  // useEffect(() => {}, [comments]);

  const deleteComment = async (commentId) => {
    await Api.deleteComment(commentId);
    const newComments = await Api.getComments();
    set_comments(newComments);
  };

  const deletePhoto = async (photoId) => {
    await Api.deletePhotoByPhotoId(photoId);
    const newPhotos = await Api.getPhotos();
    set_photos(newPhotos);
  };

  const uploadNewComment = (photo) => async (e) => {
    e.preventDefault();
    await Api.uploadNewComment(photo, newComment, currentUser);
    inputRef.current.value = "";
    const newComments = await Api.getComments();
    set_comments(newComments);
  };

  const getCommentsForPhoto = (photo) => {
    const commentsForPhoto = comments.filter(
      (comment) => comment.photo._id === photo._id
    );
    return commentsForPhoto.map((comment) => {
      if (
        comment.user._id === currentUser._id ||
        comment.commentedUser._id === currentUser._id
      ) {
        console.log(comment.commentedUser);
        return (
          <CommentWrapper>
            <FlexWrapper>
              <ProfilePhoto
                src={
                  comment && comment.commentedUser
                    ? comment.commentedUser.profilePhoto
                    : ""
                }
              />
            </FlexWrapper>
            <div style={{ fontWeight: "900" }}>
              {comment.commentedUser.userName}
            </div>
            <div>{comment.comment}</div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteComment(comment._id)}
            >
              x
            </Button>
          </CommentWrapper>
        );
      } else {
        return (
          <CommentWrapper>
            <FlexWrapper>
              <ProfilePhoto src={comment.commentedUser.profilePhoto} />
            </FlexWrapper>
            <div style={{ fontWeight: "900" }}>
              {comment.commentedUser.userName}
            </div>
            <div>{comment.comment}</div>
          </CommentWrapper>
        );
      }
    });
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

  const changeLike = async (photo) => {
    console.log("went inside changeLike fn");
    const isLiked = checkIfLiked(photo);
    if (isLiked) {
      console.log("fn changelike got true from isliked fn");
      const like = await Api.getLikeByPhotoAndUserId(
        currentUser._id,
        photo._id
      );
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
        <div>
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
      {photos && currentUser
        ? photos.map((photo) => {
            return (
              <Card
                style={{
                  height: "60vh",
                  width: "20vw",
                  overflow: "scroll",
                }}
                variant="outlined"
                id={photo._id}
              >
                <CardContent>
                  {photo.user._id === currentUser._id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => deletePhoto(photo._id)}
                      style={{ postion: "relative", left: "70%" }}
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
                  {/* put last like of the array and then show the other in number of likes, make sure u can like dislike */}
                  {comments ? getCommentsForPhoto(photo) : ""}
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
                  {checkIfLiked(photo) ? (
                    <LikeBtn onClick={() => changeLike(photo)} liked={true}>
                      <LikeIcon />
                    </LikeBtn>
                  ) : (
                    <LikeBtn onClick={() => changeLike(photo)} liked={false}>
                      <LikeIcon />
                    </LikeBtn>
                  )}
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
`;
