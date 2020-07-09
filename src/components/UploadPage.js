import React, { useContext, useState, useEffect } from "react";
import HomeTopBar from "./HomeTopBar";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import UploadBtn from "./UploadBtn";
import { Insta_Context } from "./Context";
import Button from "@material-ui/core/Button";
import { storage } from "./config/Fire";
import { Link } from "react-router-dom";
import * as Api from "./Api";

const Post = () => {
  const { photo, set_photo, set_photos } = useContext(Insta_Context);
  const [title, set_title] = useState("");
  const [preview, setPreview] = useState("");
  const { currentUser } = useContext(Insta_Context);

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPreview(objectUrl);
    }
  }, [photo]);

  const post = async () => {
    const uploadTask = storage.ref(`images/${photo.name}`).put(photo);
    uploadTask.on(
      "state_changed",
      () => {},
      (err) => console.log(err),
      async () => {
        const url = await storage
          .ref("images")
          .child(photo.name)
          .getDownloadURL();
        console.log("seccesfully uploaded image");
        console.log("url from uploaded image " + url);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: url,
            title: title,
            user: currentUser,
          }),
        };
        try {
          const response = await fetch(
            "http://localhost:8080/photos/",
            requestOptions
          );
          console.log("successfully uploaded post");
          alert("successfully uploaded post");
          set_photo();
          const newPhotos = await Api.getPhotos();
          set_photos(newPhotos);
          return response;
        } catch (err) {
          console.log(err);
        }
      }
    );
  };

  console.log("user fromn uploadPage");
  console.log(currentUser);

  return (
    <Grid>
      <HomeTopBar />
      <InputContainer>
        <UploadBtn />
        {photo && <img src={preview} width="300px" height="300px" />}
        {/* {photo && <img src={preview} width="200vh" height="200vh" />} */}
        <TextField
          label="Title"
          variant="outlined"
          onChange={(e) => set_title(e.target.value)}
        />
        <HomeLink to="/home">
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={post}
          >
            Post!
          </Button>
        </HomeLink>
      </InputContainer>
    </Grid>
  );
};

export default Post;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 12vh 88vh;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
`;
