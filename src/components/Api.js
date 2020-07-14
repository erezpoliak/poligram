const API = process.env.REACT_APP_API_URL;

export async function getPhotos() {
  try {
    const response = await fetch(`${API}/photos/`);
    const photos = await response.json();
    return photos;
  } catch (err) {
    console.log(err);
  }
}

export const postPhoto = async (photoUrl, title, currentUser) => {
  const url = `${API}/photos`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: photoUrl,
      title: title,
      user: currentUser,
    }),
  };
  try {
    await fetch(url, requestOptions);
  } catch (err) {
    console.log(err);
  }
};

export async function getCommnetsByPhotoId(photoId) {
  try {
    const url = `${API}/comments/photos/${photoId}`;
    const response = await fetch(url);
    const jsoned = response.json();
    return jsoned;
  } catch (err) {
    console.log(err);
  }
}

export async function getComments() {
  try {
    const url = `${API}/comments`;
    const response = await fetch(url);
    const jsoned = await response.json();
    return jsoned;
  } catch (err) {
    console.log(err);
  }
}

export async function getPhotosByUserId(userId) {
  try {
    const url = `${API}/photos/${userId}`;
    const response = await fetch(url);
    const jsoned = await response.json();
    return jsoned;
  } catch (err) {
    console.log(err);
  }
}

export async function deletePhotoByPhotoId(photoId) {
  try {
    const url = `${API}/photos/${photoId}`;
    const requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(url, requestOptions);
    // console.log("response from deletePghotoByPhotoId");
  } catch (err) {
    console.log(err);
  }
}

export async function getUserById(id) {
  try {
    const url = `${API}/users/id/${id}`;
    const response = await fetch(url);
    if (response) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteComment(commentId) {
  const requestOptions = { method: "DELETE" };
  try {
    await fetch(`${API}/comments/${commentId}`, requestOptions);
  } catch (err) {
    console.log(err);
  }
}

export const uploadNewComment = async (photo, newComment, currentUser) => {
  if (newComment) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: photo.user,
        commentedUser: currentUser,
        photo: photo,
        comment: newComment,
      }),
    };
    try {
      const response = await fetch(`${API}/comments`, requestOptions);
      // console.log("uploaded comment");
      // inputRef.current.value = "";
      // const newComments = await Api.getComments();
      // set_comments(newComments);
    } catch (err) {
      console.log(err);
    }
  }
};

export const getLikes = async () => {
  const url = `${API}/likes`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const deleteLike = async (likeId) => {
  const url = `${API}/likes/${likeId}`;
  const requestOptions = { method: "DELETE" };
  try {
    await fetch(url, requestOptions);
  } catch (err) {
    console.log(err);
  }
};

export const postLike = async (user, photo, userWhoLikedIt) => {
  const url = `${API}/likes`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: user,
      photo: photo,
      userWhoLikedIt: userWhoLikedIt,
    }),
  };
  try {
    await fetch(url, requestOptions);
  } catch (err) {
    console.log(err);
  }
};

export const getLikeByPhotoAndUserId = async (userId, photoId) => {
  const url = `${API}/likes/${userId}/${photoId}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async () => {
  const url = `${API}/users`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getFollows = async () => {
  const url = `${API}/follows`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const postFollow = async (user, followingUser) => {
  const url = `${API}/follows`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      followingUser,
    }),
  };
  try {
    await fetch(url, requestOptions);
  } catch (err) {
    console.log(err);
  }
};

export const deleteFollow = async (followId) => {
  const url = `${API}/follows/${followId}`;
  const requestOptions = { method: "DELETE" };
  try {
    await fetch(url, requestOptions);
  } catch (err) {
    console.log(err);
  }
};

export const uploadUser = async (userName, email, password) => {
  const url = `${API}/users`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: userName,
      email: email,
      password: password,
    }),
  };
  try {
    const response = await fetch(url, requestOptions);
    const result = response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getUserByEmail = async (email) => {
  const url = `${API}/users/${email}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const changeUserProfilePhoto = async (photoUrl, userId) => {
  const url = `${API}/users/${userId}`;
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      profilePhoto: photoUrl,
    }),
  };
  try {
    await fetch(url, requestOptions);
  } catch (err) {
    console.log(err);
  }
};

export const changeUserBio = async (bio, userId) => {
  const url = `${API}/users/${userId}`;
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bio: bio,
    }),
  };
  try {
    await fetch(url, requestOptions);
  } catch (err) {
    console.log(err);
  }
};

// export async function postCommnet(comment){
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       userId: photo.userId,
//       commentedUserId: currentUser._id,
//       photoId: photo._id,
//       comment: newComment,
//     }),
//   };
//   try {
//     const response = await fetch(
//       "http://localhost:8080/comments",
//       requestOptions
//     );
//     console.log("uploaded comment");
//     inputRef.current.value = "";
//   } catch (err) {
//     console.log(err);
//   }
// }
