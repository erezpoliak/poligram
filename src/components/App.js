import React, { useState, useEffect, useContext } from "react";
import { createGlobalStyle } from "styled-components";
import Home from "./Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import fire from "./config/Fire";
import UploadPage from "./UploadPage";
import { Insta_Context } from "./Context";
import ProfilePage from "./ProfilePage";
import EditProfilePage from "./EditProfilePage";
import * as Api from "./Api";

const App = () => {
  // const [user, setUser] = useState({});
  const {
    set_currentUser,
    currentUser,
    redirect,
    set_userProfileDisplay,
    userProfileDisplay,
  } = useContext(Insta_Context);
  const [email, setEmail] = useState("");

  useEffect(() => {
    authListener();
    const fetchData = async () => {
      // await fetchUsers();
      // await fetchMsgs();
      await fetchCurrentUser();
      // set_userProfileDisplay(currentUser);
    };
    fetchData();
  }, [email]);

  const authListener = () => {
    fire.auth().onAuthStateChanged((currentUser) => {
      // console.log(user === null);

      // if (user) {
      //   const userObj = { user };
      //   setEmail(userObj.email);
      // }
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        set_currentUser(null);
      }
    });
  };

  const fetchCurrentUser = async () => {
    console.log("im inside fetch current User from app");
    if (email !== "") {
      const response = await Api.getUserByEmail(email);
      if (response) {
        set_currentUser(response);
        set_userProfileDisplay(response);
      }
    } else set_currentUser();
  };

  if (currentUser) {
    console.log("currentUser email value from app");
    console.log(currentUser.email);
    console.log("current User from app");
    console.log(currentUser);
  }

  return (
    <Router>
      <GlobalStyle />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/upload" component={UploadPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/edit-profile" component={EditProfilePage} />
      {currentUser ? <Redirect to={"/home"} /> : <Redirect to="/login" />}
    </Router>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
 body {
   margin: 0;
   padding: 0;
   font-family: 'Roboto', sans-serif;
   font-weight: 300;
   font-size: 10px;
   color: rgba(210, 225, 243, 1);
 }
`;
