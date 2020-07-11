import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { Insta_Context } from "./Context";
import Button from "@material-ui/core/Button";
import * as Api from "./Api";

const CommentSection = ({ photo }) => {
  const inputRef = useRef();
  const { comments, set_comments, currentUser } = useContext(Insta_Context);
  const [newComment, set_newComment] = useState("");

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
                display={comment.commentedUser.profilePhoto}
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
              <ProfilePhoto
                src={comment.commentedUser.profilePhoto}
                display={comment.commentedUser.profilePhoto}
              />
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
`;

const ProfilePhoto = styled.img`
  /* height: 100%; */
  width: 60%;
  border: 1px solid black;
  border-radius: 50%;
  display: ${(props) => (props.display ? "block" : "none")};
`;
