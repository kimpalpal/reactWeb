import { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editPost } from "../redux/posts";

export default function Edit() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: state?.post.title || "",
    content: state?.post.content || "",
  });

  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            if (state) {
              dispatch(
                editPost({
                  ...state.post,
                  ...inputs,
                })
              );
            }
            navigate("/");
          }}
        >
          <div>
            <input
              name="title"
              placeholder="제목"
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
              value={inputs.title}
              onChange={onChangeHandler}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              name="content"
              placeholder="내용"
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
              value={inputs.content}
              onChange={onChangeHandler}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
