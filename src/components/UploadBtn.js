import React, { useState, useContext } from "react";
import { Insta_Context } from "./Context";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { storage } from "./config/Fire";

const UploadBtn = () => {
  const { set_photo } = useContext(Insta_Context);

  const saveImg = (e) => {
    const file = e.target.files[0];
    set_photo(file);
  };

  return (
    <Container>
      <input
        style={{ display: "none" }}
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={saveImg}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload an image
        </Button>
      </label>
    </Container>
  );
};

export default UploadBtn;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
