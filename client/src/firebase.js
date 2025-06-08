// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXyucI_9GQfFXUtrlLOq7XO4RwPDxqAak",
  authDomain: "cs144-s25-mariusg.firebaseapp.com",
  projectId: "cs144-s25-mariusg",
  storageBucket: "cs144-s25-mariusg.firebasestorage.app",
  messagingSenderId: "624642941407",
  appId: "1:624642941407:web:98da538a283719f261a46a"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);