import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';


const UploadBtn = () => {
    return(
        <Container>
        <input
        style = {{display: 'none'}}
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload a post
        </Button>
      </label>
      </Container>
    )
}

export default UploadBtn;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;



