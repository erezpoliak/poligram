import firebase from "firebase";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDXSWVrfG5LRcNLyLPUdbLVFuARc31tR3s",
  authDomain: "poligram-b0b2f.firebaseapp.com",
  databaseURL: "https://poligram-b0b2f.firebaseio.com",
  projectId: "poligram-b0b2f",
  storageBucket: "poligram-b0b2f.appspot.com",
  messagingSenderId: "431042612673",
  appId: "1:431042612673:web:362ca7461f6a4ecd8c7340",
  measurementId: "G-BY03WEWZ1T",
};

const fire = firebase.initializeApp(config);
const storage = firebase.storage();

export default fire;

export { storage };
