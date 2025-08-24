import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChDqyBXa-cujm8otS3AvS5HN8R0eAXGMY",
  authDomain: "todolist-8e35e.firebaseapp.com",
  projectId: "todolist-8e35e",
  storageBucket: "todolist-8e35e.firebasestorage.app",
  messagingSenderId: "779327886114",
  appId: "1:779327886114:web:5347e8bdacde9d0d41cb7b",
  measurementId: "G-RBCYB8KQ4T"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

