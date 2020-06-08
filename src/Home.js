import React from 'react';
import styled from 'styled-components';
import HomeTopBar from './HomeTopBar';
import UploadBtn from './UploadBtn';

const Home = () => {
    return(
        <Grid>
            <HomeTopBar/>
            <Description>
                <Title>Poligram</Title>
                A social network to explore and share your art and creative ideas
                <UploadBtn/>
            </Description>
        </Grid>
    )
}

export default Home;

const Grid = styled.div`
    grid-template-rows: 12vh 30vh 1fr;
    display: grid;
`;

const Description = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    grid-auto-flow: row;
    grid-gap: 8%;
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.1rem;
    // margin-top: 2%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url("/imgs/starry_night.jpg") center center no-repeat;
    background-size: cover;
`;

const Title = styled.h1`
  font-family: 'Lobster', cursive;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
