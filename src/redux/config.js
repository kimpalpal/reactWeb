import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts";
import { SET_POSTS } from "./posts";

const store = configureStore({
  reducer: {
    posts: posts.reducer,
  },
});

export default store;
