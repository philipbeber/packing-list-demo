import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/reducers/userReducer";
import campReducer from "./redux/reducers/campReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    camp: campReducer,
  },
});

test("renders learn react link", () => {
  const app = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = app.getAllByText(/Create a camp/i);
  expect(linkElement.length).toBe(2);
});
