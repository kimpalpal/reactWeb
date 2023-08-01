import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//firebase.js에서 import 하기 (인증 관련된 것 들 불러옴)
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const navigate = useNavigate();

  // 회원가입시 필요한 정보 useState로 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const Signup = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("이메일을 입력해주세요");
    } else if (!password || !confirmPassword) {
      alert("비밀번호를 입력해주세요");
    } else if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다");
    }

    if (password === confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert("회원가입에 성공했습니다.");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
        //console.log(userCredential); user정보 확인하기
      } catch (error) {
        //console.error(error.code); 에러메세지 확인하기
        if (error.code === "auth/email-already-in-use") {
          alert("이미 사용된 이메일입니다.");
        } else if (error.code === "auth/weak-password") {
          alert("비밀번호가 6자리 이하입니다.");
        } else if (error.code === "auth/invalid-email") {
          alert("이메일 형식을 확인 해주세요.");
        } else {
          alert("회원가입에 실패 했습니다.");
        }
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="이메일"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호 확인"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={onChange}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={Signup}
              >
                회원가입하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
