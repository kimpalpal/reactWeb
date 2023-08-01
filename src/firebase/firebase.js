import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// firebaseConfig= firebase에서 어플리케이션 만들면 주는 놈
const firebaseConfig = {
  apiKey: "AIzaSyByQQ2KGbWw56AtG3E4GG6o1QZ3aN1zRdk",
  authDomain: "login0801-17b35.firebaseapp.com",
  projectId: "login0801-17b35",
  storageBucket: "login0801-17b35.appspot.com",
  messagingSenderId: "400945729053",
  appId: "1:400945729053:web:d8c35b7f338e07d92a80f4",
  measurementId: "G-KDTZZ5TJVD",
};
//내 어플리케이션 정보를 이용해서 firebase를 사용하겠다
const app = initializeApp(firebaseConfig);
//내 어플리케이션에서 계정 관련된 데이터만 뽑아서 넣어줌
export const auth = getAuth(app);
export const db = getFirestore(app);
