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

const App = () => {
  // const [user, setUser] = useState({});
  const { set_currentUser, currentUser } = useContext(Insta_Context);
  const [email, setEmail] = useState("");
  const [usersApi, set_usersApi] = useState({});
  const [msgsApi, set_msgsApi] = useState({});

  useEffect(() => {
    authListener();
    const fetchData = async () => {
      // await fetchUsers();
      // await fetchMsgs();
      await fetchCurrentUser();
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

  const fetchUsers = async () => {
    const response = await fetch(`http://localhost:8080/users`);
    const result = await response.json();
    set_usersApi(result);
  };

  const fetchMsgs = async () => {
    const response = await fetch(`http://localhost:8080/messages`);
    const result = await response.json();
    set_msgsApi(result);
  };

  const fetchCurrentUser = async () => {
    // console.log("is email empty from fetch current user");
    // console.log(email === "");
    if (email !== "") {
      const response = await fetch(`http://localhost:8080/users/${email}`);
      const result = await response.json();
      console.log("current user from fetchCurrentUser");
      console.log(result);
      set_currentUser(result);
    } else console.log("emnail is empty");
  };

  console.log("current user from app.js");
  console.log(currentUser);

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

      {/* {user ? <Home /> : <Login />} */}
      {currentUser ? <Redirect to="/home" /> : <Redirect to="/login" />}
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
