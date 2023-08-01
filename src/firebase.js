import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByQQ2KGbWw56AtG3E4GG6o1QZ3aN1zRdk",
  authDomain: "login0801-17b35.firebaseapp.com",
  projectId: "login0801-17b35",
  storageBucket: "login0801-17b35.appspot.com",
  messagingSenderId: "400945729053",
  appId: "1:400945729053:web:d8c35b7f338e07d92a80f4",
  measurementId: "G-KDTZZ5TJVD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
