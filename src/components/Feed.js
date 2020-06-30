import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as Api from "./Api";
import { Insta_Context } from "./Context";
import Button from "@material-ui/core/Button";

const Feed = () => {
  const { currentUser } = useContext(Insta_Context);
  const [photos, set_photos] = useState([]);
  const [comments, set_comments] = useState([]);
  const [newComment, set_newComment] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedphotos = await Api.getPhotos();
      set_photos(fetchedphotos);
      const fetchComments = await Api.getComments();
      set_comments(fetchComments);
    };
    fetchPosts();
  }, [comments]);

  //   console.log(comments);

  const getCommentsForPhoto = (photoId) => {
    const allComments = comments;
    const commentsForPhoto = allComments.filter(
      (comment) => comment.photoId === photoId
    );
    // console.log(commentsForPhoto);
    return commentsForPhoto.map((comment) => {
      if (
        comment.commentedUserId === currentUser._id ||
        comment.userId === currentUser._id
      ) {
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
      } else return <div>{comment.comment}</div>;
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
    <Container>
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
