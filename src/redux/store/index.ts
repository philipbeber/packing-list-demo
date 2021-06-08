import * as _ from "lodash";
import { configureStore } from "@reduxjs/toolkit";
import campReducer from "../reducers/campReducer";
import userReducer from "../reducers/userReducer";
const version = "0.2";

const store = configureStore({
  reducer: {
    user: userReducer,
    camp: campReducer,
  },
  preloadedState: loadState(),
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

interface FrozenState {
  version: string;
  state: {
    user: ReturnType<typeof userReducer>;
    camp: ReturnType<typeof campReducer>;
  };
}

store.subscribe(
  _.throttle(() => {
    try {
      const frozeState: FrozenState = {
        version,
        state: store.getState(),
      };
      const serializedState = JSON.stringify(frozeState);
      localStorage.setItem("state", serializedState);
    } catch {
      // ignore write errors
    }
  }, 1000)
);

function loadState() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState) {
      const frozeState = JSON.parse(serializedState) as FrozenState;
      if (frozeState.version === version) {
        return frozeState.state;
      }
    }
  } catch (err) {
    console.warn(err);
  }
  return undefined;
}
