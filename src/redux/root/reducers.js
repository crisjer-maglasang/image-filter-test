// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import photosReducer from "../photos/slice";

const rootReducer = combineReducers({
  photos: photosReducer,
  // Add other reducers here if any
});

export default rootReducer;
