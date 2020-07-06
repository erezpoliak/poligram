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

export async function getPhotosByUserId(userId) {
  try {
    const url = `http://localhost:8080/photos/${userId}`;
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
    console.log("response from deletePghotoByPhotoId");
  } catch (err) {
    console.log(err);
  }
}

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
