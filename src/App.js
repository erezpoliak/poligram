import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import Home from "./Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import fire from "./config/Fire";

const App = () => {
  const [user, setUser] = useState({});

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      console.log("user from auth " + user);

      console.log(user === null);

      if (user) setUser({ user });
      else setUser(null);
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />

      {/* {user ? <Home /> : <Login />} */}
      {user ? <Redirect to="/home" /> : <Redirect to="/login" />}
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
