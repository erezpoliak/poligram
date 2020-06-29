import React from "react";
import styled from "styled-components";
import AutoCompleteSearch from "./AutoCompleteSearch";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from "@material-ui/icons/Home";
import CameraBtn from "./CameraBtn";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";

const HomeTopBar = () => {
  return (
    <Container>
      <HomeLink to="/home">
        <Title>Poligram</Title>
      </HomeLink>
      <FlexWrapper>
        <AutoCompleteSearch />
      </FlexWrapper>
      <IconWrapper>
        <CameraWrapper>
          <CameraBtn size="large" />
        </CameraWrapper>
        <HomeWrapper to="/home">
          <HomeIcon size="large" />
        </HomeWrapper>
        <NotificationWrapper>
          <NotificationsIcon size="large" />
        </NotificationWrapper>
        {/* <AccountCircle size= 'large'/> */}
        <AccountMenu />
      </IconWrapper>
    </Container>
  );
};

export default HomeTopBar;

const Container = styled.div`
  width: 100vw;
  // height: 12vh;
  display: grid;
  grid-template-columns: 30% 35% 35%;
  // border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.87);
  /* position: sticky;
  left: 0;
  top: 0; */
`;

const Title = styled.h1`
  font-family: "Lobster", cursive;
  color: rgba(210, 225, 243, 1);
  display: flex;
  align-items: center;
  // margin-left: 97%;
  /* padding-left: 13%; */
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(210, 225, 243, 1);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: rgba(210, 225, 243, 1);
  padding-right: 7%;
`;

const NotificationWrapper = styled.div`
  padding-right: 7%;
`;

const HomeWrapper = styled(Link)`
  padding-right: 7%;
  text-decoration: none;
  color: rgba(210, 225, 243, 1);
`;

const CameraWrapper = styled.div`
  padding-right: 7%;
`;

const HomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;
