import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import HomeTopBar from "./HomeTopBar";
import Button from "@material-ui/core/Button";
import UploadBtn from "./UploadBtn";
import { Insta_Context } from "./Context";
import { storage } from "./config/Fire";
import TextField from "@material-ui/core/TextField";

const EditProfilePage = () => {
  const [editPic, set_editPic] = useState(false);
  const [editBio, set_editBio] = useState(false);
  const { photo, set_photo, currentUser, set_currentUser } = useContext(
    Insta_Context
  );
  const [preview, setPreview] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPreview(objectUrl);
    }
  }, [photo]);

  const updateProfilePic = async () => {
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
        const requestOptions = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profilePhoto: url,
          }),
        };
        try {
          await fetch(
            `http://localhost:8080/users/${currentUser._id}`,
            requestOptions
          );
          const updatedUser = await fetch(
            `http://localhost:8080/users/${currentUser.email}`
          );
          alert("succesfully updated photo!");
          set_photo("");
          const userJson = await updatedUser.json();
          set_currentUser(userJson);
        } catch (err) {
          console.log(err);
          alert("failed to upload photo");
        }
      }
    );
  };

  const updateBio = async () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio: bio,
      }),
    };
    try {
      await fetch(
        `http://localhost:8080/users/${currentUser._id}`,
        requestOptions
      );
      const updatedUser = await fetch(
        `http://localhost:8080/users/${currentUser.email}`
      );
      const userJson = await updatedUser.json();
      set_currentUser(userJson);
      alert("succesfully updated bio!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <HomeTopBar />
      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={() => set_editPic(!editPic)}
      >
        Edit Profile pic
      </Button>
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
        </>
      ) : (
        ""
      )}
      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={() => set_editBio(!editBio)}
      >
        Edit Bio
      </Button>
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
    </Grid>
  );
};

export default EditProfilePage;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 12vh;
`;

const PicPreview = styled.div`
  /* width: 300px;
  height: 300px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
