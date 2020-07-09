import React, { createContext, useState, useEffect } from "react";
import * as Api from "./Api";

const Insta_Context = createContext();
const { Provider } = Insta_Context;

const Insta_Provider = ({ children }) => {
  const [users, set_users] = useState([]);
  const [currentUser, set_currentUser] = useState();
  const [photo, set_photo] = useState("");
  const [photos, set_photos] = useState([]);
  const [comments, set_comments] = useState([]);
  const [likes, set_likes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedphotos = await Api.getPhotos();
      set_photos(fetchedphotos);
      const fetchComments = await Api.getComments();
      set_comments(fetchComments);
      const fetchedLikes = await Api.getLikes();
      set_likes(fetchedLikes);
    };
    fetchData();
  }, []);

  const state = { users, currentUser, photo, photos, comments, likes };
  const actions = {
    set_users,
    set_currentUser,
    set_photo,
    set_photos,
    set_comments,
    set_likes,
  };

  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { Insta_Provider, Insta_Context };
