import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  loggedIn: boolean;
};
const initialState: UserState = {
  loggedIn: false
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    }
  }
});

// Extract the action creators object and the reducer
const { actions, reducer: userReducer } = userSlice;
export const { login, logout } = actions;
// Export the reducer, either as a default or named export
export default userReducer;
