import {initializeApp} from "firebase/firebase-app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfOh7yoqgGMrMsTxoKoMhP6_9bkUDP0i0",
  authDomain: "fir-react-upload-5daa4.firebaseapp.com",
  databaseURL: "https://fir-react-upload-5daa4.firebaseio.com",
  projectId: "fir-react-upload-5daa4",
  storageBucket: "fir-react-upload-5daa4.appspot.com",
  messagingSenderId: "320567469168",
  appId: "1:320567469168:web:32ea5afe821f2b2cc800b5",
  measurementId: "G-BLDN7GB52Y"
};

initializeApp(firebaseConfig);

const storage = storage();

export { storage, initializeApp as default };