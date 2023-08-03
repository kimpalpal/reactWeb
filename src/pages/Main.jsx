import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/posts";
import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { nanoid } from "nanoid";

export default function Main() {
  const navigate = useNavigate();

  // useQuery=데이터 가저올때 쿼리이름, 임포트해온 Api이름 넣기
  const { data, isLoading, isError } = useQuery("post", async () => {
    const response = await axios.get("http://localhost:4000/posts");
    return response.data;
  });

  //삭제 하기
  const deleteMutation = useMutation(
    async (postId) => {
      const response = await axios.delete(
        `http://localhost:4000/posts/${postId}`
      );
      return response.data;
    }
    // {
    //   // 성공적으로 삭제가 되었을 때 실행
    //   onSuccess: () => {
    //     // 쿼리를 재요청.
    //     queryClient.invalidateQueries("post");
    //   },
    // }
  );

  if (isLoading === true) {
    return <h2>로딩중..!</h2>;
  }

  if (isError === true) {
    return <h2>‼️ 에러가 발생했습니다 ‼️</h2>;
  }

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <button
            onClick={() => {
              navigate("/create");
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
        {/* 옵셔널체이닝 필수 */}
        {data?.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "#EEEEEE",
              height: "100px",
              borderRadius: "24px",
              marginBottom: "12px",
              display: "flex",
              padding: "12px 16px 12px 16px",
            }}
          >
            <div
              onClick={() => {
                navigate(`/detail/${post.id}`);
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
                cursor: "pointer",
              }}
            >
              <h2>{post.title}</h2>
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {post.content}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-around",
                gap: "12px",
              }}
            >
              <div>{post.author}</div>
              <div>
                <button
                  onClick={() => {
                    navigate("/edit", {
                      state: {
                        post,
                      },
                    });
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "orange",
                    color: "white",
                    cursor: "pointer",
                    marginRight: "6px",
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    const result = window.confirm("정말로 삭제하시겠습니까?");
                    if (result) {
                      deleteMutation.mutate(post.id);
                    }
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
