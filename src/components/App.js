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
  } = useContext(Insta_Context);
  const [email, setEmail] = useState("");
  const [usersApi, set_usersApi] = useState({});
  const [msgsApi, set_msgsApi] = useState({});

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
      console.log("currentUser from auth ");
      console.log(currentUser);

      // console.log(user === null);

      // if (user) {
      //   const userObj = { user };
      //   setEmail(userObj.email);
      // }
      if (currentUser) {
        console.log("current user email " + currentUser.email);
        setEmail(currentUser.email);
      } else {
        set_currentUser(null);
      }
    });
  };

  const fetchCurrentUser = async () => {
    if (email !== "") {
      console.log("email from fn app" + email);
      const response = await Api.getUserByEmail(email);
      if (response !== "") {
        console.log("current user from fetchCurrentUser");
        console.log(response);
        set_currentUser(response);
        set_userProfileDisplay(response);
      } else set_currentUser();
    } else console.log("emnail is empty");
  };

  console.log("current user from app.js");
  console.log(currentUser);

  console.log("email fromn app");
  console.log(email);

  console.log(`users api`);
  console.log(usersApi);
  console.log(`msgs api`);
  console.log(msgsApi);

  return (
    <Router>
      <GlobalStyle />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/upload" component={UploadPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/edit-profile" component={EditProfilePage} />

      {/* {user ? <Home /> : <Login />} */}
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
