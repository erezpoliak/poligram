import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { Insta_Context } from "./Context";
import Button from "@material-ui/core/Button";
import * as Api from "./Api";
import { makeStyles } from "@material-ui/core/styles";

const CommentSection = ({ photo }) => {
  const inputRef = useRef();
  const { comments, set_comments, currentUser } = useContext(Insta_Context);
  const [newComment, set_newComment] = useState("");
  const classes = useStyles();

  const getCommentsForPhoto = (photo) => {
    const commentsForPhoto = comments.filter(
      (comment) => comment.photo._id === photo._id
    );
    return commentsForPhoto.map((comment) => {
      if (
        comment.user._id === currentUser._id ||
        comment.commentedUser._id === currentUser._id
      ) {
        return (
          <CommentWrapper>
            <ProfilePicWrapper>
              <ProfilePhoto
                src={
                  comment && comment.commentedUser
                    ? comment.commentedUser.profilePhoto
                    : ""
                }
                display={comment.commentedUser.profilePhoto}
              />
            </ProfilePicWrapper>
            <div style={{ fontWeight: "900", wordBreak: "break-word" }}>
              {comment.commentedUser.userName}
            </div>
            <div>{comment.comment}</div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteComment(comment._id)}
              className={classes.btn}
            >
              x
            </Button>
          </CommentWrapper>
        );
      } else {
        return (
          <CommentWrapper>
            <FlexWrapper>
              <ProfilePhoto
                src={comment.commentedUser.profilePhoto}
                display={comment.commentedUser.profilePhoto}
              />
            </FlexWrapper>
            <div style={{ fontWeight: "700", wordBreak: "break-word" }}>
              {comment.commentedUser.userName}
            </div>
            <div>{comment.comment}</div>
          </CommentWrapper>
        );
      }
    });
  };

  const uploadNewComment = (photo) => async (e) => {
    e.preventDefault();
    await Api.uploadNewComment(photo, newComment, currentUser);
    inputRef.current.value = "";
    const newComments = await Api.getComments();
    set_comments(newComments);
  };

  const deleteComment = async (commentId) => {
    await Api.deleteComment(commentId);
    const newComments = await Api.getComments();
    set_comments(newComments);
  };

  return (
    <>
      {getCommentsForPhoto(photo)}
      <br />
      <br />
      <form>
        <label>Add a comment</label>
        <input
          type="text"
          onChange={(e) => set_newComment(e.target.value)}
          ref={inputRef}
          style={{ width: "100%" }}
        />
        <input type="submit" onClick={uploadNewComment(photo)} />
      </form>
    </>
  );
};

export default CommentSection;

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
  @media (max-width: 750px) {
    font-size: 1vh;
  }
`;

const ProfilePhoto = styled.img`
  /* height: 100%; */
  width: 60%;
  border: 1px solid black;
  border-radius: 50%;
  display: ${(props) => (props.display ? "block" : "none")};
`;

const ProfilePicWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  btn: {
    // height: "100%",
    width: "100%",
    minWidth: "0",
    [theme.breakpoints.down(750)]: {
      padding: "0",
    },
  },
}));
