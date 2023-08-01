import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import React, { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const Logout = async () => {
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    if (confirmLogout) {
      await signOut(auth);
      setCurrentUser(null); // 이용자 정보 초기화 하기
    }
  };
  //console.log(currentUser); 로그인 완료시 아이디값 확인

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user?.email);
    });
  }, []);
  return (
    // 삼항 연산자를 통해 로그인,비로그인 화면 나누기
    <>
      {currentUser ? (
        <header
          style={{
            height: "100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px 0 24px",
          }}
        >
          <h1
            style={{
              color: "gray",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <FaHome />
          </h1>
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <div>{currentUser}</div>
            <button onClick={Logout}>로그아웃</button>
          </div>
        </header>
      ) : (
        <header
          style={{
            height: "100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px 0 24px",
          }}
        >
          <h1
            style={{
              color: "gray",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <FaHome />
          </h1>
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        </header>
      )}
    </>
  );
}
