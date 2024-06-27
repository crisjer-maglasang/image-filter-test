import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store"; // Adjust path as per your project structure
import App from "./App";

test("renders the app", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
