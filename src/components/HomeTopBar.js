import React, { useContext } from "react";
import styled from "styled-components";
import AutoCompleteSearch from "./AutoCompleteSearch";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from "@material-ui/icons/Home";
import CameraBtn from "./CameraBtn";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";
import { Insta_Context } from "./Context";
import { useHistory } from "react-router-dom";

const HomeTopBar = () => {
  const { set_userProfileDisplay, currentUser } = useContext(Insta_Context);
  const history = useHistory();

  return (
    <Container>
      <FlexWrapper>
        <Title
          onClick={() => {
            set_userProfileDisplay(currentUser);
            history.push("/home");
          }}
        >
          Poligram
        </Title>
      </FlexWrapper>
      {/* </LinkWrapper> */}
      <FlexWrapper>
        <AutoCompleteSearch />
      </FlexWrapper>
      <IconWrapper>
        {/* <LinkWrapper
          to="/upload"
          onClick={() => set_userProfileDisplay(currentUser)}
        > */}
        <FlexWrapper
          onClick={() => {
            set_userProfileDisplay(currentUser);
            history.push("/upload");
          }}
        >
          <CameraBtn size="large" />
        </FlexWrapper>
        {/* </LinkWrapper> */}
        {/* <HomeWrapper
          to="/home"
          onClick={() => set_userProfileDisplay(currentUser)}
        > */}
        <FlexWrapper
          onClick={() => {
            set_userProfileDisplay(currentUser);
            history.push("/home");
          }}
        >
          <HomeIcon size="large" />
        </FlexWrapper>
        {/* </HomeWrapper> */}
        <FlexWrapper>
          <NotificationsIcon size="large" />
        </FlexWrapper>
        {/* <AccountCircle size= 'large'/> */}
        <AccountMenu />
      </IconWrapper>
    </Container>
  );
};

export default HomeTopBar;

const Container = styled.div`
  width: 100vw;
  height: 12vh;
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
  cursor: pointer;
  // margin-left: 97%;
  /* padding-left: 13%; */
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(210, 225, 243, 1);
  cursor: pointer;
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

// const CameraWrapper = styled.div`
//   padding-right: 7%;
// `;

const LinkWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  padding-right: 7%;
`;
