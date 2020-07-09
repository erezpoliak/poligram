export async function getPhotos() {
  try {
    const response = await fetch("http://localhost:8080/photos/");
    const photos = await response.json();
    return photos;
  } catch (err) {
    console.log(err);
  }
}

export async function getCommnetsByPhotoId(photoId) {
  try {
    const url = `http://localhost:8080/comments/photos/${photoId}`;
    const response = await fetch(url);
    const jsoned = response.json();
    return jsoned;
  } catch (err) {
    console.log(err);
  }
}

export async function getComments() {
  try {
    const url = "http://localhost:8080/comments";
    const response = await fetch(url);
    const jsoned = await response.json();
    return jsoned;
  } catch (err) {
    console.log(err);
  }
}

export async function getPhotosByUser(user) {
  try {
    const url = `http://localhost:8080/photos/${user}`;
    const response = await fetch(url);
    const jsoned = await response.json();
    return jsoned;
  } catch (err) {
    console.log(err);
  }
}

export async function deletePhotoByPhotoId(photoId) {
  try {
    const url = `http://localhost:8080/photos/${photoId}`;
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
    const url = `http://localhost:8080/users/id/${id}`;
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
    await fetch(`http://localhost:8080/comments/${commentId}`, requestOptions);
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
      const response = await fetch(
        "http://localhost:8080/comments",
        requestOptions
      );
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
  const url = `http://localhost:8080/likes`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const deleteLike = async (likeId) => {
  const url = `http://localhost:8080/likes/${likeId}`;
  const requestOptions = { method: "DELETE" };
  try {
    await fetch(url, requestOptions);
  } catch (err) {
    console.log(err);
  }
};

export const postLike = async (user, photo, userWhoLikedIt) => {
  const url = `http://localhost:8080/likes`;
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
  const url = `http://localhost:8080/likes/${userId}/${photoId}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async () => {
  const url = "http://localhost:8080/users";
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
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
