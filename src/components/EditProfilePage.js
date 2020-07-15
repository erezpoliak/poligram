import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import HomeTopBar from "./HomeTopBar";
import Button from "@material-ui/core/Button";
import UploadBtn from "./UploadBtn";
import { Insta_Context } from "./Context";
import { storage } from "./config/Fire";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import * as Api from "./Api";
import Spinner from "./Spinner";

const EditProfilePage = () => {
  const [editPic, set_editPic] = useState(false);
  const [editBio, set_editBio] = useState(false);
  const {
    photo,
    set_photo,
    currentUser,
    set_currentUser,
    set_userProfileDisplay,
    set_users,
  } = useContext(Insta_Context);
  const [preview, setPreview] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPreview(objectUrl);
    }
  }, [photo]);

  const updateProfilePic = async () => {
    setLoading(true);
    const imageName = generateIdForPhoto();
    // const photo.ending = photo.split('.');
    // console.log("image Name is " + imageName);
    const uploadTask = storage.ref(`images/${imageName}`).put(photo);
    uploadTask.on(
      "state_changed",
      () => {},
      (err) => console.log(err),
      async () => {
        const url = await storage
          .ref("images")
          .child(`${imageName}`)
          .getDownloadURL();
        try {
          const updatedUser = await Api.changeUserProfilePhoto(
            url,
            currentUser._id
          );
          set_photo("");
          set_currentUser(updatedUser);
          const newUsers = await Api.getUsers();
          set_users(newUsers);
          setLoading(false);
          alert("succesfully updated photo!");
        } catch (err) {
          console.log(err);
          alert("failed to upload photo");
        }
      }
    );
  };

  const updateBio = async () => {
    try {
      const updatedUser = await Api.changeUserBio(bio, currentUser._id);
      set_currentUser(updatedUser);
      const newUsers = await Api.getUsers();
      set_users(newUsers);
      alert("succesfully updated bio!");
    } catch (err) {
      console.log(err);
      alert("failed to update bio");
    }
  };

  const bioClicked = () => {
    if (editPic) set_editPic(!editPic);
    set_editBio(!editBio);
  };

  const picClicked = () => {
    if (editBio) set_editBio(!editBio);
    set_editPic(!editPic);
  };

  const generateIdForPhoto = () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < 13; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <>
      <HomeTopBar />
      <Grid>
        <SideBar>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={picClicked}
          >
            Edit Profile pic
          </Button>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={bioClicked}
          >
            Edit Bio
          </Button>
        </SideBar>
        <Divider orientation="vertical" />
        <Content>
          {editBio ? (
            <>
              <TextField
                variant="outlined"
                onChange={(e) => setBio(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={updateBio}
              >
                Update Bio!
              </Button>
            </>
          ) : (
            ""
          )}
          {editPic ? (
            <>
              <UploadBtn />
              <PicPreview>
                <img src={preview} width="300px" height="300px" />
              </PicPreview>
              <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={updateProfilePic}
              >
                Update Profile pic!
              </Button>
              <br />
              <br />
              <br />
              {loading ? <Spinner /> : ""}
            </>
          ) : (
            ""
          )}
        </Content>
      </Grid>
    </>
  );
};

export default EditProfilePage;

const Grid = styled.div`
  display: grid;
  /* grid-template-rows: 12vh; */
  grid-template-columns: 30vw 1fr 70vw;
  height: 88vh;
`;

const PicPreview = styled.div`
  /* width: 300px;
  height: 300px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
