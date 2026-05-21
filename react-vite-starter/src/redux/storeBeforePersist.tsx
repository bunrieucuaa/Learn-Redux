import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counter.slide";
import userReducer from "./user/user.slide";
import appReducer from "./app/app.slide";

export const store = configureStore({
  reducer: {
    counter777: counterReducer,
    user456: userReducer,
    appMode: appReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
