import React from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';

const CameraBtn = () => {
    return(
        <Container>
        <input accept="image/*" id="icon-button-file" type="file" style = {{display: 'none'}} />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span" style = {{margin: '0', padding: '0', color: 'rgba(210, 225, 243, 1)'}}>
            <PhotoCamera />
          </IconButton>
        </label>
        </Container>
   
    )
}

export default CameraBtn;

const Container = styled.div`
    // display: flex;
    // align-items: center;
    // justify-content: center;
`;


