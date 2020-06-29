import React, { createContext, useState, useEffect } from "react";
import * as Api from "./Api";

const Insta_Context = createContext();
const { Provider } = Insta_Context;

const Insta_Provider = ({ children }) => {
  const [users, set_users] = useState([]);
  const [currentUser, set_currentUser] = useState();
  const [photo, set_photo] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const sessionUser = await Api.getCurrentUser();
  //     set_currentUser(sessionUser);
  //   };
  //   fetchData();
  // }, []);

  const state = { users, currentUser, photo };
  const actions = { set_users, set_currentUser, set_photo };

  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { Insta_Provider, Insta_Context };
