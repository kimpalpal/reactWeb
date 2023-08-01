import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  const navigate = useNavigate();

  // 로그인할때 필요한 정보 useState로 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  };

  const Signin = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("이메일을 입력해주세요");
    } else if (!password) {
      alert("비밀번호를 입력해주세요");
    }

    //try catch를 사용하여 오류 메세지 안내하기
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      navigate("/");
    } catch (error) {
      console.error(error.code);
      if (error.code === "auth/user-not-found") {
        alert("가입된 정보가 확인되지 않습니다.");
      } else if (error.code === "auth/invalid-email") {
        alert("올바른 이메일 형식이 아닙니다.");
      } else if (error.code === "auth/wrong-password") {
        alert("비밀번호를 확인 해주세요 ");
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
    // 오류 안내 후 입력값 초기화
    setEmail("");
    setPassword("");
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
                name="password"
                type="password"
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
                onClick={Signin}
              >
                로그인하기
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
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
