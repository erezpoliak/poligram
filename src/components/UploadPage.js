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
import Spinner from "./Spinner";
import { useHistory } from "react-router-dom";

const Post = () => {
  const { photo, set_photo, set_photos } = useContext(Insta_Context);
  const [title, set_title] = useState("");
  const [preview, setPreview] = useState("");
  const { currentUser } = useContext(Insta_Context);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPreview(objectUrl);
    }
  }, [photo]);

  const post = async () => {
    setLoading(true);
    const imageName = generateIdForPhoto();
    const uploadTask = storage.ref(`images/${imageName}`).put(photo);
    uploadTask.on(
      "state_changed",
      () => {},
      (err) => console.log(err),
      async () => {
        const url = await storage
          .ref("images")
          .child(photo.imageName)
          .getDownloadURL();
        console.log("seccesfully uploaded image");
        console.log("url from uploaded image " + url);
        try {
          await Api.postPhoto(url, title, currentUser);
          console.log("successfully uploaded post");
          setLoading(false);
          // alert("successfully uploaded post");
          set_photo();
          const newPhotos = await Api.getPhotos();
          set_photos(newPhotos);
          history.push("/home");
        } catch (err) {
          console.log(err);
        }
      }
    );
  };

  const generateIdForPhoto = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <Grid>
      <HomeTopBar />
      <InputContainer>
        <UploadBtn />
        {photo && <img src={preview} width="300px" height="300px" />}
        <TextField
          label="Title"
          variant="outlined"
          onChange={(e) => set_title(e.target.value)}
        />
        {/* <HomeLink to="/home"> */}
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={post}
        >
          Post!
        </Button>
        {loading ? <Spinner /> : ""}
        {/* </HomeLink> */}
      </InputContainer>
    </Grid>
  );
};

export default Post;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 12vh 88vh;
  background: #37474f;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
`;
