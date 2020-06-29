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

// export async function getCurrentUser() {
//   try {
//     const url = "http://localhost:8080/session";
//     const response = await fetch(url);
//     const jsoned = await response.json();
//     return jsoned;
//   } catch (err) {
//     console.log(err);
//   }
// }
